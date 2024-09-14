import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:5000/api';
const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password } );
    return response.data;
    } catch (error) {
        console.error('Failed to login:', error);
    }
};
