/** @format */

function getBaseUrl(req) {
	const protocol = req.protocol || "http" // Default to 'http'
	const host = req.get("host") || `localhost:${process.env.PORT || 8000}` // Default to 'localhost:8000'

	return `${protocol}://${host}`
}

function urlValidator(str) {
	const pattern = new RegExp(
		"^([a-zA-Z]+:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$", // fragment locator
		"i"
	)
	return pattern.test(str)
}

module.exports = {
	getBaseUrl,
	urlValidator,
}
