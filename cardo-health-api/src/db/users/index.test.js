jest.mock('bcrypt', () => ({ compare: jest.fn() }));
const bcrypt = require('bcrypt');

jest.mock('jsonwebtoken', () => ({ sign: jest.fn() }));
const jwt = require('jsonwebtoken');

const Users = require('./index.js');

describe('DB USERS', () => {
    afterEach(async () => jest.clearAllMocks());

    describe('Auth', () => {
        it('Returns false in case the user doesnt exist', async () => {
            const auth = await Users.auth({
                name: 'Fake User',
                password: 'Fake Password'
            });

            expect(auth).toBe(false);
            expect(bcrypt.compare).not.toHaveBeenCalled();
        });

        it('Returns false if password dont match', async () => {
            bcrypt.compare.mockImplementation(() => Promise.resolve(false));

            const auth = await Users.auth({
                name: 'Rafa',
                password: 'Fake Password'
            });

            expect(auth).toBe(false);
            expect(bcrypt.compare).toHaveBeenCalledWith(
                'Fake Password',
                '$2b$10$baH2PyN4lxA.NuAvdx0wq.42VYPGvGUtVQ4Xg0uXPheEY1/Ib2jgS'
            );
        });

        it('Returns token for an 1h', async () => {
            jwt.sign.mockImplementation(() => Promise.resolve('TOKEN'));
            bcrypt.compare.mockImplementation(() => Promise.resolve(true));

            const auth = await Users.auth({
                name: 'Rafa',
                password: 'Real Password'
            });

            expect(auth).toBe('TOKEN');
            expect(jwt.sign).toHaveBeenCalledWith({ data: 'Rafa' }, 'secret', {
                expiresIn: '1h'
            });
        });
    });
});
