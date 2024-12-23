// axios.js

import axios from 'axios';

// Instancia de axios para usuarios
const usersInstance = axios.create({
    baseURL: 'http://localhost:3000/api/users',  // URL base para usuarios
    withCredentials: true,
});

// Instancia de axios para planes
const plansInstance = axios.create({
    baseURL: 'http://localhost:3000/api/plans',  // URL base para planes
    withCredentials: true,
});

export { usersInstance, plansInstance };
