const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.getUsers);
router.get('/trainee-users', userController.getUsersWhenRoleTrainee);
router.get('/:id', userController.getUserById);
router.post('/new', userController.createUser);
router.put('/update/:id', userController.updateUserInfo);
router.delete('/delete/:id', userController.deleteUserById);
router.put('/activate-alert/:id', userController.activateUserAlert);
router.put('/deactivate-alert/:id', userController.deactivateUserAlert);

module.exports = router