const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    // Lấy token từ cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login to your account!",
        error: true,
        success: false
      });
    }

    // Xác thực token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token",
          error: true,
          success: false
        });
      }

      // Gán thông tin userId vào req để sử dụng trong các API sau
      req.userId = decoded?._id;
      next(); // Chuyển tiếp tới các middleware tiếp theo hoặc route handler
    });

  } catch (err) {
    // Xử lý bất kỳ lỗi nào không phải lỗi xác thực token
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
