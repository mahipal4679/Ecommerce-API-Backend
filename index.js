const express= require("express");

//require cors to solve the cors issue
const cors = require('cors');

//require the mongodb connect function
const connectMongoDB = require('./config/db');

const app = express();
const PORT = 5000;
connectMongoDB();

//this is the middleware to read json data sent in the body of the request
app.use(express.json());

//this is the middleware to address/solve the cors issue
app.use(cors());
app.use('/', require('./routes/root'));

app.listen(PORT);