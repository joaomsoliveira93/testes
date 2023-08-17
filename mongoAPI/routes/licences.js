const express = require('express');
const config = require('../config');
const router = express.Router();
const Licence = require('../models/licence')

router.get('/alllicences/:id', async (req, res) => {
    try {
        const licences = await Licence.find({ clientId: req.params.id }, 'clientId estado tipo obs startedAt endedAt');
        if (licences.length > 0) {
            res.json(licences);
        } else {
            res.send([])
        }
    } catch (error) {
        console.error(error);
    }
});

router.post('/licence/add', async (req, res) => {
    try {
        const newLicence = new Licence({
            clientId: req.body.licence.clientId,
            estado: req.body.licence.estado,
            tipo: req.body.licence.tipo,
            obs: req.body.licence.obs,
            startedAt: req.body.licence.startedAt,
            endedAt: req.body.licence.endedAt,
            createdAt: Date.now(),
            createdBy: req.body.userId,
            updatedAt: Date.now(),
            updatedBy: req.body.userId,
        });
        const result = await newLicence.save();
        if (result) {
            res.send(result);
        }else{
            res.send('NOK')
        }

    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.put('/licence/update', async (req, res) => {
    try {
        const updatedData = {
            clientId: req.body.licence.clientId,
            estado: req.body.licence.estado,
            tipo: req.body.licence.tipo,
            obs: req.body.licence.obs,
            startedAt: req.body.licence.startedAt,
            endedAt: req.body.licence.endedAt,
            updatedAt: Date.now(),
            updatedBy: req.body.userId,
        };
        const updatedlicence = await Licence.findOneAndUpdate(
            { _id: req.body.licence._id },
            updatedData,
            { new: false }
        );
        if (updatedlicence) {
            res.send('OK');
        } else {
            res.send('NOK')
        }
    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.delete('/licence/delete/:id', async (req, res) => {
    try {
        const deletedLicence = await Licence.deleteOne(
            { _id: req.params.id }
        );
        if (deletedLicence) {
            res.send('OK');
        } else {
            res.send('NOK')
        }
    } catch (error) {
        console.error(error);
        res.send('null')
    }
});


module.exports = router;