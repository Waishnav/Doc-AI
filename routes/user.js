const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const promiseHandler= fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/register',  async (req,res,next) => {
    try {
        const user = await userController.register(req.body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/login',  async (req,res,nex) => {
    try {
        const user = await userController.login(req.body);
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
