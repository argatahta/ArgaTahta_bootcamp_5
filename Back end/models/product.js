const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/bootcampdb', { useMongoClient: true });

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: String,
    description: String,
    category:String,
    productPict:String
});

const Productdb = mongoose.model("product", productSchema);

module.exports = Productdb;