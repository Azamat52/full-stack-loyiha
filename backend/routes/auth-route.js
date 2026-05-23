const express = require("express")
const AuthController = require("../controllers/auth-controller")

const router = express.Router()

router.post("/registar", AuthController.registar)
router.get("/activation/:id", AuthController.activation)



module.exports = router