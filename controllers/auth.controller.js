const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType')
exports.register = async(req, res) => {
    try{
        const {login, password, phoneNumber} = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/png', 'image/gif', 'image/jpeg'].includes(fileType)){
            const userWithLogin = await User.findOne({login});
            if (userWithLogin){
                if(req.file){fs.unlinkSync(req.file.path)};
                console.log(req.file)
                return res.status(409).send({message: "Bad request"});
            }
            const user = await User.create({login, password: await bcrypt.hash(password, 10), avatar: req.file.path, phoneNumber});
            res.status(201).send({message: "User created" + user.login});
        } else {
            if(req.file){fs.unlinkSync(req.file.path)};
            res.status(400).send({message: "Bad request"})
        }
    } catch (err){
        if(req.file){fs.unlinkSync(req.file.path)};
        res.status(500).send({message: err.message});
    }
}
exports.login = async(req, res) => {
    try {
        const {login, password} = req.body;
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({login});
            if(!user){
                res.status(400).send({message: "Login or password are inncorect"})
            } else {
                if (bcrypt.compareSync(password, user.password)){
                    req.session.login = user.login;
                    res.status(200).send({message: "Login successful"})
                } else {
                    res.status(400).send({message: "Login or password are inncorect"})
                }
            }
        } else {
            res.status(400).send({message: "Bad request"})
        }
    } catch (err) {
        res.status(500).send({message: err.message});

    }
}

exports.logout = async(req, res) => {
    try{
        req.session.destroy();
        res.status(200).send({message: "Logout successful"})
    }catch (err){
        res.status(500).send({message: err.message});
    }

}

exports.getUser = async(req, res) => {
    res.send({message: "Session active"})
}
