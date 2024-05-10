const express = require("express")
const router = express.Router()

// const {createEntry, showAllEntries, editEntry, deleteEntry } = require("../controllers/Entry")
 const {createClient, clientDetails} = require("../controllers/Client")

router.post("/createClient" , createClient)
router.get("/clientDetails" , clientDetails)

module.exports = router