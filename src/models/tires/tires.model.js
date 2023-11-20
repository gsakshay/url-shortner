/** @format */

// Importing the Tire model
const Tire = require("./tires.model")

/**
 * Create multiple tire entries.
 * @param {Array<Object>} tireDetailsArray - Array of tire details to create multiple tire entries.
 * @returns {Promise<Array>} Array of created tire entries.
 * @throws {Error} If an error occurs while creating multiple tires.
 */
async function createMultipleTires(tireDetailsArray) {
	try {
		const createdTires = await Tire.insertMany(tireDetailsArray)
		return createdTires
	} catch (error) {
		throw new Error(`Error creating multiple tires: ${error.message}`)
	}
}

/**
 * Retrieve tire entry by its ID.
 * @param {string} tireId - ID of the tire entry.
 * @returns {Promise<Object | null>} Retrieved tire entry or null if not found.
 * @throws {Error} If an error occurs while fetching the tire by ID.
 */
async function getTireById(tireId) {
	try {
		const tire = await Tire.findById(tireId)
		return tire
	} catch (error) {
		throw new Error(`Error fetching tire: ${error.message}`)
	}
}

/**
 * Retrieve tire entry by tire name.
 * @param {string} tireName - Name of the tire entry.
 * @returns {Promise<Object | null>} Retrieved tire entry or null if not found.
 * @throws {Error} If an error occurs while fetching the tire by name.
 */
async function getTireByName(tireName) {
	try {
		const tire = await Tire.findOne({ tirename: tireName })
		return tire
	} catch (error) {
		throw new Error(`Error fetching tire: ${error.message}`)
	}
}

/**
 * Create default business-related tire entries (Tiers 1 and 2).
 * @returns {Promise<Array>} Array of created tire entries.
 */
async function createBusinessTires() {
	const tire1 = {
		tirename: "Tier 1",
		requestlimit: 1000,
	}

	const tire2 = {
		tirename: "Tier 2",
		requestlimit: 100,
	}
	try {
		const createdTires = await createMultipleTires([tire1, tire2])
		return createdTires
	} catch (error) {
		console.error("Error creating tires:", error)
	}
}

module.exports = {
	createBusinessTires,
	getTireByName,
	getTireById,
}
