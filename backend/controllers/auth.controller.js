import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/token.js"

export const signupController = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        // validation
        const user = await User.findOne({ email })
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

        return res.status(201).json({
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