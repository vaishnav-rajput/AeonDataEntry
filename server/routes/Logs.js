const express = require("express")
const router = express.Router()

const {getDeletedEntries} = require("../controllers/Logs")

router.get("/getDeletedLogs", getDeletedEntries)
module.exports = router