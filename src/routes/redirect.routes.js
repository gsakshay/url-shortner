/** @format */

// Importing the necessary modules
const express = require("express")

// Importing the controller function for URL redirection
const { httpRedirectShortURL } = require("../controllers/urls.controller")

// Creating a router instance from Express
const router = express.Router()

// Defining the route to handle URL redirection based on the short URL
router.get("/:shortUrl", httpRedirectShortURL) // Route to redirect to the original URL

// Exporting the router to use in the main app
module.exports = router
