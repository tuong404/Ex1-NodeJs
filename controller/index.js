const jwt = require('jsonwebtoken');

const users = [{
        id: 1,
        username: 'vantuong',
        password: 'tuong',
        name: 'Van Tuong',
        age: 20,
        role: 'admin',
    },
    {
        id: 2,
        username: 'tuan',
        password: 'tuan',
        name: 'Van Tuan',
        age: 22,
        role: 'user',
    },
]

const secretKey = '123123';
const loginController = (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => {
        return u.username === username && u.password === password
    });

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
    const user = req.user;
    const userProfile = users.find(function(user) {
        return user.username === user.username
    });
    res.json({
        name: userProfile.name,
        age: userProfile.age,
    });

}

const deleteUserController = (req, res) => {
    const user = req.user;
    const userProfile = users.find(function(user) {
        return user.username === user.username
    });
    const role = userProfile.role;
    if (role !== 'admin') {
        res.send('loi!!!')
    } else {
        res.send('Ok');
    }

}

module.exports = {
    authentication,
    loginController,
    getProfileController,
    deleteUserController,
};