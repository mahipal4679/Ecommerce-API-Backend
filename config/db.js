const mongoose= require('mongoose');
const mongoURI = "mongodb://localhost:27017/e-commerce";
mongoose.set("strictQuery", true);
const connectMongoDB =async ()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Sucessfully");
}
module.exports = connectMongoDB;