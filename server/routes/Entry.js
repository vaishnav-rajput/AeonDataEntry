const express = require("express")
const router = express.Router()

const {createEntry, showAllEntries, editEntry, deleteEntry, addTime } = require("../controllers/Entry")

router.post("/createEntry", createEntry)
router.get("/showAllEntries" , showAllEntries)
router.post("/editEntry", editEntry)
router.post("/deleteEntry", deleteEntry)
router.post("/addTime", addTime)

module.exports = router