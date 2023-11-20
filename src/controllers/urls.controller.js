/** @format */
const {
	getUserById,
	incrementUserRequestsCount,
} = require("../models/users/user.model")
const { encodeURL } = require("./stratagies/randomCharacterStrategy")
const { getTire, getTireById } = require("../models/tires/tires.model")
const {
	getURLByShortUrl,
	createURL,
	incrementAccessCount,
} = require("../models/urls/urls.model")

const { urlValidator, getBaseUrl } = require("../helpers/urlHelpers")
const {
	findBusinessCounterAndUpdate,
} = require("../models/counter/counter.model")

async function doesURLExist(shortURL) {
	const url = await getURLByShortUrl(shortURL)
	return Boolean(url)
}

async function httpShortenUrl(req, res, next) {
	try {
		const { longUrl, userId, alias = "" } = req.body

		if (!longUrl || !userId) {
			return res.status(400).json({ error: "Missing required body keys" })
		}

		// Valid if the URL is valid
		if (!urlValidator(longUrl)) {
			return res.status(400).json({ error: "Please provide a valid URL" })
		}

		const user = await getUserById(userId)
		if (!user) return res.status(404).json("User not found")

		// Check if the user has reached his limit
		const userTire = await getTireById(user.tire)

		if (user.requests >= userTire.requestlimit) {
			return res.status(429).json({
				error:
					"You have reached maximum number of URL shortening for your tire, please consider upgrading",
			})
		}

		const baseUrl = getBaseUrl(req)

		let shortUrl

		// Check if alias is present -> Use Custom url aias
		if (alias) {
			url = await getURLByShortUrl(alias)

			if (url) {
				return res.status(400).json({
					error:
						"The request alias is not available! Please choose a new alias or randomly create one.",
				})
			}

			shortUrl = alias
		} else {
			do {
				// Random Character Strategy with 62 character encoding map
				// generate until the generated short url is not already in collection

				// Process of generating a new short URL
				const counter = await findBusinessCounterAndUpdate()
				const encoderMap =
					"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
				shortUrl = encodeURL(counter.value, encoderMap)

				// Check if this already exists in our DB, reapt the process until you get an unique URL
			} while (await doesURLExist(shortUrl))
		}

		// Insert the URL data into the URL collection
		const urlData = {
			longUrl,
			shortUrl,
			user: user._id, // Assign the user ID
			accessCount: 0,
		}

		const newURL = await createURL(urlData)

		// Update user's request count
		await incrementUserRequestsCount(user._id)

		return res.status(200).json({
			longUrl: newURL.longUrl,
			shortUrl: `${baseUrl}/${newURL.shortUrl}`,
		})
	} catch (err) {
		next(err)
	}
}

async function httpRedirectShortURL(req, res, next) {
	try {
		const { shortUrl } = req.params

		// Find the URL document based on the short URL
		const url = await getURLByShortUrl(shortUrl)

		if (!url) {
			return res
				.status(404)
				.json({ error: "Short URL not found. Please provide a valid URL" })
		}

		// Increment the accessCount for the URL
		await incrementAccessCount(url._id)

		// Redirect to the associated long URL
		return res.redirect(url.longUrl)
	} catch (error) {
		next(err)
	}
}

module.exports = { httpShortenUrl, httpRedirectShortURL }
