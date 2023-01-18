const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

let USERS = [
    {
        "name": "Rafa",
        "password": "$2b$10$baH2PyN4lxA.NuAvdx0wq.42VYPGvGUtVQ4Xg0uXPheEY1/Ib2jgS"
    }
];

const createToken = (data) => {
    return jwt.sign({ data }, 'secret', { expiresIn: '1h' });
};

module.exports = {
    auth: async ({ name, password }) => {
        const user = USERS.find(u => name === u.name);

        if(!user) return false;

        const comparedPassword = await bcrypt.compare(password, user.password);
        return comparedPassword && createToken(name);
    },

    verifyToken: async token => {
        return jwt.verify(token, 'secret');
    }
};