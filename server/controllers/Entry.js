const Entry = require("../models/Entry")
const DeletedEntry = require("../models/DeletedEntry");

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
        const entry = await Entry.findById(entryId)

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                entry[key] = updates[key]
             }
        }
        
        await entry.save()

        const updatedEntry = await Entry.findOne({
            _id: entryId,
          }, {new: true}).exec()

        res.json({
            success: true,
            message: "Entry updated successfully",
            data: updatedEntry

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
        const {_id, invoiceNo, client, location, user, issue, assignedEngineer,comments, type, status} = req.body;

        await Entry.findByIdAndDelete(_id)

        // if(!deleteEntry){
        //     return res.status(404).json({message: "entry not found"})
        // }


          const newDeletedEntry = await DeletedEntry.create({
            dInvoiceNo: invoiceNo,            
            dClient: client,
            dLocation: location,
            dUser:user ,
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