const DateHelper = require('../../config/datehelper');

const dateHelper = new DateHelper();
const tasks = require('../models/tasks');

tasks.methods(['post', 'put', 'delete']);
tasks.updateOptions({ new: true, runValidators: true });

tasks.getAll = (req, res) => {
    tasks
        .find()
        .then((tasksEntity) => {
            return tasksEntity.map((task) => {
                const entity = {};
                entity.name = task.name;
                entity.date = dateHelper.parseDate(task.date);
                entity.hour = dateHelper.parseHour(task.date);
                return entity;
            });
        }).then((tasksEntity) => {
            res.status(200).json(tasksEntity);
        });
};

module.exports = tasks;
