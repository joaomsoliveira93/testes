const express = require('express');
const config = require('../config');
const router = express.Router();
const Client = require('../models/client');
const Licence = require('../models/licence');

router.get('/allclients', async (req, res) => {
    try {
        const clients = await Client.find({}, 'name ncont morada cidade codPost contacto email rep repContacto repEmail id');
        if (clients.length > 0) {
            res.json(clients);
        } else {
            res.send([])
        }

    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.get('/client/:id', async (req, res) => {
    try {
        const client = await Client.find({ _id: req.params.id },'name ncont morada cidade codPost contacto email rep repContacto repEmail ');
        if (client.length > 0) {
            res.json(client[0]);
        } else {
            res.send('NOK')
        }

    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.post('/client/add', async (req, res) => {
    try {
        const newClient = new Client({
            name: req.body.client.name,
            ncont: req.body.client.ncont,
            morada: req.body.client.morada,
            cidade: req.body.client.cidade,
            codPost: req.body.client.codPost,
            contacto: req.body.client.contacto,
            email: req.body.client.email,
            rep: req.body.client.rep,
            repContacto: req.body.client.repContacto,
            repEmail: req.body.client.repEmail,
            createdAt: Date.now(),
            createdBy: req.body.userId,
            updatedAt: Date.now(),
            updatedBy: req.body.userId,
        });
        const result = await newClient.save();
        if (result) {
            res.send(result._id);
        }else{
            res.send('NOK')
        }
    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.put('/client/update', async (req, res) => {
    try {
        const updatedData = {
            name: req.body.client.name,
            ncont: req.body.client.ncont,
            morada: req.body.client.morada,
            cidade: req.body.client.cidade,
            codPost: req.body.client.codPost,
            contacto: req.body.client.contacto,
            email: req.body.client.email,
            rep: req.body.client.rep,
            repContacto: req.body.client.repContacto,
            repEmail: req.body.client.repEmail,
            updatedAt: Date.now(),
            updatedBy: req.body.userId,
        };
        const updatedClient = await Client.findOneAndUpdate(
            { _id: req.body.client._id },
            updatedData,
            { new: false }
        );
        if (updatedClient) {
            res.send('OK');
        } else {
            res.send('NOK')
        }

    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.delete('/client/delete/:id', async (req, res) => {
    try {

        await Licence.deleteMany({clientId:req.params.id});

        const deletedClient = await Client.deleteOne(
            { _id: req.params.id }
        );

        if (deletedClient) {
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