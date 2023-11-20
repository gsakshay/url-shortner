/** @format */

const express = require("express")
const router = express.Router()

const urlRouter = require("./urls.routes")
const userRouter = require("./user.routes")

router.use("/user", userRouter)
router.use("/url", urlRouter)

module.exports = router
