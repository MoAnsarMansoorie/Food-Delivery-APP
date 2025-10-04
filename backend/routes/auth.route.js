import express from "express"
import { loginController, logoutController, resetPasswordController, sendOtpController, signupController, verifyOtpController } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup", signupController)
router.post("/login", loginController)
router.get("/logout", logoutController)
router.post("/send-otp", sendOtpController)
router.post("/verify-otp", verifyOtpController)
router.post("/reset-password", resetPasswordController)

export default router;