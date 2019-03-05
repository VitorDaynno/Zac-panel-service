const tasks = require('../models/tasks');

tasks.methods(['get', 'post', 'put', 'delete']);
tasks.updateOptions({ new: true, runValidators: true });

module.exports = tasks;
