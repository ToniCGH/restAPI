const User = require("./userModel");

exports.userAdd = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).send({ username: newUser.username })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
};

exports.userLogin = async (req, res) => {
    try {
        res.status(200).send({ user: req.user })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
};

exports.userList = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send({ users })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
}

exports.userUpdate = async (req, res) => {    
    try {
        if (req.body.newusername) {
            const updateUser = await User.updateOne(
                { username: req.body.username },
                { $set: { username: req.body.newusername } }
            );
            res.status(200).send({
                updateUser,
                message: `Username successfully updated to: ${req.body.newusername}`,
            });
        } else {
            res.status(400).send({ message: "Invalid request." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
};

exports.userDelete = async (req, res) => {
    try {
        const deleteUser = await User.deleteOne({ username: req.body.username });
        res.status(200).send({ deleteUser, message: "User successfully deleted." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};