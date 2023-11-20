/** @format */

// Importing the User model
const User = require("./user.model")

/**
 * Create a new user.
 * @param {Object} userData - Data to create a user (username, tire).
 * @returns {Promise<Object>} Newly created user.
 * @throws {Error} If an error occurs while creating the user.
 */
async function createUser(userData) {
	try {
		const newUser = new User(userData)
		const savedUser = await newUser.save()
		return savedUser
	} catch (error) {
		throw new Error(`Error creating user: ${error.message}`)
	}
}

/**
 * Get a user by their ID.
 * @param {string} userId - ID of the user.
 * @returns {Promise<Object | null>} Retrieved user object or null if not found.
 * @throws {Error} If an error occurs while fetching the user.
 */
async function getUserById(userId) {
	try {
		const user = await User.findById(userId)
		return user
	} catch (error) {
		throw new Error(`Error fetching user: ${error.message}`)
	}
}

/**
 * Increment user's request count by 1.
 * @param {string} userId - ID of the user.
 * @returns {Promise<Object>} Updated user object.
 * @throws {Error} If the user is not found or an error occurs during the update.
 */
async function incrementUserRequestsCount(userId) {
	try {
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
