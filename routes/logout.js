var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    req.logout();
    req.session.destroy(() => res.end());
});

module.exports = router;