const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Test auth route
// @access  public (no auth needed)
router.get('/', (req,res) => res.send("You have sent a get request to auth route..."));

module.exports = router;