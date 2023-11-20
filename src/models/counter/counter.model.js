/** @format */

// Importing the Counter model
const Counter = require("./counter.model")

/**
 * Initializes the business counter. If the counter doesn't exist, creates a new one with initial value.
 * @returns {Promise<Object>} The initialized counter.
 * @throws {Error} If an error occurs during counter initialization.
 */
async function initializeBusinessCounter() {
	try {
		let counter = await Counter.findOne({ name: "urlCounter" })

		if (!counter) {
			counter = await Counter.create({ name: "urlCounter", value: 0 })
		}

		return counter
	} catch (error) {
		throw new Error("Error initializing counter:", error)
	}
}

/**
 * Finds and updates the business counter.
 * @returns {Promise<Object>} The updated counter.
 * @throws {Error} If an error occurs while finding and updating the counter.
 */
async function findBusinessCounterAndUpdate() {
	try {
		const counter = await Counter.findOneAndUpdate(
			{ name: "urlCounter" },
			{ $inc: { value: 1 } },
			{ new: true }
		)
		return counter
	} catch (error) {
		throw new Error("Error in Finding and Updating Counter:", error)
	}
}

module.exports = {
	initializeBusinessCounter,
	findBusinessCounterAndUpdate,
}
