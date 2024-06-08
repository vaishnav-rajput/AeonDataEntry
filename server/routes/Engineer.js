const express = require("express")
const router = express.Router()

// const {createEntry, showAllEntries, editEntry, deleteEntry } = require("../controllers/Entry")
 const {createEngineer,  showAllEngineers, engineerEntries} = require("../controllers/Engineer")

router.post("/createEngineer" , createEngineer)
router.get("/showAllEngineers", showAllEngineers)
router.post("/engineerEntries", engineerEntries)

module.exports = router 