const mongoose = require("mongoose")

const editedEntrySchema = new mongoose.Schema(
    {
        eInvoiceNo: {
            type: String,
        },
        oClient: {
            type: String,
        },
        oDate: {
            type: Date,
        },
        eClient: {
            type: String,
    
        },
        oLocation: {
            type: String,
        },
        eLocation: {
            type: String,
            
        },
        oUser: {
            type: String,
        },
        eUser: {
            type: String,
        },
        oIssue: {
            type: String,
        },
        eIssue: {
            type: String,
        },
        oAssignedEngineer: {
            type: String,
        },
        eAssignedEngineer: {
            type: String,
            required: true,
        },
        oComments:{
            type: String,
        },
        eComments: {
            type: String,
        },
        oType: {
            type: String,
        },
        eType: {
            type: String,
            enum: ["remote", "on-site"],
        },
        oStatus: {
            type: String,
        },
        eStatus: {
            type: String,
            enum: ["pending", "done"],
        },

}, {timestamps: true}) 

module.exports = mongoose.model("EditedEntry", editedEntrySchema)
