const express = require("express")
const app = express()
const entryRoutes = require("./routes/Entry")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const database = require("./config/database")
const clientRoutes = require("./routes/Client")
const logsRoutes = require("./routes/Logs") 

dotenv.config()
const PORT = process.env.PORT || 4000;


app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "https://aeonlogs.vercel.app",
        // origin: "http://localhost:3000",
        credentials: true
    })
)

database.connect()


//routes
app.use("/api/v1/entry", entryRoutes)
app.use("/api/v1/client", clientRoutes )
app.use("/api/v1/logs", logsRoutes)

app.get("/" , (req,res) => {
    return res.json({
        success: true,
        message: "Your server is up and running"
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
}) 