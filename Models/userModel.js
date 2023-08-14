const mongoose = require("mongoose");

const userSchmea = mongoose.Schema({
        name: String,
        email: String,
        password: String
});

const UserModel = mongoose.model("users",userSchmea);

module.exports = UserModel;