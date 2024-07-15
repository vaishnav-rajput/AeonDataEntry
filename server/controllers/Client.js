const {Mongoose} = require("mongoose")
const Client = require("../models/Client")
const Entry = require("../models/Entry")

exports.createClient = async (req, res) => {
    try{
        const {clientName, clientEmail} = req.body;
        if(clientName == ""){
            return res
                .status(400)
                .json({success: false, message: "all fields are mandatory"})
        }
        const ClientDetails = await Client.create({name: clientName, email: clientEmail})
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


exports.showAllClients = async (req, res) => {
	try {
		const allClients = await Client.find({});
		res.status(200).json({
			success: true,
			data: allClients,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.clientEntries = async(req, res) => {
    try {
        let result = []
        const {clientName} = req.body
        console.log("clientName", clientName)
        const response = await Entry.find({client: clientName})
        console.log("response ", response)
        result = response
        console.log("client Entries response", response)
        res.status(200).json({
            success: true,
            message: "client entries fetched",
            data: result
        })

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}