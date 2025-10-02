import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../App';

const Login = () => {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async () => {
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/auth/signup`, {
                email, password
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
                <p className='text-gray-600 mb-8'>LogIn to your account to get started with delicious food deliveries.</p>

                {/* email */}
                <div>
                    <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type='email' className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' style={{
                        border: `1px solid ${borderColor}`
                    }} onChange={(e) => setEmail(e.target.value)} value={email} />
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

                <button className='w-full bg-[#ff4d2d] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e04a2c] transition-colors cursor-pointer' onClick={loginHandler} >
                    LogIn
                </button>

                <button className='w-full mt-4 border border-gray-300 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer hover:bg-gray-200'>
                    <FcGoogle size={20} />
                    <span>LogIn with Google</span>
                </button>

                <p className='text-center mt-6 text-sm'>Want to create a new account? <span className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signup")}>Please SignUp</span></p>

            </div>
        </div>
    )
}

export default Login

