/** @format */

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const apiRouter = require("./routes")
const redirectRouter = require("./routes/redirect.routes")

const app = express()

app.use(cors())
app.use(morgan("combined"))
app.use(express.json())

app.use("/api", apiRouter)
app.use("/", redirectRouter)

// handle undefined routes
app.all("*", (req, res, next) => {
	next(new customError("404 Route Not Found", 404, "warn"))
})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

module.exports = app
