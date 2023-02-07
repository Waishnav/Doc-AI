const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");

/* REGISTER USER */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: passwordHash
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("error",err)
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token, process.env.JWT_SECRET)
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
