const express = require("express");
const cors = require("cors");
const { mongoose } = require("./db.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const playerRouter = require("./routes/player");
const teamRouter = require("./routes/team");
// For user
const tempLogin = require("./routes/Signin");
// For Admin
const AdminLogin = require("./routes/AdminLogin");
// For ML Team win prediction
const Prediction = require("./routes/Prediction");
// For complaints
const Complaint = require("./routes/Complaints");

// Routes: 
// app.use("/admin",require("./routes/admin"));
app.use("/team",teamRouter);
app.use("/player",playerRouter);
app.use("/account",tempLogin);
app.use("/admin",AdminLogin)
// For ML predicition.
app.use("/predict",Prediction);
// For complaints 
app.use("/complaints",Complaint);



// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//   });

app.listen(port, () =>
{
    console.log(`the server is currently running on port : ${port}`);
}) 