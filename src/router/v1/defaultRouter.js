const router = require('express').Router();
const defaultController = require('../../controller/v1/default')

router.route('/check-api').get(defaultController.testAPI);
router.route('/get-all-users').get(defaultController.getAllUsers);
router.route('/get-user').get(defaultController.getUser);
router.route('/get-comment').get(defaultController.getComment);

router.route('/create-user').post(defaultController.createUser);
router.route('/post-comment').post(defaultController.postComment);

module.exports = router;