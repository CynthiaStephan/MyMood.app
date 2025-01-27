const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/new', userController.createUser);
router.put('/:id', userController.updateUserInfo);
router.delete('/:id', userController.deleteUserById);

module.exports = router