const { Router } = require('express');
const moodScoreController = require('../controllers/moodScoreController');

const router = Router();

router.get('/:id', moodScoreController.getCurrentMoodByUserId);
router.post('/new/:id', moodScoreController.addMoodScoreToUser);

module.exports = router