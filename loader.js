const server = require('./config/server');
const database = require('./config/database');
const taskRoutes = require('./src/api/routes/task')(server);
