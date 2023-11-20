/** @format */

const User = require("./user.mongo")

async function createUser(userData) {
	try {
		const newUser = new User(userData)
		const savedUser = await newUser.save()
		return savedUser
	} catch (error) {
		throw new Error(`Error creating user: ${error.message}`)
	}
}

async function getUserById(userId) {
	try {
		const user = await User.findById(userId)
		return user
	} catch (error) {
		throw new Error(`Error fetching user: ${error.message}`)
	}
}

async function incrementUserRequestsCount(userId) {
	try {
		// Find the user based on user ID and update the requests count
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $inc: { requests: 1 } },
			{ new: true }
		)

		if (!updatedUser) {
			throw new Error("User not found")
		}

		return updatedUser
	} catch (error) {
		throw new Error(`Error incrementing user requests count: ${error.message}`)
	}
}

module.exports = {
	createUser,
	getUserById,
	incrementUserRequestsCount,
}
