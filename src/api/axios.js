// api.js

import { usersInstance, plansInstance } from './api';  // Importamos las instancias de axios

// Funciones de API para usuarios
export const loginRequest = user => usersInstance.post(`/login`, user);
export const verifyTokenRequest = () => usersInstance.get(`/verify`);
export const getUsersRequest = () => usersInstance.get(`/`);  // Para obtener todos los usuarios
export const getTotalUsersRequest = () => usersInstance.get(`/total`);  // Para obtener el total de usuarios
export const getTalleresRequest = () => usersInstance.get(`/talleres`);  // Para obtener los talleres

export const getUserProfileRequest = () => {
    return usersInstance.get(`/profile`, {
        withCredentials: true,  // Enviar cookies con la solicitud
    });
};


// Funciones de API para planes
export const getPlansRequest = () => plansInstance.get(`/total`);  // Para obtener el total de planes activos
export const getPlanDineroRequest = () => plansInstance.get(`/dinero`);  // Para obtener el total de dinero generado
export const getPlansStatsRequest = () => plansInstance.get(`/stats`);  // Para obtener las estadísticas de los planes