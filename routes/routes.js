const MoviesRouters = require('./moviesRouters');
const UsersRouters = require('./usersRouters');

const setupRoutes = (app) => {
    app.use('/', MoviesRouters);
    app.use('/', UsersRouters);
}

module.exports = setupRoutes;