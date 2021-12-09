const MoviesRouters = require('./moviesRouters');
const UsersRouters = require('./usersRouters');
const AuthRouter = require('./authRouters')

const setupRoutes = (app) => {
    app.use('/', MoviesRouters);
    app.use('/', UsersRouters);
    app.use('/', AuthRouter);
}

module.exports = setupRoutes;