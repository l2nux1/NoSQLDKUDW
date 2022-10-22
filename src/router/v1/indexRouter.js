const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send("<h1>Welcome to NoSQLKUDW</h1>")
});

module.exports = router;