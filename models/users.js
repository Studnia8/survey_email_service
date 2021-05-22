const mongoose = require('mongoose');
const { Schema } = mongoose; // === const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleID: String,
    displayedName: String,
});

module.exports = mongoose.model('users', userSchema);