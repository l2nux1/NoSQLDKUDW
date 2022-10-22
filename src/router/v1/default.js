const router = require('express').Router();
const defaultController = require('../../controller/v1/default')

router.route('/check-api').get(defaultController.testAPI);

module.exports = router;