const User = require('../models/users');

exports.register = async (user) => {
    try {
        if (!user) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const email = user.email;
        const password = user.password;
        const name = user.name;

        const newUser = await User.findOne({ email });
        if (newUser) {
            return res.status(400).json({ error: 'User already exists'});
        }
        const user = new User({ name, email, password });
        await user.save();
        return user;
    }
    catch (error) {
        console.log("error in user registration", error)
    }
}

exports.login = async (user) => {
    try {
        if (!user) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const email = user.email;
        const password = user.password;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'credentials do not match' });
        }
        return user;
    }
    catch (error) {
        console.log("error in user login", error)
    }
}

exports.getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log("error in finding users", error)
    }
}