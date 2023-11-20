/** @format */

// Importing necessary modules
const express = require("express")

// Importing controller function for URL shortening
const { httpShortenUrl } = require("../controllers/urls.controller")

// Creating a router instance from Express
const router = express.Router()

// Defining the route to handle URL shortening requests
router.post("/shorten", httpShortenUrl) // Route to shorten a URL

// Exporting the router to use in the main app
module.exports = router
