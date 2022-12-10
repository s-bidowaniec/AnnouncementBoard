const Announcement = require('../models/announcement.model')
// GET
exports.getAll = async (req, res) => {
    try {
        res.json(await Announcement.find());
    } catch (err) {
        res.status(500).json({"message": err})
    }
}

exports.getById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if(!announcement) res.status(404).json({ message: 'Not found' });
        else res.json(announcement);
    } catch (err) {
        res.status(500).json({message: err});
    }
}

exports.search = async (req, res) => {
    const re = new RegExp(req.params.searchPhrase,"i");
    try {
        res.json(await Announcement.find({$or: [{title: { $regex: re}}, {content: { $regex: re}}]}));
    } catch (err) {
        res.status(500).json({"message": err})
    }
}

// POST
exports.create = async (req, res) => {
    try {
        const { title, content, date, photo, price, location, seller } = req.body;
        const newAnnouncement = new Announcement({ title, content, date, photo, price, location, seller })
        await newAnnouncement.save()
        res.json(newAnnouncement)
    } catch (err) {
        res.status(500).json({message: err})
    }
}

// UPDATE
exports.update = async (req, res) => {
    const { title, content, date, photo, price, location, seller } = req.body;
    try {
        const updatedAnnouncement = await Announcement.findById(req.params.id);
        if (updatedAnnouncement) {
            updatedAnnouncement.title = title;
            updatedAnnouncement.content = content;
            updatedAnnouncement.date = date;
            updatedAnnouncement.photo = photo;
            updatedAnnouncement.price = price;
            updatedAnnouncement.location = location;
            updatedAnnouncement.seller = seller;
            await updatedAnnouncement.save()
            res.json(updatedAnnouncement);
        } else {
            res.status(404).json({message: 'Not found...'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
}
// DELETE
exports.delete = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if(announcement){
            await announcement.remove();
            res.json(announcement);
        }
        else res.status(404).json({message: 'Not found...'})
    } catch(err) {
        res.status(500).json({ message: err });
    }
}
