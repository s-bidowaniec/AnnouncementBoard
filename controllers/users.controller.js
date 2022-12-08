const User = require('../models/user.model')
// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await User.find());
    } catch (err) {
        res.status(500).json({"message": err})
    }
}

// POST
exports.create = async (req, res) => {
    try {
        const { login, pass, avatar, phoneNumber } = req.body;
        const newUser = new User({ login, pass, avatar, phoneNumber })
        await newUser.save()
        res.json(newUser)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
// UPDATE
// DELETE
