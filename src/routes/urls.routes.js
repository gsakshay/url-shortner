/** @format */

const express = require("express")
const { httpShortenUrl } = require("../controllers/urls.controller")

const router = express.Router()

router.post("/shorten", httpShortenUrl)

module.exports = router
