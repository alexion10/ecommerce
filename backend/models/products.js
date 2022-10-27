const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
	productName: { type: String, required: true },
	typeOfProduct: { type: String, required: true },
    productPrice: { type: Number, required: true },
	productCode: { type: String, required: true },
    rating: { type: Number, default: 0 },
	image: { type: String, default: "/placeholder.jpg"},
	date: { type: Date, default: Date.now}
});


const AddProducts = mongoose.model("products", productsSchema);



module.exports = { AddProducts };