const { Router } = require('express');
const moodScoreController = require('../controllers/moodScoreController');

const router = Router();

router.post('/new/:id', moodScoreController.addMoodScoreToUser);
router.get('/:id', moodScoreController.getCurrentMoodByUserId);

module.exports = router