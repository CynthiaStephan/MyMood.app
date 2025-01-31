const { Router } = require('express');
const cohortController = require('../controllers/cohortController');

const router = Router();

router.get('/', cohortController.getCohorts);
router.get('/:id', cohortController.getCohortById);
router.post('/new', cohortController.createCohort);
router.put('/update/:id', cohortController.updateCohort);
router.delete('/delete/:id', cohortController.deleteCohort);
router.post('/asign-user', cohortController.assignUserToCohort);
router.delete('/unasign-user', cohortController.deleteUserFromCohort);

module.exports = router