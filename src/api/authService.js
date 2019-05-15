const tokenAuth = require('../models/tokenAuth.js');
const CryptoHelper = require('../helpers/cryptoHelper');
const JWTtoHelper = require('../helpers/jwtHelper');

tokenAuth.auth = (req, res) => {
    const cryptoHelper = new CryptoHelper();
    const jwtHelper = new JWTtoHelper();
    const { body } = req;
    if (!body.tokenAuth) {
        res.status(422).json({ code: 422, message: 'Token auth are required' });
    } else {
        const chain = Promise.resolve();
        chain
            .then(() => cryptoHelper.encrypt(body.tsokenAuth))
            .then(token => tokenAuth.find({ token, isEnabled: true }))
            .then((token) => {
                if (token.length > 0) {
                    return token[0];
                }
                const error = { code: 401, message: 'Email or password are incorrect' };
                throw error;
            })
            .then((token) => {
                const jwt = jwtHelper.createToken(token);
                token.token = jwt;
                res.status(200).json(token);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
};

module.exports = tokenAuth;
