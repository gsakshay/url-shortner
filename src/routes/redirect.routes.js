/** @format */

const express = require("express")
const { httpRedirectShortURL } = require("../controllers/urls.controller")

const router = express.Router()

router.get("/:shortUrl", httpRedirectShortURL)

module.exports = router
