const mongoose = require("mongoose")

const deleteEntrySchema = new mongoose.Schema({
    Serial: {
        type: Number,

    },
    Date:{
        type: Date,
    },
    Client: {
        type: String,
        required: true,

    },
    Location: {
        type: String,
        
    },
    User: {
        type: String,
    },
    Issue: {
        type: String,
        required: true,
    },
    AssignedEngineer: {
        type: String,
        required: true,
    },
    Comments: {
        type: String,
    },
    Type: {
        type: String,
        enum: ["remote", "on-site"],
    },
    Status: {
        type: String,
        enum: ["pending", "done"],
    },
    DeletedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("DeletedEntry", deleteEntrySchema)