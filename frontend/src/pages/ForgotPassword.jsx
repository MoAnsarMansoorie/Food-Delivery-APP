import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../App';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);  // 1- email, 2- otp, 3- reset password

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/auth/send-otp`, {email}, 
                {withCredentials: true}
            );

            console.log(res);
            setStep(2);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleVeifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/auth/verify-otp`, {email, otp}, 
                {withCredentials: true}
            );

            if(res.data.success){
                console.log(res.data);
                setStep(3);
            } else {
                console.log(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if(newPassword != confirmPassword){
            console.log("New password and confirm password should be same");
            return;
        }
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/auth/reset-password`, {email, newPassword}, 
                {withCredentials: true}
            );

            if(res.data.success){
                console.log(res.data);
                navigate("/login");
            } else {
                console.log(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
 
  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
            <div className='flex items-center gap-4 mb-4'>
                <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/login")} />
                <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
            </div>

            {/* Step 1- Email */}
            { step ==1 
             && 
             <div>
                {/* email */}
                <div className='mb-6'>
                    <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type='email' className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                {/* button */}
                <button onClick={handleSendOtp} className='w-full bg-[#ff4d2d] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e04a2c] transition-colors cursor-pointer' >
                    Get OTP
                </button>
             </div>
            }

            {/* step 2- OTP */}
            { step == 2
             && 
             <div>
                {/* email */}
                <div className='mb-6'>
                    <label htmlFor='otp' className='block text-gray-700 font-medium mb-1'>OTP</label>
                    <input type='text' className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} value={otp} />
                </div>
                {/* button */}
                <button onClick={handleVeifyOtp} className='w-full bg-[#ff4d2d] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e04a2c] transition-colors cursor-pointer' >
                    Verify
                </button>
             </div>
            }

            {/* step 3 - Reset Password */}
            { step == 3
             && 
             <div>
                {/* newPassword */}
                <div className='mb-6'>
                    <label htmlFor='newPassword' className='block text-gray-700 font-medium mb-1'>New Password</label>
                    <input type='password' className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter New Password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                </div>
                {/* newPassword */}
                <div className='mb-6'>
                    <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                    <input type='password' className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </div>
                {/* button */}
                <button onClick={handleResetPassword} className='w-full bg-[#ff4d2d] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e04a2c] transition-colors cursor-pointer' >
                    Reset Password
                </button>
             </div>
            }
        </div>
    </div>
  )
}

export default ForgotPassword
