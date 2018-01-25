const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/product");


const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('public'));

app.use("/api/product", productRoutes());


app.listen(3000, ()=>{
    console.log("connected");
});