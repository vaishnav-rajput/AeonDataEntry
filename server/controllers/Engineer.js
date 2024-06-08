const {Mongoose} = require("mongoose")
const Engineer = require("../models/Engineer")
const Entry = require ("../models/Entry")

exports.createEngineer = async (req, res) => {
    try{
        const {name} = req.body;
        if(name === ""){
            return res
                .status(400)
                .json({success: false, message: "all fields are mandatory"})
        }
        const EngineerDetails = await Engineer.create({name: name})
        return res.status(200).json({
            success: true,
            message: "Engineer Created Successfully"
        })
    } catch(error){
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}


exports.showAllEngineers = async (req, res) => {
	try {
		const allEngineers = await Engineer.find({});
		res.status(200).json({
			success: true,
			data: allEngineers,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.engineerEntries = async(req, res) => {
    try {
        let result = []
        const {engineerName} = req.body
        console.log("engineerName", engineerName)
        const response = await Entry.find({assignedEngineer: engineerName})
        console.log("response ", response)
        result = response
        console.log("engineer Entries response", response)
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