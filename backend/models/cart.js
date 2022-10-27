const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	email: { type: String, required: true },
	cartList: { type: Array, default: []},
    totalPrice: { type: Number, default: 0 },
	totalQuantity: { type: Number, default: 0 },
});


const Cart = mongoose.model("cart", cartSchema);



module.exports = { Cart };