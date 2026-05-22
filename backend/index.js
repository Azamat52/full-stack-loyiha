const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const app = express()

app.use(express.json())
// Routes
app.use("/api/lessons", require("./routes/lesson-route"))


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