const Announcement = require('../models/announcement.model')
const getImageFileType = require("../utils/getImageFileType");
const fs = require('fs');
const path = require('path')
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
        const { title, content, date, price, location, seller } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        console.log(req.body);
        console.log(fileType);
        if(title && typeof title === 'string'
            && content && typeof content === 'string'
            && date && typeof date === 'string'
            && price && typeof price === 'string'
            && location && typeof location === 'string'
            && seller && typeof seller === 'string'
            && ['image/png', 'image/gif', 'image/jpeg'].includes(fileType)){
            const newAnnouncement = new Announcement({ title, content, date, photo: path.basename(req.file.path), price, location, seller })
            await newAnnouncement.save()
            res.status(200).json({message: 'announcement created', photo: path.basename(req.file.path), id: newAnnouncement.id})
        } else {
            if(req.file){fs.unlinkSync(req.file.path)};
            res.status(400).send({message: "Bad request"})
        }
    } catch (err) {
        if(req.file){fs.unlinkSync(req.file.path)};
        res.status(500).json({message: err})
    }
}

// UPDATE
exports.update = async (req, res) => {
    const { title, content, date, price, location, seller } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    let validPhoto = false;
    if (['image/png', 'image/gif', 'image/jpeg'].includes(fileType)){
        validPhoto = true;
    } else {
        if(req.file){fs.unlinkSync(req.file.path)};
    }
    try {
        const updatedAnnouncement = await Announcement.findById(req.body._id);
        const oldPhoto = updatedAnnouncement.photo;
        if (updatedAnnouncement) {
            updatedAnnouncement.title = title ? title : updatedAnnouncement.title;
            updatedAnnouncement.content = content ? content : updatedAnnouncement.content;
            updatedAnnouncement.date = date ? date : updatedAnnouncement.date;
            updatedAnnouncement.photo = validPhoto ? req.file.path : updatedAnnouncement.photo;
            updatedAnnouncement.price = price ? price : updatedAnnouncement.price;
            updatedAnnouncement.location = location ? location : updatedAnnouncement.location;
            updatedAnnouncement.seller = seller ? seller : updatedAnnouncement.seller;
            await updatedAnnouncement.save();
            if(validPhoto){fs.unlinkSync(oldPhoto)};
            res.status(200).json({message:'Success announcement updated', photo: path.basename(req.file.path)});
        } else {
            if(req.file){fs.unlinkSync(req.file.path)};
            res.status(404).json({message: 'Not found...'})
        }
    }
    catch(err) {
        if(req.file){fs.unlinkSync(req.file.path)};
        res.status(500).json({ message: err });
    }
}
// DELETE
exports.delete = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        console.log(`/public/uploads/${announcement.photo}`);
        if(announcement){
            fs.unlinkSync(`public/uploads/${announcement.photo}`);
            await announcement.remove();
            res.json(announcement);
        }
        else res.status(404).json({message: 'Not found...'})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}
