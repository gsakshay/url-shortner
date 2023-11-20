/** @format */

// Importing the URL model
const URL = require("./urls.model")

/**
 * Create a new URL entry.
 * @param {Object} urlData - Data to create a URL entry (longUrl, shortUrl, user, accessCount).
 * @returns {Promise<Object>} Newly created URL entry.
 * @throws {Error} If an error occurs while creating the URL.
 */
async function createURL(urlData) {
	try {
		const newURL = new URL(urlData)
		const savedURL = await newURL.save()
		return savedURL
	} catch (error) {
		throw new Error(`Error creating URL: ${error.message}`)
	}
}

/**
 * Retrieve URL entry by short URL.
 * @param {string} shortUrl - Short URL of the entry.
 * @returns {Promise<Object | null>} Retrieved URL entry or null if not found.
 * @throws {Error} If an error occurs while fetching the URL through Short URL.
 */
async function getURLByShortUrl(shortUrl) {
	try {
		const url = await URL.findOne({ shortUrl })
		return url
	} catch (error) {
		throw new Error(`Error fetching URL through Short URL: ${error.message}`)
	}
}

/**
 * Retrieve URL entry by long URL.
 * @param {string} longUrl - Long URL of the entry.
 * @returns {Promise<Object | null>} Retrieved URL entry or null if not found.
 * @throws {Error} If an error occurs while fetching the URL through Long URL.
 */
async function getURLByLongUrl(longUrl) {
	try {
		const url = await URL.findOne({ longUrl })
		return url
	} catch (error) {
		throw new Error(`Error fetching URL through Long URL: ${error.message}`)
	}
}

/**
 * Retrieve URLs associated with a specific user.
 * @param {string} userId - ID of the user.
 * @returns {Promise<Array>} List of URL entries associated with the user.
 * @throws {Error} If an error occurs while fetching user URLs.
 */
async function getUrlsByUserId(userId) {
	try {
		const userUrls = await URL.find({ user: userId })
		return userUrls
	} catch (error) {
		throw new Error(`Error fetching user URLs: ${error.message}`)
	}
}

/**
 * Increment access count for a specific URL entry.
 * @param {string} urlId - ID of the URL entry.
 * @returns {Promise<Object>} Updated URL entry.
 * @throws {Error} If an error occurs while incrementing the access count.
 */
async function incrementAccessCount(urlId) {
	try {
		const updatedUrl = await URL.findByIdAndUpdate(
			urlId,
			{ $inc: { accessCount: 1 } },
			{ new: true }
		)
		return updatedUrl
	} catch (error) {
		throw new Error(`Error incrementing the access count: ${error.message}`)
	}
}

module.exports = {
	createURL,
	getUrlsByUserId,
	getURLByShortUrl,
	getURLByLongUrl,
	incrementAccessCount,
}
