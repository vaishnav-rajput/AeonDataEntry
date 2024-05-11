const express = require("express")
const router = express.Router()

// const {createEntry, showAllEntries, editEntry, deleteEntry } = require("../controllers/Entry")
 const {createClient, clientDetails, showAllClients, clientEntries} = require("../controllers/Client")

router.post("/createClient" , createClient)
router.get("/clientDetails" , clientDetails)
router.get("/showAllClients", showAllClients)
router.post("/clientEntries", clientEntries)

module.exports = router 