const mongoose = require("mongoose")

const editedEntrySchema = new mongoose.Schema(
    {
        eInvoiceNo: {
            type: String,
        },
        eClient: {
            type: String,
            required: true,
    
        },
        eLocation: {
            type: String,
            
        },
        eUser: {
            type: String,
        },
        eIssue: {
            type: String,
            required: true,
        },
        eAssignedEngineer: {
            type: String,
            required: true,
        },
        eComments: {
            type: String,
        },
        eType: {
            type: String,
            enum: ["remote", "on-site"],
        },
        eStatus: {
            type: String,
            enum: ["pending", "done"],
        },
        originalEntryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Entry"
        }

}, {timestamps: true}) 

module.exports = mongoose.model("EditedEntry", editedEntrySchema)
