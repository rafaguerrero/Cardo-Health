const cors = require('cors');

const WHITELIST_ORIGINS = ['http://localhost:3001', 'http://localhost:3000'];

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (WHITELIST_ORIGINS.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS - ' + origin));
        }
    }
};

module.exports = cors(corsOptions);
