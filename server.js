/** @format */

const http = require("http")
const mongoose = require("mongoose")
require("dotenv").config()

const app = require("./src/app")

const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once("open", () => {
	console.log("MongoDB connection successful")
})
mongoose.connection.on("error", (err) => console.error(err))

async function startServer() {
	await mongoose.connect(MONGO_URL)
	server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
}

startServer()
