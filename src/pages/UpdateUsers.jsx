import React, { useState, useEffect } from 'react';
import { getUsersRequest } from '../api/axios'; // Asegúrate de tener la ruta correcta

const UpdateUsers = () => {
    const [users, setUsers] = useState([]); // Para almacenar los usuarios
    const [selectedUserId, setSelectedUserId] = useState(null); // ID del usuario seleccionado
    const [newHeight, setNewHeight] = useState('');
    const [newWeight, setNewWeight] = useState('');

    // Obtener la lista de usuarios desde la API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsersRequest(); // Usando axios para obtener usuarios
                if (response.data.ok && Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    setUsers([]);
                    console.error("No se pudo obtener la lista de usuarios");
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Función para manejar la actualización de altura y peso
    const handleUpdate = async () => {
        if (!selectedUserId) return;

        const updatedUser = {
            height: newHeight,
            weight: newWeight
        };

        try {
            const response = await updateUserRequest(selectedUserId, updatedUser); // Usando axios para actualizar el usuario
            if (response.status === 200) {
                alert('User updated successfully!');
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Actualizar Usuario</h1>

            {/* Selección de usuario */}
            <div className="mb-6">
                <label className="text-xl font-semibold">Selecciona un usuario:</label>
                <select
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full max-w-xs"
                >
                    <option value="">Seleccionar usuario</option>
                    {Array.isArray(users) && users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.nombre} {user.apellido_pat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Inputs para actualizar altura y peso */}
            {selectedUserId && (
                <div className="mb-6">
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Altura (en cm):</label>
                        <input
                            type="number"
                            value={newHeight}
                            onChange={(e) => setNewHeight(e.target.value)}
                            placeholder="Nueva altura"
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium">Peso (en kg):</label>
                        <input
                            type="number"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                            placeholder="Nuevo peso"
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    >
                        Actualizar
                    </button>
                </div>
            )}
        </div>
    );
};

export default UpdateUsers;
