const mongoose = require("mongoose")
 
const entrySchema = new mongoose.Schema({
    serial: {
        type: Number,

    },
    date: {
        type: Date,
        default: Date.now()
    },
    client: {
        type: String,
        // required: true,

    },
    location: {
        type: String,
        
    },
    user: {
        type: String,
    },
    issue: {
        type: String,
        // required: true,
    },
    assignedEngineer: {
        type: String,
        // required: true,
    },
    comments: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        // enum: ["remote", "on-site"],
    },
    status: {
        type: String,
        // enum: ["pending", "done"],
    },
    time: {
        type: String,

    }
})

module.exports = mongoose.model("Entry", entrySchema)
