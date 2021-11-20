const express = require('express');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const app = express();

const users = [{
        username: 'vantuong',
        password: 'tuong',
        name: 'Van Tuong',
        age: 20,
        role: 'admin',
    },
    {
        username: 'tuan',
        password: 'tuan',
        name: 'Van Tuan',
        age: 22,
        role: 'user',
    },
]
const secretKey = '123123';
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);

app.use(bodyparser.json());

app.post('/api/v1/login', function(req, res) {
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
})
const decodeJWT = (token) => {
    try {
        return jwt.decode(token);
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

const getProfileController = (req, res) => {
    const headers = req.headers;
    const token = headers['authorization'];
    const data = decodeJWT(token);
    console.log(data, 'data');

    if (!data) {
        res.send('loi!!!')
    };
    const userProfile = users.find(function(user) {
        return user.username === data.username
    });
    res.json({
        name: userProfile.name,
        age: userProfile.age,
    });

    // res.send('ok');
}
app.get('/api/v1/users/profile', getProfileController)

app.listen(3000);
console.log('stared');