const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const fileUpload = require("express-fileupload")
const cookieParse = require("cookie-parser")
const errorMiddleware = require('./middlewares/error-middleware')
const cors = require("cors")

dotenv.config()
const app = express()
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
  credentials: true, // Allow cookies and headers
  optionsSuccessStatus: 200 // For legacy browser support (IE11)
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParse({}))
app.use(fileUpload())
app.use(express.static("static"))
// Routes
app.use("/api/post", require("./routes/post-route"))
app.use("/api/auth", require("./routes/auth-route"))

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
const bootstrap = async () => {
    try {
        await mongoose.connect(process.env.DB_KEY)
        console.log("✅ MongoDB is working on...")

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Your server is running on: http://localhost:${PORT}`)
        })

    } catch (error) {
        console.log("Error connecting to MongoDB or running server:", error)
    }
}

bootstrap()