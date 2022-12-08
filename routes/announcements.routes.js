const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcements.controller')

router.get('/ads', announcementsController.getAll);
router.get('/ads/:id', announcementsController.getById);
router.post('/ads', announcementsController.create);
router.put('/ads/:id', announcementsController.update);
router.delete('/ads/:id', announcementsController.delete);

module.exports = router;
