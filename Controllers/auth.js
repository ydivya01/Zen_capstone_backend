
const bcrypt= require("bcrypt")

const jwt = require("jsonwebtoken")

const Student = require( "../Models/student")
const Admin = require("../Models/admin")
const Batch = require("../Models/batch.model")

 const adminRegister=async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const admin = new Admin({
      username:req.body.username,
      email: req.body.email,
      password: hash,
    });
    await admin.save();
    res.json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" });
  }
}

 const stuRegister = async (req, res) => {
  try {
    const stuData = await Student.findOne({ email: req.body.email });

    if (!stuData) {
      const batchData = await Batch.findOne({ batchName: req.body.batchName });
      req.body.batchId = batchData._id;
      

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;

      await Student.create(req.body);
      console.log(hash, "hashed");
      res.json({ message: "Student updated" });
    } else {
      res.json({ message: "Student already exists" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" });
  }
};

 const login = async (req, res) => {
  try {
    const mail = await Admin.findOne({ email: req.body.email });
    const sMail = await Student.findOne({ email: req.body.email });
    console.log(mail);
    if (mail) {
      const compare1 = await bcrypt.compare(req.body.password, mail.password);
      if (compare1) {
        const token = jwt.sign({ _id: mail._id }, process.env.JWT, {
          expiresIn: "120m",
        });

        res.json({ token: token, name: mail.username, admin: true });
      } else {
        res.json({ message: "Rejected" });
      }
    }

    if (sMail) {
      const compare2 = await (req.body.password, sMail.password);

      if (compare2) {
        const token = jwt.sign({ _id: sMail._id }, process.env.JWT, {
          expiresIn: "100m",
        });
        console.log(sMail);
        res.json({
          token: token,
          name: sMail.username,
          userId: sMail._id,
          admin: false,
          batch_id: sMail.batchId,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports={
  adminRegister,
  stuRegister,
  login
}