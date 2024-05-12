const Entry = require("../models/Entry")
const DeletedEntry = require("../models/DeletedEntry")


exports.getDeletedEntries = async(req,res) => {
    try {
        const allDeletedEntries = await DeletedEntry.find({})
        res.status(200).json({
            success: true,
            data: allDeletedEntries
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    
    }
}