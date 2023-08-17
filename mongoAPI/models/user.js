const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        rquired: true
    },
    name: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    estado: {
        type: Number,
        require: true,
        default: 1
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    appMode: {
        type: String,
        require: true,
        default: "dark"
    },
    appColor: {
        type: String,
        required: true,
        default: "#03C9D7"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token:{
        type :String ,
    },
    tokenCreatedAt:{
        type :Date
    },
    tokenValidDate:{
        type :Date
    }
});

module.exports = mongoose.model('User', UserSchema);