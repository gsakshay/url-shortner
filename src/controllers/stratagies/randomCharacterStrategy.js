/** @format */

function encodeURL(counter, encoderMap) {
	let n = counter
	const shortUrlChars = []
	total = encoderMap.length

	while (n) {
		shortUrlChars.push(encoderMap[n % total])
		n = Math.floor(n / total)
	}

	const shortUrl = shortUrlChars.reverse().join("")
	return shortUrl
}

module.exports = { encodeURL }
