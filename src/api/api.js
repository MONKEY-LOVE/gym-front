// axios.js

import axios from 'axios';

// Instancia de axios para usuarios
const usersInstance = axios.create({
    baseURL: 'https://sea-turtle-app-l3p77.ondigitalocean.app/api/users',  // URL base para usuarios
    withCredentials: true,
});

// Instancia de axios para planes
const plansInstance = axios.create({
    baseURL: 'https://sea-turtle-app-l3p77.ondigitalocean.app/api/plans',  // URL base para planes
    withCredentials: true,
});

export { usersInstance, plansInstance };
