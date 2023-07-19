const express = require("express")
const mongoose = require("mongoose")
var cors = require('cors')
const dotenv = require("dotenv")
const authRoute = require("./Routes/auth.js")

const batchRoute = require("./Routes/batch.js")

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, { dbName: "capstone" });
    console.log("mongo connected");
  } catch (err) {
    console.log(err);
  }
};

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api", batchRoute);
app.get('/', (req,res)=>{
  res.send("Zen Class Event Management For Students")
})

app.listen(process.env.PORT, () => {
  connect();
  console.log("server connected");
});
