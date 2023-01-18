import { authAPI } from '../utils/api';

export const login = async (name, password) => {
    return authAPI('users/login', { user: { name, password } });
};
