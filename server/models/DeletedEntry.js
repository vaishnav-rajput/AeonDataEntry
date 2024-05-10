const mongoose = require("mongoose")

const deleteEntrySchema = new mongoose.Schema({
    dInvoiceNo: {
        type: String,
    },
    dClient: {
        type: String,
        required: true,

    },
    dLocation: {
        type: String,
        
    },
    dUser: {
        type: String,
    },
    dIssue: {
        type: String,
        required: true,
    },
    dAssignedEngineer: {
        type: String,
        required: true,
    },
    dComments: {
        type: String,
    },
    dType: {
        type: String,
        enum: ["remote", "on-site"],
    },
    dStatus: {
        type: String,
        enum: ["pending", "done"],
    },
    
}, {timestamps: true})

module.exports = mongoose.model("DeletedEntry", deleteEntrySchema)