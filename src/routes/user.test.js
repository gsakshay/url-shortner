/** @format */

const request = require("supertest")
const app = require("../app")
const { getUserById } = require("../models/users/user.model")
const { getTireByName } = require("../models/tires/tires.model")

const mongoose = require("mongoose")

beforeAll(async () => {
	// Connect to a test database or set up a test environment
	// Initialize test data or perform any necessary setup

	await mongoose.connect(process.env.MONGO_URL_TEST)
	// Business logic handling to define our tires -> This can be handlled with controllers and admins further
	tires = await createBusinessTires()
	// console.log(tires) -> Can do something with the following information
	console.log("Successfully created following tires for the Business: ")
	tires?.map((tire) => console.log(tire.tirename))
	// Business logic of handling a main counter
	const counter = await initializeBusinessCounter()
	console.log("Main counter created successfully: ", counter.name)
})

afterEach(async () => {
	// Clean up the database after each test
	const collections = mongoose.connection.collections

	for (const key in collections) {
		const collection = collections[key]
		await collection.deleteMany({})
	}
})

afterAll(async () => {
	// Close the database connection after all tests
	await mongoose.connection.dropDatabase()
	await mongoose.connection.close()
})

describe("User Registration", () => {
	test("It should create a new user successfully", async () => {
		const tireName = "Tier 1"
		const username = "test-user"

		// Assuming getTireByName and createUser functions are correctly implemented
		const tire = await getTireByName(tireName)

		const response = await request(app)
			.post("/api/user/register")
			.send({ username, tire: tireName })
			.expect(201)
			.expect("Content-Type", /json/)

		// Check if the returned user matches the created user
		const { _id } = response.body
		const user = await getUserById(_id)
		expect(user.username).toBe(username)
		expect(user.tire.toString()).toBe(tire._id.toString())
	})

	// test("It should return 400 for missing values", async () => {
	// 	await request(app)
	// 		.post("/api/user/register")
	// 		.send({ username: "test-user" })
	// 		.expect(400)

	// 	await request(app)
	// 		.post("/api/user/register")
	// 		.send({ tire: "Tier 1" })
	// 		.expect(400)

	// 	await request(app).post("/api/user/register").send({}).expect(400)
	// })

	// test("It should return 404 for invalid tire", async () => {
	// 	await request(app)
	// 		.post("/api/user/register")
	// 		.send({ username: "test-user", tire: "Invalid Tire" })
	// 		.expect(404)
	// })
})
