const userModel = require("../models/userModel");

async function allUsers(req, res) {
  try {
    console.log("userid all Users", req.userId);

    // Tìm người dùng trong DB để kiểm tra quyền admin
    const user = await userModel.findById(req.userId);
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        message: "You do not have permission to access this resource.",
        error: true,
        success: false,
      });
    }

    // Nếu là admin, lấy danh sách tất cả người dùng
    const allUsers = await userModel.find();

    res.json({
      message: "All User",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
