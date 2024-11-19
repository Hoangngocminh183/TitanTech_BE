const productModel = require("../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const { category, priceRange, searchQuery } = req.body;

    // Xử lý các điều kiện lọc
    const filters = {};

    // Nếu category có giá trị, thêm điều kiện lọc category
    if (category && category.length > 0) {
      filters.category = { "$in": category };
    }

    // Nếu priceRange có giá trị, thêm điều kiện lọc price
    if (priceRange && priceRange.min !== undefined && priceRange.max !== undefined) {
      filters.price = { "$gte": priceRange.min, "$lte": priceRange.max };
    }

    // Nếu searchQuery có giá trị, thêm điều kiện lọc name
    if (searchQuery && searchQuery.trim() !== "") {
      // Làm sạch input trước khi thêm vào query để tránh lỗi và tấn công
      const sanitizedSearchQuery = searchQuery.replace(/[^\w\s]/gi, '');  // Loại bỏ ký tự đặc biệt
      filters.name = { "$regex": sanitizedSearchQuery, "$options": "i" };  // Tìm kiếm không phân biệt chữ hoa chữ thường
    }

    // Tìm các sản phẩm khớp với các điều kiện lọc
    const products = await productModel.find(filters);

    // Trả về kết quả
    res.json({
      data: products,
      message: "Filtered products",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
