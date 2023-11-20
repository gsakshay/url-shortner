/** @format */

/**
 * Encodes a given counter value using a custom encoder map.
 * @param {number} counter - The counter value to encode.
 * @param {string} encoderMap - The character set used for encoding.
 * @returns {string} The encoded short URL.
 */
function encodeURL(counter, encoderMap) {
	let n = counter
	const shortUrlChars = []
	const total = encoderMap.length

	while (n) {
		shortUrlChars.push(encoderMap[n % total])
		n = Math.floor(n / total)
	}

	const shortUrl = shortUrlChars.reverse().join("")
	return shortUrl
}

module.exports = { encodeURL }
