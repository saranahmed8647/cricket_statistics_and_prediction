const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://faisal_khan:Test1abc@merndb.f2zzd.mongodb.net/MernDB?retryWrites=true&w=majority"

// mongoose.connect(MONGO_URI || "mongodb://localhost:27017/MernDB", (err)=>
// {
//     if(!err)
//     {
//         console.log("Connection successful to DB ");

//     }
//     else
//     {
//         console.log("error in DB connection "+ JSON.stringify(err, undefined,2));
//     }

// })

mongoose.connect(MONGO_URI || "mongodb://localhost:27017/MernDB", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on("connected", () =>
{
            console.log("Connection successful to DB ");
})

module.exports = mongoose;