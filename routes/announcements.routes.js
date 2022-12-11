const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware')
const announcementsController = require('../controllers/announcements.controller')
const imageUpload = require("../utils/imageUpload");

router.get('/ads', announcementsController.getAll);
router.get('/ads/:id', announcementsController.getById);
router.get('/ads/search/:searchPhrase', announcementsController.search);
router.post('/ads', authMiddleware, imageUpload.single('photo'), announcementsController.create);
router.put('/ads/:id', authMiddleware, imageUpload.single('photo'), announcementsController.update);
router.delete('/ads/:id', authMiddleware, announcementsController.delete);

module.exports = router;
