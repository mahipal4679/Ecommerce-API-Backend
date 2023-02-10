const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const User = mongoose.model("users", userSchema);
// //here users is the name of collection in MongoDb
// User is the name of mongoose model linked to that collection and userSchema
module.exports = User;