const express = require('express');
const router = express.Router();

//then we require the models required to process the controller actions
const User = require('../models/Users');
const Product = require('../models/Product');


//1. Sign-Up Api 
router.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result.toObject();
    delete result.password;
    res.send(result);
})

//2. Log-In Api 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "Invalid User credentials" })
        }
    } else {
        res.send({ result: "Please enter both the fields" })
    }

})

//3. Add Product Api 
router.post("/add-product", async (req, res) => {

    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);

})

// 4. Product list Api
router.get("/products", async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Products found" })
    }
})

// 5.Delete Product Api
router.delete("/product/:id", async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
})

// 6.Single Product Detail Api
router.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "No Record Found." })
    }
})

// 7.Update Product Api
router.put("/product/:id", async (req, res) => {

    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    //here we first find the product by id, then set the value to req.body passed in frontent or postman
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "No Record Found." })
    }
})
// 8.Search Product Api
router.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    res.send(result);
})
module.exports = router