const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied...");
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();

        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.generateJWT = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET);auth
  return token
}
