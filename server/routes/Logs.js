const express = require("express")
const router = express.Router()

const {getDeletedEntries, getEditedEntries} = require("../controllers/Logs")

router.get("/getDeletedLogs", getDeletedEntries)
router.get("/getEditedEntries", getEditedEntries)
module.exports = router