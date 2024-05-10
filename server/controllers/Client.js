const {Mongoose} = require("mongoose")
const Client = require("../models/Client")

exports.createClient = async (req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res
                .status(400)
                .json({success: false, message: "all fields are mandatory"})
        }
        const ClientDetails = await Client.create({name: name})
        return res.status(200).json({
            success: true,
            message: "Client Created Successfully"
        })
    } catch(error){
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}

exports.clientDetails = async (req, res) => {
    try {
        const {clientId} = req.body

        const clientDetails = await Client.findById(clientId)
                    .populate({
                        path: "entries",

                    }).exec()
        return res.status(200).json({
            success: true,
            data: clientDetails
        })
    } catch (error) {
          console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}