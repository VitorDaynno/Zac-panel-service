const tokenAuth = require('../models/tokens');
const CryptoHelper = require('../helpers/cryptoHelper');
const JWTHelper = require('../helpers/jwtHelper');

tokenAuth.auth = (req, res) => {
    const cryptoHelper = new CryptoHelper();
    const jwtHelper = new JWTHelper();
    const { body } = req;
    if (!body.tokenAuth) {
        res.status(422).json({ code: 422, message: 'Token auth are required' });
    } else {
        const chain = Promise.resolve();
        chain
            .then(() => cryptoHelper.encrypt(body.tokenAuth))
            .then((token) => {
                const filter = { token, isEnabled: true };
                return tokenAuth.find(filter, { _id: 0, isEnabled: 0 });
            })
            .then((token) => {
                if (token.length > 0) {
                    return token[0];
                }
                const error = { code: 401, message: 'Token are incorrect' };
                throw error;
            })
            .then((token) => {
                const response = {};
                response.usuId = token.usuId;
                const jwt = jwtHelper.createToken(JSON.parse(JSON.stringify(token)));
                response.token = jwt;
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json({ error: error.toString() });
            });
    }
};

module.exports = tokenAuth;
