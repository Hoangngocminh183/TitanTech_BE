const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Kiểm tra email và password có được cung cấp không
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false,
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false,
            });
        }

        // Kiểm tra xem người dùng có tồn tại không
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // So sánh mật khẩu
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Invalid password. Please try again.",
                error: true,
                success: false,
            });
        }

        // Tạo JWT token
        const tokenData = {
            _id: user._id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

        // Thiết lập tùy chọn cookie
        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Chỉ bật secure khi chạy production
            sameSite: "strict",
        };

        // Gửi token và phản hồi
        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false,
        });
    } catch (err) {
        // Xử lý lỗi chung
        console.error("SignIn Error:", err.message);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
