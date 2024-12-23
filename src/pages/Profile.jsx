import React, { useEffect, useState } from 'react';
import { getUserProfileRequest } from '../api/axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        correo: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfileRequest();
                const user = response.data.userDetails; // Ajusta esto si el API devuelve otra estructura
                setFormData({
                    nombre: user.nombre,
                    apellido_pat: user.apellido_pat,
                    apellido_mat: user.apellido_mat,
                    correo: user.correo,
                });
            } catch (err) {
                setError('Error al obtener los datos del usuario.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí implementa la lógica para guardar los datos actualizados
            console.log('Datos enviados:', formData);
            alert('Perfil actualizado con éxito');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al actualizar el perfil');
        }
    };

    if (loading) {
        return <div className="text-center">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="apellido_pat" className="block text-sm font-medium text-gray-700">
                        Apellido Paterno
                    </label>
                    <input
                        type="text"
                        id="apellido_pat"
                        name="apellido_pat"
                        value={formData.apellido_pat}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="apellido_mat" className="block text-sm font-medium text-gray-700">
                        Apellido Materno
                    </label>
                    <input
                        type="text"
                        id="apellido_mat"
                        name="apellido_mat"
                        value={formData.apellido_mat}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default Profile;
