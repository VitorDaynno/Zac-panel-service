const express = require('express');
const tokenAuth = require('../authService');

module.exports = (server) => {
    const router = express.Router();

    server.use('/api', router);
    tokenAuth.register(router, '/tasks');

    router.route('/auth').post(tokenAuth.auth);
};
