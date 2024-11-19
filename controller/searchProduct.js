const productModel = require("../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const { category, priceRange, searchQuery } = req.body;

    // Build filter conditions
    const filters = {};

    // If categories are provided, add category filter
    if (category && category.length > 0) {
      filters.category = { "$in": category };
    }

    // If price range is provided, add price range filter
    if (priceRange && priceRange.min !== undefined && priceRange.max !== undefined) {
      filters.price = { "$gte": priceRange.min, "$lte": priceRange.max };
    }

    // If search query is provided, add search filter
    if (searchQuery && searchQuery.trim() !== "") {
      filters.name = { "$regex": searchQuery, "$options": "i" };  // Tìm kiếm không phân biệt chữ hoa chữ thường
    }

    // Find products matching the filters
    const products = await productModel.find(filters);

    // Return the result
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
