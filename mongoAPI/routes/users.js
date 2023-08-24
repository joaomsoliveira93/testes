const express = require('express');
const config = require('../config');
const router = express.Router();
const User = require('../models/user')
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const secretKey = 'mongoDBAPI';
    try {
        const payload = {
            userId: req.body.username,
        };

        const options = {
            expiresIn: '2d',
        };
        const token = jwt.sign(payload, secretKey, options);
        const tempuser = await User.findOne({ token: req.body.token });
        if (tempuser) {
            if (tempuser.tokenValidDate < Date.now()) {
                tempuser.token = token;
                tempuser.tokenCreatedAt = Date.now()
                const currentDate = new Date(); // Get the current date and time
                currentDate.setDate(currentDate.getDate() + 2);
                tempuser.tokenValidDate = currentDate;
                tempuser.save()
                if (tempuser.estado === 0) {
                    res.send('inactive');
                } else {
                    res.send(tempuser);
                }
            } else {
                if (tempuser.estado === 0) {
                    res.send('inactive');
                } else {
                    res.send(tempuser);
                }
            }
        } else {
            const user = await User.findOne({ username: req.body.userName, password: req.body.password });
            if (user === null) {
                res.send('NOK')
            } else if (user.estado === 0) {
                res.send('inactive');
            } else {
                if (user.tokenValidDate < Date.now()) {
                    user.token = token;
                    user.tokenCreatedAt = Date.now()
                    const currentDate = new Date(); // Get the current date and time
                    currentDate.setDate(currentDate.getDate() + 2);
                    user.tokenValidDate = currentDate;
                    user.save()
                }
                console.log(user)
                res.send(user);
            }
        }
    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find({}, 'username name tipo appColor appMode email estado ');
        if (users.length > 0) {
            res.json(users);
        } else {
            res.send('null')
        }

    } catch (error) {
        console.error(error);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id }, 'username estado name tipo appColor appMode email ');
        if (user.length > 0) {
            res.json(user[0]);
        } else {
            res.send('null')
        }

    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.post('/user/add', async (req, res) => {
    try {
        const hash = sha256(req.body.user.username + '.2023')
        const user = await User.find({ username: req.body.user.username }, 'username eatado name tipo appColor appMode email ');
        if (user.length > 0) {
            res.json('exists');
        } else {
            const newUser = new User({
                username: req.body.user.username,
                name: req.body.user.name,
                email: req.body.user.email,
                appColor: req.body.user.appColor,
                appMode: req.body.user.appMode,
                password: hash,
                tipo: req.body.user.tipo,
                createdAt: Date.now(),
                createdBy: req.body.userId,
                updatedAt: Date.now(),
                updatedBy: req.body.userId,
                token: '',
                tokenCreatedAt: null,
                tokenValidDate: null,
            });
            const result = await newUser.save();
            console.log(result)
            if (result) {
                res.send(result._id);
            } else {
                res.send('NOK')
            }
        }

    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.put('/user/update', async (req, res) => {
    try {
        const updatedData = {
            name: req.body.user.name,
            email: req.body.user.email,
            appColor: req.body.user.appColor,
            appMode: req.body.user.appMode,
            tipo: req.body.user.tipo,
            estado: req.body.user.estado,
            updatedAt: Date.now(),
            updatedBy: req.body.userId,
        };
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.user._id },
            updatedData,
            { new: false }
        );
        if (updatedUser) {
            res.send('OK');
        } else {
            res.send('NOK')
        }

    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.delete('/user/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.deleteOne(
            { _id: req.params.id }
        );
        if (deletedUser) {
            res.send('OK');
        } else {
            res.send('NOK')
        }
    } catch (error) {
        console.error(error);
        res.send('null')
    }
});

router.put('/user/resetpassword', async (req, res) => {
    try {
        const hash = sha256(req.body.user.username + '.2023')
        const updatedData = {
            password: hash,
            updatedAt: Date.now(),
            updatedBy: req.body.userId,
        };
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.user._id },
            updatedData,
            { new: false }
        );
        if (updatedUser) {
            res.send('OK');
        } else {
            res.send('null')
        }

    } catch (error) {
        console.error(error);
    }
});

router.put('/user/changepassword', async (req, res) => {
    try {
        const hash = sha256(req.body.password);
        const user = await User.findOne({ _id: req.body.userId }, 'password');

        if (hash === user.password) {
            const hashNew = sha256(req.body.newpassword);
            const updatedData = {
                password: hashNew,
                updatedAt: Date.now(),
                updatedBy: req.body.userId,
            };
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                updatedData,
                { new: false }
            );
            if (updatedUser) {
                res.send('OK');
            } else {
                res.send('NOK')
            }
        } else {
            res.send('errada')
        }
    } catch (error) {
        console.error(error);
        res.send('null');

    }
});

module.exports = router;