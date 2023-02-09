const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require("jsonwebtoken")
const auth = require('../middleware/auth');

const promiseHandler= fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/register',  async (req, res, next) => {
    try {
        const user = await userController.register(req.body);
        console.log("req", req.body,"user",user)
        res.status(201).json({message: "succefully register", user });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/login',  async (req,res, next) => {
    try {
        const user = await userController.login(req.body);
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET);
        console.log(token)
        return res.status(200).json({token: token});
    }
    catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
