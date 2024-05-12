const Entry = require("../models/Entry")
const DeletedEntry = require("../models/DeletedEntry")
const EditedEntry = require("../models/EditedEntry")


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

exports.getEditedEntries = async(req,res) => {
    try {
        const allEditedEntries = await EditedEntry.find({})
        res.status(200).json({
            success: true,
            data: allEditedEntries
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}