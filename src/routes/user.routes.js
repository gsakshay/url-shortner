/** @format */

const express = require("express")
const {
	httpRegisterUser,
	httpGetUserUrls,
} = require("../controllers/users.controller")

const router = express.Router()

router.get("/history/:userId", httpGetUserUrls)
router.post("/register", httpRegisterUser)

module.exports = router
