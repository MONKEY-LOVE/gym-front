import { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import { useNavigate } from 'react-router-dom';
import { getTotalUsersRequest } from '../api/axios';

export default function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(null); // Estado para almacenar el total de usuarios
    const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando la data
    const [error, setError] = useState(null); // Estado para manejar errores
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                setLoading(true);
                const response = await getTotalUsersRequest();
                setTotalUsers(response.data.total.count); // Extrae el valor de `count`
            } catch (err) {
                console.error("Error al obtener el total de usuarios:", err);
                setError("No se pudo cargar el total de usuarios");
            } finally {
                setLoading(false);
            }
        };

        fetchTotalUsers();
    }, []);

    const stats = [
        { title: 'Usuarios', value: totalUsers || 'Cargando...', percentage: null },
        { title: 'Ganancias', value: '46,590', percentage: 8.2 },
        { title: 'Orders', value: '1,234', percentage: 5.4 },
        { title: 'Products', value: '789', percentage: 15.6 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading && <p>Cargando estadísticas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading &&
                stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))
            }
        </div>
    );
}
