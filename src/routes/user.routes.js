/** @format */

// Importing necessary modules
const express = require("express")

// Importing controller functions for user operations
const {
	httpRegisterUser, // Function to handle user registration
	httpGetUserUrls, // Function to fetch user's URL history
} = require("../controllers/users.controller")

// Creating a router instance from Express
const router = express.Router()

// Defining routes and associating them with respective controller functions
router.get("/history/:userId", httpGetUserUrls) // Route to fetch user's URL history by ID
router.post("/register", httpRegisterUser) // Route to register a new user

// Exporting the router to use in the main app
module.exports = router
