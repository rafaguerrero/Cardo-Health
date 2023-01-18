import { getToken, setToken } from '../token';

export const authAPI = async (path, data = {}) => {
    const authToken = getToken();

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    };

    if(authToken) options.headers['Authorization'] = authToken;

    return fetch('http://localhost:3001/' + path, options)
                .then(res => {
                    if(res.ok) return res.json();
                    throw new Error('There was an error');
                })
                .catch(e => {
                    console.log("3")
                    setToken(null);
                    window.alert(e.message);
                    window.location.href = '/login';
                });
};