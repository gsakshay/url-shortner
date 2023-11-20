/** @format */

const Tire = require("./tires.mongo")

async function createMultipleTires(tireDetailsArray) {
	try {
		const createdTires = await Tire.insertMany(tireDetailsArray)
		return createdTires
	} catch (error) {
		throw new Error(`Error creating multiple tires: ${error.message}`)
	}
}

async function getTireById(tireId) {
	try {
		const tire = await Tire.findById(tireId)
		return tire
	} catch (error) {
		throw new Error(`Error fetching tire: ${error.message}`)
	}
}

async function getTireByName(tireName) {
	try {
		const tire = await Tire.findOne({ tirename: tireName })
		return tire
	} catch (error) {
		throw new Error(`Error fetching tire: ${error.message}`)
	}
}

// Business Logic -> Specific
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
