const { verifyToken } = require('../db/users');

const ROUTES = [
    { method: 'get', secure: false, path : '/', handler: (req, res) => res.send('API ALIVE !') },
    { method: 'post', secure: false, path : '/users/login', handler: require('./users/login') },
    { method: 'post', secure: true, path : '/books/update', handler: require('./books/update') },
    { method: 'post', secure: true, path : '/books/list', handler: require('./books/list') },
    { method: 'post', secure: true, path : '/books/add', handler: require('./books/add') },
    { method: 'post', secure: true, path : '/books/delete', handler: require('./books/delete') },
]

module.exports = {
    init: (app) => {
        ROUTES.forEach(({ method, secure, path, handler }) => {
            if(!secure) {
                app[method](path, handler);
            }
            else {
                app[method](path, (req, res) => {
                    return verifyToken(req.headers.authorization)
                            .then(() => handler(req, res))
                            .catch(() => res.status(500).send({ message : "Session Expired" }))
                });
            }
        });
    }
}