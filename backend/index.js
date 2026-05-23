const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const requestTime = require("./middlewares/request-time")
const fileUpload = require("express-fileupload")
const cookieParse = require("cookie-parser")

dotenv.config()
const app = express()

app.use(requestTime)
app.use(express.json())
app.use(cookieParse({}))
app.use(fileUpload({}))
app.use(express.static("static"))

// Routes
app.use("/api/post", require("./routes/post-route"))
app.use("/api/auth", require("./routes/auth-route"))

const PORT = process.env.PORT || 5000
const bootstrap = async () => {
    try {
        await mongoose.connect(process.env.DB_KEY)
        console.log("MongoDB is working on...")

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Your server is running on: http://localhost:${PORT}`)
        })

    } catch (error) {
        console.log("Error connecting to MongoDB:", error)
    }
}

bootstrap()