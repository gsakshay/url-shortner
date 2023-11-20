/** @format */

const URL = require("./urls.mongo")

async function createURL(urlData) {
	try {
		const newURL = new URL(urlData)
		const savedURL = await newURL.save()
		return savedURL
	} catch (error) {
		console.log(err)
		throw new Error(`Error creating URL: ${error.message}`)
	}
}

async function getURLByShortUrl(shortUrl) {
	try {
		const url = await URL.findOne({ shortUrl })
		return url
	} catch (error) {
		throw new Error(`Error fetching URL thourgh Short URL: ${error.message}`)
	}
}

async function getURLByLongUrl(longUrl) {
	try {
		const url = await URL.findOne({ longUrl })
		return url
	} catch (error) {
		throw new Error(`Error fetching URL thorugh Long URL: ${error.message}`)
	}
}
async function getUrlsByUserId(userId) {
	try {
		const userUrls = await URL.find({ user: userId })
		return userUrls
	} catch (error) {
		throw new Error(`Error fetching user URLs: ${error.message}`)
	}
}

async function incrementAccessCount(urlId) {
	try {
		const updatedUrl = await URL.findByIdAndUpdate(
			urlId,
			{ $inc: { accessCount: 1 } },
			{ new: true }
		)
		return updatedUrl
	} catch {
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
