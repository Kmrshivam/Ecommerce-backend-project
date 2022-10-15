const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    last_name:String,
    email:String
});

module.exports = mongoose.model("users", userSchema);