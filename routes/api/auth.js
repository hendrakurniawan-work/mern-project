const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Get user by token
// @access  Private (auth needed)
router.get("/", auth, async (req, res) => {
  try {
      const user= await User.findById(req.user.id).select('-password');
      res.json(user);
  } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Private (auth needed)
router.post(
    "/login",
    [
      check("email", "Email is required").isEmail(),
      check(
        "password",
        "Please enter a password with 8 or more characters"
      ).exists({ min: 8 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // See if user exists
        let user = await User.findOne({ email });
  
        if (!user) {
          res
            .status(400)
            .json({ errors: [{ message: "Invalid credentials." }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res
            .status(400)
            .json({ errors: [{ message: "Invalid credentials." }] });
        }
  
        // Return JWT
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );

module.exports = router;
