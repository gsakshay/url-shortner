/** @format */

// Importing necessary modules
const http = require("http")
const mongoose = require("mongoose")
require("dotenv").config()

// Importing the Express app
const app = require("./src/app")

// Importing necessary functions from models
const { createBusinessTires } = require("./src/models/tires/tires.model")
const {
	initializeBusinessCounter,
} = require("./src/models/counter/counter.model")

// Setting up environment variables
const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL

// Creating an HTTP server using Express app
const server = http.createServer(app)

// Establishing MongoDB connection
mongoose.connection.once("open", () => {
	console.log("MongoDB connection successful")
})
mongoose.connection.on("error", (err) => console.error(err))

// Starting the server after database setup
async function startServer() {
	// Connecting to MongoDB
	await mongoose.connect(MONGO_URL)

	// Creating business tires (can be further handled with controllers/admins)
	const tires = await createBusinessTires()
	console.log("Successfully created following tires for the Business: ")
	tires?.map((tire) => console.log(tire.tirename))

	// Initializing the main counter for business logic
	const counter = await initializeBusinessCounter()
	console.log("Main counter created successfully: ", counter.name)

	// Starting the server to listen on defined PORT
	server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
}

// Calling the startServer function to begin the server setup
startServer()
