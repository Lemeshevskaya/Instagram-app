const express = require('express');
const router = express.Router();

//dummy test
router.get('/test', (req,res) => res.json({msg: 'posts works.'}));

//export
module.exports = router;