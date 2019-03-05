const restful = require('node-restful');

const { mongoose } = restful;

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    usuId: {
        type: Number,
        required: true,
    },
});

module.exports = restful.model('Tasks', taskSchema);
