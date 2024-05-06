const express = require("express")
const app = express()
const entryRoutes = require("./routes/Entry")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const database = require("./config/database")

dotenv.config()
const PORT = process.env.PORT || 4000;

database.connect()

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "https://aeonlogs.onrender.com",
        credentials: true
    })
)


//routesde
app.use("api/v1/entry", entryRoutes)

app.get("/" , (req,res) => {
    return res.json({
        success: true,
        message: "Your server is up and running"
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
}) 