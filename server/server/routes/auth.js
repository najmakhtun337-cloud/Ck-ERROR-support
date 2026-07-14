const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/*
==========================
REGISTER
POST /api/auth/register
==========================
*/

router.post("/register", async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const checkUser = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Username or Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user"
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration Successful"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});


/*
==========================
LOGIN
POST /api/auth/login
==========================
*/

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email & Password Required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }

});

module.exports = router;
