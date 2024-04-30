const express = require("express")
const router = express.Router()

const {createEntry, showAllEntries, editEntry, deleteEntry } = require("../controllers/Entry")

router.post("/createEntry", createEntry)
router.get("/showAllEntries" , showAllEntries)
router.post("/editEntry", editEntry)
router.delete("/deleteEntry", deleteEntry)

module.exports = router