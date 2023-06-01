const bcrypt = require("bcryptjs");
const User = require("../user/userModel");

exports.hashPassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

exports.checkPassword = async (req, res, next) => {    
    try {
        const userAccount = await User.findOne({ username: req.body.username });
        if (await bcrypt.compare(req.body.password, userAccount.password)) {
            req.user = userAccount;
            next();
        } else {
            res.status(500).send({ message: "Incorrect password." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
};