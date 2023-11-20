/** @format */
const mongoose = require("mongoose")

const URL = new mongoose.Schema(
	{
		longUrl: {
			type: String,
			required: true,
		},
		shortUrl: {
			type: String,
			unique: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		accessCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("URL", URL)
