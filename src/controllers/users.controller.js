/** @format */

const { createUser, getUserById } = require("../models/users/user.model")
const { getTireByName } = require("../models/tires/tires.model")
const { getUrlsByUserId } = require("../models/urls/urls.model")

async function httpRegisterUser(req, res, next) {
	const user = req.body
	const { username, tire: tireName } = user

	if (!username || !tireName) return res.status(400).json("Missing values")

	try {
		const tire = await getTireByName(tireName)
		if (!tire)
			return res.status(404).json("Tire not found. Please give a valid Tire.")

		const newUser = await createUser({
			username,
			tire: tire._id,
		})

		res.status(201).json(newUser)
	} catch (err) {
		next(err)
	}
}

async function httpGetUserUrls(req, res, next) {
	const { userId } = req.params

	if (!userId) return res.status(400).json("Missing user ID")

	try {
		const user = await getUserById(userId)
		if (!user) return res.status(404).json("User not found")

		const userUrls = await getUrlsByUserId(userId) // Fetch URLs associated with the user

		res.status(200).json(userUrls)
	} catch (err) {
		console.log("Error fetching user URLs", err)
		next(err)
	}
}

module.exports = {
	httpRegisterUser,
	httpGetUserUrls,
}
