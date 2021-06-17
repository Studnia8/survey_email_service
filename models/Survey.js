const mongoose = require("mongoose");
const { Schema } = mongoose; // === const Schema = mongoose.Schema;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema], //array of recipients (object), added subcoletion
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

module.exports = mongoose.model("surveys", surveySchema);
