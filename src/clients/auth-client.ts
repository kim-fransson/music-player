import axios from 'axios';

export const authClient = axios.create({
    baseURL: process.env.AUTH_HOST,
    timeout: 1000,
});
