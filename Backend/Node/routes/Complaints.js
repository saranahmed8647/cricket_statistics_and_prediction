const router = require("express").Router();
const User = require("../models/user.models");

const ComplaintMessage = require("../models/ComplaintMessage.models");
const Complaint = require("../models/Complaint.models");
const Message = require("../models/ComplaintMessage.models");
// A complaint contains an array of complaint messages

// For creating a new complaint
router.post("/newComplaint", (req,res) =>
{
    const {ComplaintTitle, MessageBody,SenderToken} = req.body;
    let errors = [];

    // console.log(ComplaintTitle);
    // console.log(MessageBody);
    // console.log(SenderToken);

    if(ComplaintTitle.length < 10)
    {
        res.status(400).json("Complaint title must be atleast 10 characters long");
        console.log("Complaint title must be atleast 10 characters long");
    }
    if(MessageBody.length < 25)
    {
        res.status(400).json("Complaint Body must be atleast 25 characters long");
        res.status(400).json("Complaint Body must be atleast 25 characters long");
    }
    User.findOne({_id: SenderToken})
    .then(use =>
        {
            console.log("User present in DB");
            // console.log(JSON.stringify(use));
            now = new Date();
            console.log(`Date to be added : ${now}`);
            console.log(`Type of Date to be added : ${typeof(now)}`);   
            // Now this message will be added to the new complaint
            const NewMessage = new ComplaintMessage(
                {
                    body : MessageBody,
                    Sender: use.email,
                    Time : now
                });

                const NewComplaint = new Complaint(
                    {
                        Initiator:
                        {
                            email:use.email,
                            name: use.name
                        },
                        Title:ComplaintTitle,
                        MessagesList : [NewMessage]
                    });

                    // res.send(NewComplaint);

                    NewComplaint.save()
                    .then(result =>
                        {
                            res.json(result + " : has been saved");
                            console.log("Complaint saved");
                        })
                        .catch(err =>
                            {
                                res.status(400).json("Failed to save complaint to DB : " + err );
                                console.log("Failed to  save complaint");
                            })
        })
    .catch(err =>
        {
            res.status(400).json("No User exists with this Mongo ID : " + err );
        });


    

})

// For admin to get all complaints in DB
router.get("/allComplaints", (req,res) =>
{
    Complaint.find({})
    .then(result => res.json(result))
    .catch(err => res.status(400).json(`Error occured getting complaints : ${err}`));
})

// For displaying the complaint details, searching by initiator email
router.post("/getByEmail", (req,res) =>
{
    console.log("GET BY EMAIL IS NOW RUNNING");
    const {InitiatorEmail} = req.body;

    Complaint.findOne({"Initiator.email" : InitiatorEmail})
    .then(result => 
        {
            res.json(result)
            
        })
    .catch(err => res.status(400).json(`Error occured getting complaint : ${err}`));

})

// For adding new message to complaint
router.post("/addMessage", (req,res) =>
{
    const {MessageBody, SenderEmail,InitiatorEmail} = req.body;
    now = new Date();
    const NewMessage = new ComplaintMessage(
        {
            body : MessageBody,
            Sender: SenderEmail,
            Time : now
        });
    Complaint.updateOne({"Initiator.email" : InitiatorEmail}
    , 
    {$push : {MessagesList : NewMessage}})
    .then(result => res.json("successfuly added message"))
    .catch(err =>res.status(400).json(`Error occured while adding message to Complaint`));
});
// FOr admin to delete a complaint
router.post("/DeleteComplaint" , (req,res) =>
{
    const {InitiatorEmail} = req.body;

    Complaint.findOneAndDelete({"Initiator.email" : InitiatorEmail})
    .then(result => res.json(result))
    .catch(err => res.status(400).json(`Failed to delete Complaint ${err}`));
})

module.exports = router ;

