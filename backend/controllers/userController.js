const User = require('../models/users');
const bcrypt = require("bcrypt");

exports.register = async (user) => {
    try {
        if (!user) {
            return { error: 'Please provide all required fields', status: 400}
        }
        const name = user.name;
        const email = user.email;
        const password = user.password;

        const exitstingUser = await User.findOne({ email });
        if (exitstingUser) {
            return { error: 'User already exists', status: 400 };
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        return newUser;
    }
    catch (error) {
        console.log("error in user registration", error)
        return { error: 'User already exists', status: 500 };
    }
}

exports.login = async (user) => {
    try {
        if (!user) {
            return { error: 'Please provide all required fields', status: 400 };
        }
        const email = user.email;
        const password = user.password;

        const loggedinUser = await User.findOne({ email });
        if (!loggedinUser) {
            return { error: 'User not found on login', status: 400 };
        }
        // console.log(loggedinUser)
        const isMatch = (password == loggedinUser.password)
        if (!isMatch) {
            return { error: 'Credentials do not match', status: 400 };
        }
        return loggedinUser;
    }
    catch (error) {
        console.log("error in user login", error)
        return { error: 'User not found on login', status: 500 };
    }
}

exports.getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log("error in finding users", error)
        return { error: 'User not found on login', status: 500 };
    }
}
