const express = require('express')
const router = express.Router()

const userSignUpController = require('../controller/userSignUp')
const userSignInController = require('../controller/userSignIn')
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const allUsers = require('../controller/allUsers')
const updateUser = require('../controller/updateUser')
const UploadProductController = require('../controller/uploadProduct')
const getProductController = require('../controller/getProduct')
const updateProductController = require('../controller/updateProduct')
const getCategoryProduct = require('../controller/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct')
const getProductDetails = require('../controller/getProductDetails')
const addToCartController = require('../controller/addToCartController')
const countAddToCartProduct = require('../controller/countAddToCartProduct')
const addToCartViewProduct = require('../controller/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct')
const searchProduct = require('../controller/searchProduct')
const filterProductController = require('../controller/filterProduct')

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     description: Endpoint để đăng ký người dùng mới với email, mật khẩu và tên.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Dữ liệu người dùng đã được tạo
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User created Successfully!"
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc lỗi khác
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide email"
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post("/signup", userSignUpController)

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Đăng nhập người dùng
 *     description: Endpoint để đăng nhập người dùng bằng email và mật khẩu.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successfully"
 *                 data:
 *                   type: string
 *                   description: Token xác thực của người dùng
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 error:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Thông tin không hợp lệ hoặc lỗi xác thực
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.post("/signin", userSignInController)

/**
 * @swagger
 * /user-details:
 *   get:
 *     summary: Lấy thông tin chi tiết người dùng
 *     description: API này trả về thông tin chi tiết của người dùng dựa trên JWT token.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: [] # JWT Authentication
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Thông tin chi tiết người dùng
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 637bf751b0f38260cc416f23
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     role:
 *                       type: string
 *                       example: GENERAL
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User details
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.get("/user-details", authToken, userDetailsController)

/**
 * @swagger
 * /userLogout:
 *   get:
 *     summary: Đăng xuất người dùng
 *     description: API này cho phép người dùng đăng xuất khỏi hệ thống bằng cách xóa cookie chứa token.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       500:
 *         description: Lỗi máy chủ khi thực hiện đăng xuất
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.get("/userLogout", userLogout)

/**
 * @swagger
 * /all-user:
 *   get:
 *     description: Lấy danh sách tất cả người dùng (Admin chỉ có quyền)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 *       401:
 *         description: Không có quyền truy cập
 *       403:
 *         description: Không có quyền admin
 */
router.get("/all-user", authToken, allUsers)

/**
 * @swagger
 * /update-user:
 *   post:
 *     description: Cập nhật thông tin người dùng
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Thông tin người dùng
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *             - newDetails
 *           properties:
 *             userId:
 *               type: string
 *               example: "12345"
 *             newDetails:
 *               type: object
 *               example: { name: "New Name" }
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/update-user", authToken, updateUser)

/**
 * @swagger
 * /upload-product:
 *   post:
 *     description: Tải lên sản phẩm mới (Admin chỉ có quyền)
 *      tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Thông tin sản phẩm
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - price
 *           properties:
 *             name:
 *               type: string
 *               example: "Laptop"
 *             price:
 *               type: number
 *               example: 50000
 *     responses:
 *       200:
 *         description: Sản phẩm được tải lên thành công
 */
router.post("/upload-product", authToken, UploadProductController)

/**
 * @swagger
 * /get-product:
 *   get:
 *     description: Lấy danh sách tất cả sản phẩm
 *      tags:
 *         - User
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/get-product", getProductController)

/**
 * @swagger
 * /update-product:
 *   post:
 *     description: Cập nhật sản phẩm   
 *      tags:
 *        - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Thông tin sản phẩm
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *             - updatedDetails
 *           properties:
 *             productId:
 *               type: string
 *               example: "product123"
 *             updatedDetails:
 *               type: object
 *               example: { price: 55000 }
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/update-product", authToken, updateProductController)

/**
 * @swagger
 * /get-categoryProduct:
 *   get:
 *     description: Lấy danh sách các sản phẩm theo danh mục
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/get-categoryProduct", getCategoryProduct)

/**
 * @swagger
 * /category-product:
 *   post:
 *     description: Lấy sản phẩm theo danh mục
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: category
 *         description: Danh mục sản phẩm
 *         schema:
 *           type: object
 *           required:
 *             - categoryId
 *           properties:
 *             categoryId:
 *               type: string
 *               example: "category123"
 *     responses:
 *       200:
 *         description: Thành công
 */
router.post("/category-product", getCategoryWiseProduct)

/**
 * @swagger
 * /product-details:
 *   post:
 *     description: Lấy chi tiết sản phẩm
 *     tags:
 *         -User
 *     parameters:
 *       - in: body
 *         name: product
 *         description: ID sản phẩm
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *           properties:
 *             productId:
 *               type: string
 *               example: "product123"
 *     responses:
 *       200:
 *         description: Thành công
 */
router.post("/product-details", getProductDetails)

/**
 * @swagger
 * /search:
 *   get:
 *     description: Tìm kiếm sản phẩm
 *      tags:
 *          -User
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Từ khóa tìm kiếm
 *         required: true
 *         schema:
 *           type: string
 *           example: "laptop"
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Thiếu từ khóa tìm kiếm
 *       404:
 *         description: Không tìm thấy sản phẩm nào
 */
router.get("/search", searchProduct);




/**
 * @swagger
 * /filter-product:
 *   post:
 *     description: Lọc sản phẩm theo tiêu chí
 *      tags:
 *          -User
 *     parameters:
 *       - in: body
 *         name: filters
 *         description: Các bộ lọc
 *         schema:
 *           type: object
 *           properties:
 *             priceRange:
 *               type: object
 *               properties:
 *                 min:
 *                   type: number
 *                   example: 10000
 *                 max:
 *                   type: number
 *                   example: 50000
 *             category:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["electronics", "laptop"]
 *     responses:
 *       200:
 *         description: Thành công
 */

router.post("/filter-product", filterProductController)

/**
 * @swagger
 * /addtocart:
 *   post:
 *     description: Thêm sản phẩm vào giỏ hàng
 *      tags:
 *          -Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: cart
 *         description: Thông tin sản phẩm thêm vào giỏ
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *             - quantity
 *           properties:
 *             productId:
 *               type: string
 *               example: "product123"
 *             quantity:
 *               type: number
 *               example: 2
 *     responses:
 *       200:
 *         description: Thành công
 */
router.post("/addtocart", authToken, addToCartController)
/**
 * @swagger
 * /countAddToCartProduct:
 *   get:
 *     description: Đếm số lượng sản phẩm trong giỏ hàng
 *      Tags:
 *          -Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Số lượng sản phẩm trong giỏ hàng
 */
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)

/**
 * @swagger
 * /view-card-product:
 *   get:
 *     description: Xem danh sách sản phẩm trong giỏ hàng
 *      Tags:
 *          -Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/view-card-product", authToken, addToCartViewProduct)

/**
 * @swagger
 * /update-cart-product:
 *   post:
 *     description: Cập nhật số lượng sản phẩm trong giỏ hàng
 *      Tags:
 *          -Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: cartUpdate
 *         description: Cập nhật sản phẩm trong giỏ
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *             - quantity
 *           properties:
 *             productId:
 *               type: string
 *               example: "product123"
 *             quantity:
 *               type: number
 *               example: 3
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/update-cart-product", authToken, updateAddToCartProduct)

/**
 * @swagger
 * /delete-cart-product:
 *   post:
 *     description: Xóa sản phẩm khỏi giỏ hàng
 *      Tags:
 *          -User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: cartDelete
 *         description: ID sản phẩm cần xóa
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *           properties:
 *             productId:
 *               type: string
 *               example: "product123"
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)
/**
 * @swagger
 * /search:
 *   get:
 *     description: Tìm kiếm sản phẩm theo từ khóa
 *      Tags:
 *          -User
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: Từ khóa để tìm kiếm sản phẩm
 *         required: true
 *         schema:
 *           type: string
 *           example: "laptop"
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.get("/search", searchProduct)

/**
 * @swagger
 * /filter-product:
 *   post:
 *     description: Lọc sản phẩm theo tiêu chí
 *      Tags:
 *          -User  
 *     parameters:
 *       - in: body
 *         name: filter
 *         description: Các tiêu chí để lọc sản phẩm
 *         schema:
 *           type: object
 *           properties:
 *             category:
 *               type: string
 *               example: "electronics"
 *             priceRange:
 *               type: object
 *               properties:
 *                 min:
 *                   type: number
 *                   example: 1000
 *                 max:
 *                   type: number
 *                   example: 5000
 *             brand:
 *               type: string
 *               example: "Apple"
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/filter-product", filterProductController)


module.exports = router