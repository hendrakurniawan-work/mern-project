const express = require('express');

const router = express.Router();

// @route   GET api/post
// @desc    Test post route
// @access  public (no auth needed)
router.get('/', (req,res) => res.send("You have sent a get request to post route..."));

module.exports = router;