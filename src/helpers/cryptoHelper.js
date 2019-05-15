const crypto = require('crypto');

class EncryptHelper {
    encrypt(text) {
        const hash = crypto.createHmac('sha256', process.env.CRYPTO_SECRET)
                        .update(text)
                    .digest('hex');
        return hash;
    }
}

module.exports = EncryptHelper;
