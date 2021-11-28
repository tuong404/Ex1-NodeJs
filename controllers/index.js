const jwt = require('jsonwebtoken');
const Users = require('../model/index')

const secretKey = '123123';

const loginController = (req, res) => {

    Users.findOne({
        username: req.body.username,
        password: req.body.password
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            const accessToken = jwt.sign({ username: user.username, role: user.role },
                secretKey,
            )
            res.json({
                accessToken
            });
        } else {
            res.send('Username or password incorrect');
        }

    });

}
const decodeJWT = (token) => {
    try {
        return jwt.decode(token);
    } catch (err) {
        console.log(err.message);
        return null;
    }
};
const authentication = (req, res, next) => {
    const headers = req.headers;
    const token = headers['authorization'];
    const data = decodeJWT(token);

    if (!data) {
        res.send('loi!!!')
    };

    req.user = data;
    next();
}
const getProfileController = (req, res) => {
    const username = req.user.username;

    Users.findOne({ username }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.json({
                name: user.name,
                age: user.age,
            });
        }
    })
}

const deleteUserController = (req, res) => {
    const id = req.params.id;

    Users.findOne({ id }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            const role = user.role;
            if (role !== 'admin') {
                res.send('loi!!!')
            } else {
                res.send('Ok');
            }
        }
    })

}

module.exports = {
    authentication,
    loginController,
    getProfileController,
    deleteUserController,
};