const cors = require('cors');

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        callback(null, true);
    }
};

module.exports = cors(corsOptions);
