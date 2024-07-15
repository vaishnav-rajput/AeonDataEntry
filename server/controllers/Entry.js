const Entry = require("../models/Entry")
const DeletedEntry = require("../models/DeletedEntry");

const mongoose = require('mongoose');
const EditedEntry = require("../models/EditedEntry");
const mailSender = require("../utils/mailSender");
const Client = require("../models/Client")

exports.createEntry = async (req, res) =>{
    try {
        const {
            serial,
            invoiceNo,
            client,
            location,
            user,
            issue,
            assignedEngineer,
            comments,
            type,
            status,
            

        } = req.body;

        //validatoin
        // if(
        //     !Client || 
        //     !Issue ||
        //     !AssignedEngineer 

        // ){
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are Mandatory"
        //     })
        // }
        const currentDate = Date.now()


        //create a new Entry
        const newEntry = await Entry.create({
            serial,
            invoiceNo,
            client,
            location,
            user,
            issue,
            assignedEngineer,
            comments:"",
            type,
            status,
        })
        
       
        
        res.status(200).json({
            success: true,
            data: newEntry,
            message: "Entry Created Successfully"
        })

    } catch (error) {
        console.error(error)
    }
}

exports.editEntry = async (req, res) =>{
    try {
        const {entryId} = req.body
        const updates = req.body
        const idInObjectForm =  new mongoose.Types.ObjectId(entryId);
        const originalEntry = await Entry.findById(entryId)
        const oldEntryObject = { ...originalEntry.toObject() };
        
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                originalEntry[key] = updates[key]
             }
        }
        

        await originalEntry.save()




        const updatedEntry = await Entry.findOne({
            _id: idInObjectForm,
          }).exec()
        
        console.log("the previous entry was ", oldEntryObject)
        console.log("the updated entry is ", updatedEntry)

        await EditedEntry.create({
            eInvoiceNo: updatedEntry.invoiceNo,
            oClient:oldEntryObject.client,
            eClient:updatedEntry.client,
            oDate: oldEntryObject.createdAt,
            oLocation:oldEntryObject.location,
            eLocation: updatedEntry.location,
            oUser: oldEntryObject.user,
            eUser: updatedEntry.user,
            oIssue: oldEntryObject.issue,
            eIssue: updatedEntry.issue,
            oAssignedEngineer: oldEntryObject.assignedEngineer,
            eAssignedEngineer: updatedEntry.assignedEngineer,
            oComments: oldEntryObject.comments,
            eComments: updatedEntry.comments,
            oType: oldEntryObject.type ,
            eType: updatedEntry.type,
            oStatus: oldEntryObject.status,
            eStatus: updatedEntry.status,
        })
          
        res.json({
            success: true,
            message: "Entry updated successfully",
            data: {updatedEntry,
                oldEntryObject
            }

        })  

    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
    }
}

exports.deleteEntry = async(req, res) =>{
    try {
        const {_id, invoiceNo, client, createdAt, location, user, issue, assignedEngineer,comments, type, status} = req.body;

        await Entry.findByIdAndDelete(_id)

        // if(!deleteEntry){
        //     return res.status(404).json({message: "entry not found"})
        // }


          const newDeletedEntry = await DeletedEntry.create({
            dInvoiceNo: invoiceNo,            
            dClient: client,
            dDate: createdAt,
            dLocation: location,
            dUser:user,
            dIssue: issue,
            dAssignedEngineer: assignedEngineer,
            dComments: comments,
            dType: type,
            dStatus: status,
        } )

        return res.status(200).json({
            success: true,
            message: "Entry deleted successfully",
            
          })
    } catch (error) {
        console.error(error)
	    return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
    }
}

exports.showAllEntries = async(req,res) =>{
    try {
		const allEntries = await Entry.find({});
        res.status(200).json({
            success: true,
            data: allEntries
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

    exports.addTime = async(req, res) => {
        try {
            const {entryId, time} = req.body
            const idInObjectForm =  new mongoose.Types.ObjectId(entryId);
            const originalEntry = await Entry.findById(entryId)
            const oldEntryObject = { ...originalEntry.toObject() };
            
            originalEntry.time = time
            originalEntry.status = "done"


            await originalEntry.save()
            
            const clientNa = originalEntry.client;
            const tarClient = await Client.findOne({name: clientNa})
            console.log("target client" , tarClient)
            try {
                const emailResponse = await mailSender(
                    tarClient.email,
                    `Issue resolved `,
                    `Your ${originalEntry.issue}  was resolved in ${time}`
                )

            } catch (error) {
                console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
            }
            
            res.json({
                success: true,
                message: "Entry updated successfully",
                data: oldEntryObject

            })  
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }