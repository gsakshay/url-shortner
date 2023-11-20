/** @format */

const Counter = require("./counter.mongo")

async function initializeBusinessCounter() {
	try {
		// Check if the counter exists
		let counter = await Counter.findOne({ name: "urlCounter" })

		// If counter doesn't exist, create it
		if (!counter) {
			counter = await Counter.create({ name: "urlCounter", value: 0 })
		}

		return counter
	} catch (error) {
		// Handle errors during initialization
		throw new Error("Error initializing counter:", error)
	}
}

async function findBusinessCounterAndUpdate() {
	try {
		const counter = await Counter.findOneAndUpdate(
			{ name: "urlCounter" },
			{ $inc: { value: 1 } },
			{ new: true }
		)
		return counter
	} catch {
		throw new Error("Error in Finding and Updating Counter:", error)
	}
}

module.exports = {
	initializeBusinessCounter,
	findBusinessCounterAndUpdate,
}
