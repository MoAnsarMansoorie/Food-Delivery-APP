import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../App';

const SignUp = () => {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const signUpHandler = async () => {
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/auth/signup`, {
                fullName, email, mobile, password, role
            }, {withCredentials: true});
            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='min-h-screen w-full mx-auto flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-${borderColor}`} style={{
                border: `1px solid ${borderColor}`
            }}>
                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>FoodyAPP</h1>
                <p className='text-gray-600 mb-8'>Create your account to get started with delicious food deliveries.</p>

                {/* fullName */}
                <div>
                    <label htmlFor='fullName' className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your Name' style={{
                        border: `1px solid ${borderColor}`
                    }} onChange={(e) => setFullName(e.target.value)} value={fullName} />
                </div>

                {/* email */}
                <div>
                    <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type='email' className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' style={{
                        border: `1px solid ${borderColor}`
                    }} onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                {/* monile */}
                <div>
                    <label htmlFor='mobile' className='block text-gray-700 font-medium mb-1'>Mobile</label>
                    <input type='number' className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your mobile' style={{
                        border: `1px solid ${borderColor}`
                    }} onChange={(e) => setMobile(e.target.value)} value={mobile} />
                </div>

                {/* password */}
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your PASSWORD' style={{
                            border: `1px solid ${borderColor}`
                        }} onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-2.5 text-gray-500 cursor-pointer'>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>

                {/* password */}
                <div className='mb-4'>
                    <label htmlFor='role' className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='flex gap-2'>
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button 
                            className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer' 
                            style={
                                role == r ?
                                {backgroundColor: primaryColor, color: "white", border: `1px solid ${primaryColor}`} :
                                {backgroundColor: "white", color: primaryColor, border: `1px solid ${borderColor}`}
                            }
                            onClick={() => setRole(r)}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <button className='w-full bg-[#ff4d2d] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e04a2c] transition-colors cursor-pointer' onClick={signUpHandler} >
                    SignUp
                </button>

                <button className='w-full mt-4 border border-gray-300 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer hover:bg-gray-200'>
                    <FcGoogle size={20} />
                    <span>SignUp with Google</span>
                </button>

                <p className='text-center mt-6 text-sm'>Already have an account? <span className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/login")}>Please LogIn</span></p>

            </div>
        </div>
    )
}

export default SignUp
