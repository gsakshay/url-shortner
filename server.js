/** @format */

const http = require("http")
const mongoose = require("mongoose")
require("dotenv").config()

const app = require("./src/app")
const { createBusinessTires } = require("./src/models/tires/tires.model")
const {
	initializeBusinessCounter,
} = require("./src/models/counter/counter.model")

const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once("open", () => {
	console.log("MongoDB connection successful")
})
mongoose.connection.on("error", (err) => console.error(err))

async function startServer() {
	await mongoose.connect(MONGO_URL)
	// Business logic handling to define our tires -> This can be handlled with controllers and admins further
	tires = await createBusinessTires()
	// console.log(tires) -> Can do something with the following information
	console.log("Successfully created following tires for the Business: ")
	tires?.map((tire) => console.log(tire.tirename))
	// Business logic of handling a main counter
	const counter = await initializeBusinessCounter()
	console.log("Main counter created successfully: ", counter.name)
	server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
}

startServer()
