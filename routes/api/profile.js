const express = require('express');
const router = express.Router();

//dummy test
router.get('/test', (req,res) => res.json({msg: 'profile works.'}));

//export
module.exports = router;