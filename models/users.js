const mongoose = require("mongoose");
const { Schema } = mongoose; // === const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleID: String,
  displayedName: String,
  credits: { type: Number, default: 0 },
});

module.exports = mongoose.model("users", userSchema);
