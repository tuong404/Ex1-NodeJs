const controller = require('../controllers/index');

const route = (app) => {

    app.post('/api/v1/login', controller.loginController)
    app.get('/api/v1/users/profile', controller.authentication, controller.getProfileController)
    app.delete('/api/v1/users/1', controller.authentication, controller.deleteUserController)
};

module.exports = route;