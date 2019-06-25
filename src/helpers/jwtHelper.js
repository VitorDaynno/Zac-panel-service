const jwt = require('jsonwebtoken');

class JWTHelper {
    createToken(entity) {
        this.entity = entity;
        const jwtToken = jwt.sign(
            this.entity,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN * 60 },
        );
        return jwtToken;
    }

    verifyToken(req, res, next) {
        const authorization = req.headers.authorization;
        const chain = Promise.resolve();
        chain
            .then(() => {
                let token = authorization;
                if (!token || token === '') {
                    const error = { code: 403, message: 'The token does not exist or is empty' };
                    throw error;
                } else {
                    token = token.split(' ');
                    if (!(token.length == 2)) {
                        const error = { code: 403, message: 'The token is badly formatted' };
                        throw error;
                    }
                    return token[1];
                }
            })
            .then((token) => {
                jwt.verify(token, process.env.JWT_SECRET, (error) => {
                    if (error) {
                        throw error;
                    }
                    next();
                });
            })
            .catch((error) => {
                if (error.code || error.code === 403) {
                    res.status(403).json(error);
                }
                if (error.message || error.message === 'invalid token') {
                    res.status(403).json();
                }
            });
    }

    decodedToken(token) {
        this.token = token;
        return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                throw error;
            }
            return decoded;
        });
    }
}

module.exports = JWTHelper;
