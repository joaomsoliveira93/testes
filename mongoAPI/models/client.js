const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        rquired: true
    },
    ncont: {
        type: String,
        required: true
    },
    morada: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        require: true,
    },
    codPost: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
    },
    rep: {
        type: String,
        default:''
    },
    repContacto: {
        type: String,
        default:''
    },
    repEmail: {
        type: String,
        default:''
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

module.exports = mongoose.model('Client', ClientSchema);