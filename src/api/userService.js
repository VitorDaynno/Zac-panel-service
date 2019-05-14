const tokenAuth = require('../models/tokenAuth');


tokenAuth.auth = (req, res) => {
    const { body } = req;
    if (!body.tokenAuth) {
        res.code(422).json({ code: 422, message: 'Token auth are required' });
    } else {
        const chain = Promise.resolve();
        chain
            .then(() => {
                return cryptoHelper.encrypt(body.tokenAuth);
            })
            .then((tokenAuth) => {
                return tokenAuth.find({ tokenAuth, isEnabled: true });
            })
            .then((user) => {
                if (user.length > 0) {
                    return user[0];
                }
                throw {code: 401, message: 'Email or password are incorrect'};
            })
            .then((user) => {
                const token = jwt.createToken(user);
                user.token = token;
                res.code(200).json(user);
            })
            .catch((error) => {
                res.code(500).json(error);
            });
    }
};
