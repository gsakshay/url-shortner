/** @format */
const mongoose = require("mongoose")

const User = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		tire: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tire",
		},
		requests: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("User", User)
