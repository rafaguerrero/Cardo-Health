import { getToken, setToken } from '../token';
import { authAPI } from './index.js';

jest.mock('../token', () => ({
    getToken: jest.fn(),
    setToken: jest.fn()
}));

global.fetch = jest.fn();

describe('Utils Auth API', () => {
    let windowMock;
    let alertMock;

    beforeEach(() => {
        const location = {};
        Object.defineProperty(location, 'href', { value: '/', writable: true });
        Object.defineProperty(location, 'hostname', { value: 'localhost', writable: false });

        alertMock = jest.fn();

        windowMock = jest
            .spyOn(window, 'window', 'get')
            .mockImplementation(() => ({
                alert: alertMock,
                location
            }));
    });

    afterEach(async () => {
        windowMock.mockRestore();
        jest.clearAllMocks();
    });

    describe('Fetch with right parameters', () => {
        it('Fetch correctly', async () => {
            getToken.mockReturnValue('TOKEN');
            fetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({})
            });

            await authAPI('api', { test: true });

            expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'TOKEN'
                },
                referrerPolicy: 'no-referrer',
                body: `{\"test\":true}`
            });
        });

        it('Dont add auth if there no token', async () => {
            getToken.mockReturnValue(null);
            fetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({})
            });

            await authAPI('api', { test: true });

            expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                referrerPolicy: 'no-referrer',
                body: `{\"test\":true}`
            });
        });
    });

    it('Fetch correctly', async () => {
        const data = { data: 1234 };

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(data)
        });
        const res = await authAPI('api', { test: true });

        expect(res).toBe(data);
    });

    it('Logout and send alert with message in case of error', async () => {
        const data = { data: 1234 };

        fetch.mockResolvedValue({
            ok: false,
            json: () => Promise.resolve(data)
        });

        await authAPI('api', { test: true });

        expect(setToken).toHaveBeenCalledWith(null);
        expect(window.alert).toHaveBeenCalledWith('There was an error');
        expect(window.location.href).toEqual('/login');
    });
});
