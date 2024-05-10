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
})

module.exports = mongoose.model("Client", clientSchema)