const express = require("express")
const AuthController = require("../controllers/auth-controller")
const validate = require('../middlewares/validate-middlewares')
const { registerValidator, loginValidator } = require("../errors/auth-validator-result")
const router = express.Router()

router.post("/registar", registerValidator, validate, AuthController.registar)
router.get("/activation/:id", AuthController.activation)
router.post("/login", loginValidator, validate, AuthController.login)
router.post("/logout", AuthController.logout)
router.get("/auto_generate", AuthController.refresh)

module.exports = router