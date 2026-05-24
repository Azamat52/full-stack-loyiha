const express = require("express")
const AuthController = require("../controllers/auth-controller")

const router = express.Router()

router.post("/registar", AuthController.registar)
router.get("/activation/:id", AuthController.activation)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)
router.get("/auto_generate", AuthController.refresh)

module.exports = router