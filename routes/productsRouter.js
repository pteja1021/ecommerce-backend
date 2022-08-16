var router = require('express').Router();
var productsControllers = require('../controllers/productsControllers')

//product routes
router.get("/", productsControllers.getProducts)
router.get("/:id", productsControllers.getProductById)
router.post("/create", productsControllers.createProduct)

//reviews routes
router.get("/:id/reviews", productsControllers.getProductReviews)
router.post("/:id/reviews/create", productsControllers.createReviewForProductId)

module.exports = router
