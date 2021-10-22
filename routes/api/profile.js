const express = require('express');

const router = express.Router();

// @route   GET api/profile
// @desc    Test profile route
// @access  public (no auth needed)
router.get('/', (req,res) => res.send("You have sent a get request to profile route..."));

module.exports = router;