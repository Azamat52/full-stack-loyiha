const express = require("express")
const AuthController = require("../controllers/auth-controller")

const router = express.Router()

router.post("/registar", AuthController.registar)


module.exports = router