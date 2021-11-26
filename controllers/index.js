const jwt = require('jsonwebtoken');
const Users = require('../model/index')

const secretKey = '123123';

const loginController = (req, res) => {
    const { username, password } = req.body;
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
            this.name = username;
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
    const user = data;
    next();
}
const getProfileController = (req, res) => {

    Users.findOne({ username: this.name }).exec((err, x) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (x) {
            res.json({
                name: x.name,
                age: x.age,
            });
        }
    })
}

const deleteUserController = (req, res) => {

    Users.findOne({ username: this.name }).exec((err, x) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (x) {
            const role = x.role;
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