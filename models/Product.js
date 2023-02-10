const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    userId:Number,
    company:String
});
const Product = mongoose.model("products", productSchema);
// //here products is the name of collection in MongoDb
// Product is the name of mongoose model linked to that collection and userSchema

module.exports = Product; 