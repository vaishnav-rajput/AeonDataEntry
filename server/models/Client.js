const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Entry"
        },
    ],
    email: {
        type: String,
    }
})

module.exports = mongoose.model("Client", clientSchema)