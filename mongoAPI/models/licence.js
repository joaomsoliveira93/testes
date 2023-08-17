const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "client"
    },
    estado: {
        type: Boolean,
        required: true,
        default:false
    },
    tipo: {
        type: String,
        required: true
    },
    obs: {
        type: String,
        default:''
    },
    startedAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    endedAt: {
        type: Date,
        required: true,
        default: Date.now()
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
    }
});

module.exports = mongoose.model('License', LicenseSchema);