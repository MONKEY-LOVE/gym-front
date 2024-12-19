import React, { useEffect, useState } from 'react';
import { getUserProfileRequest } from '../api/axios';

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfileRequest();
                setUserDetails(response.data.userDetails); // Guardamos los detalles en el estado
            } catch (err) {
                setError('Error al obtener los detalles del usuario');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES'); // Ajustamos el formato a español
    };



    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex justify-center items-center flex-col space-y-8 p-6">
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido {userDetails.nombre}</h1>
            <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg" width={250} />
            <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                <div className="text-gray-700">
                    <p><strong>Nombre:</strong> {userDetails.nombre}</p>
                    <p><strong>Apellidos:</strong> {userDetails.apellido_pat} {userDetails.apellido_mat}</p>
                    <p><strong>Correo:</strong> {userDetails.correo}</p>
                    <p><strong>Suscripción:</strong> {userDetails.suscripcion}</p>
                    <p><strong>Fecha de inicio:</strong> {formatDate(userDetails.fecha_inicio)}</p>
                    <p><strong>Fecha de expiración:</strong> {formatDate(userDetails.fecha_expiracion)}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
