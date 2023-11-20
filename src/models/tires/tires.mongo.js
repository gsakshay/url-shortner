/** @format */

const mongoose = require("mongoose")

const Tire = new mongoose.Schema(
	{
		tirename: {
			type: String,
			required: true,
			unique: true,
		},
		requestlimit: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Tire", Tire)
