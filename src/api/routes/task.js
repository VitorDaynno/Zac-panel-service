const express = require('express');
const tasks = require('../taskService');

module.exports = (server) => {
    const router = express.Router();
    server.use('/api', router);

    tasks.register(router, '/tasks');

    router.route('/tasks').get(tasks.getAll);
    router.route('/tasks').post(tasks.createTask);
};
