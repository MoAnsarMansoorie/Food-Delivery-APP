import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"

export const signupController = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        // validation
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        if (password < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at least 6 digit long.."
            })
        }

        if (mobile < 10) {
            return res.status(400).json({
                success: false,
                message: "mobile is have to at least 10 digits.."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            role
        })

        const token = await generateToken(user._id)

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully...",
            token,
            user
        })


    } catch (error) {
        console.log("Signup error", error)
        return res.status(500).json({
            success: false,
            message: "Error during signup",
            error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // validation
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = await generateToken(user._id)

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(200).json({
            success: true,
            message: "User loggedIn successfully...",
            token,
            user
        })


    } catch (error) {
        console.log("LogIn error", error)
        return res.status(500).json({
            success: false,
            message: "Error during login",
            error
        })
    }
}

export const logoutController = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({
            success: true,
            message: "Logout successfully..."
        })
        
    } catch (error) {
        console.log("logout error", error)
        return res.status(500).json({
            success: false,
            message: "error during logout",
            error
        })
    }
}

export const sendOtpController = async (req, res) => {
    try {
        const {email} = req.body
        // validation
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not registered"
            })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5*60*1000
        user.isOtpVerified = false
        await user.save()

        await sendOtpMail(email, otp)

        return res.status(200).json({
            success: true, 
            message: "Otp send successfully...",
            otp
        })
        
    } catch (error) {
        console.log("SendOtp error", error)
        return res.status(500).json({
            success: false,
            message: "Error during sendOtp",
            error
        })
    }
}

export const verifyOtpController = async (req, res) => {
    try {
        const {email, otp} = req.body

        const user = await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
            return res.status(400).json({
                success: false,
                message: "Invalid/expired otp"
            })
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined

        await user.save()

        return res.status(200).json({
            success: true, 
            message: "Otp verified successfully..."
        })
        
    } catch (error) {
        console.log("VerifyOtp error", error)
        return res.status(500).json({
            success: false,
            message: "Error during verifyOtp",
            error
        })
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword} = req.body
        // validation
        let user = await User.findOne({ email })
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({
                success: false,
                message: "otp verification required"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()

        return res.status(200).json({
            success: true, 
            message: "Password reset successfully..."
        })
        
    } catch (error) {
        console.log("ResetPassword error", error)
        return res.status(500).json({
            success: false,
            message: "Error during resetPassword",
            error
        })
    }
}