const restful = require('node-restful');

const { mongoose } = restful;

const tokenAuthSchema = new mongoose.Schema({
    tokenAuth: {
        type: String,
        required: true,
    },
    usuId: {
        type: Number,
        required: true,
    },
    expireDate: {
        type: Date,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
    },
});

module.exports = restful.model('Tokens', tokenAuthSchema);
