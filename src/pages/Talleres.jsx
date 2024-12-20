import React, { useEffect, useState } from 'react';
import { getTalleresRequest } from '../api/axios';

const Talleres = () => {
    const [talleres, setTalleres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener los talleres desde el backend cuando el componente se monta
    useEffect(() => {
        const fetchTalleres = async () => {
            try {
                const response = await getTalleresRequest();
                setTalleres(response.data.talleres); // Suponiendo que el backend devuelve una lista en `talleres`
            } catch (err) {
                setError('Error al cargar los talleres');
            } finally {
                setLoading(false);
            }
        };

        fetchTalleres();
    }, []);

    if (loading) {
        return <div className="text-center text-xl">Cargando talleres...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Lista de Talleres</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {talleres.map((taller) => (
                    <div
                        key={taller.id}
                        className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">{taller.nombre}</h2>
                        <p className="text-gray-500 mt-1">Profesor: {taller.profesor_nombre} {taller.profesor_apellido_pat} {taller.profesor_apellido_mat}</p>
                        <p className="text-gray-500 mt-2">Cupo disponible: {taller.cupo}</p>
                        <p className="text-gray-500 mt-1">Fecha: {new Date(taller.fecha).toLocaleDateString()}</p>
                        <p className="text-gray-500 mt-1">Hora: {taller.hora}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Talleres;
