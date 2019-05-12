const DateHelper = require('../helpers/datehelper');

const dateHelper = new DateHelper();
const tasks = require('../models/tasks');

tasks.methods(['put', 'delete']);
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

tasks.createTask = (req, res) => {
    const chain = Promise.resolve();
    const { body } = req;
    chain
        .then(() => {
            const entity = {};
            entity.name = body.name;
            return entity;
        })
        .then((entity) => {
            tasks
                .create(entity)
                .then((task) => {
                    res.status(201).json(task);
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

module.exports = tasks;
