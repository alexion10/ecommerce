const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
	email: { type: String, required: true },
	favoriteList: { type: Array, default: []}
});


const Favorite = mongoose.model("favorite", favoritesSchema);



module.exports = { Favorite };