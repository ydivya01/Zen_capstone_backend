const mongoose = require("mongoose") ;

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
    unique: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports= mongoose.model("Batch",batchSchema)