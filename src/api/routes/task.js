const express = require('express');
const tasks = require('../taskService');
const JWTHelper = require('../../helpers/jwtHelper');

module.exports = (server) => {
    const router = express.Router();
    const jwtHelper = new JWTHelper();

    server.use('/api', router);

    tasks.register(router, '/tasks');

    router.route('/tasks').get(tasks.getAll);
    router.route('/tasks').post(jwtHelper.verifyToken, tasks.createTask);
};
