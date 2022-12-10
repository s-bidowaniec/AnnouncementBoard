const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware')
const announcementsController = require('../controllers/announcements.controller')

router.get('/ads', announcementsController.getAll);
router.get('/ads/:id', announcementsController.getById);
router.get('/ads/search/:searchPhrase', announcementsController.search);
router.post('/ads', authMiddleware, announcementsController.create);
router.put('/ads/:id', authMiddleware, announcementsController.update);
router.delete('/ads/:id', authMiddleware, announcementsController.delete);

module.exports = router;
