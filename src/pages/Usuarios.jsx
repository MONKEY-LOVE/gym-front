import React, { useState } from 'react';
import { getUsersRequest } from '../api/axios';
import { useEffect } from 'react';


const Usuarios = () => {
    const [formData, setFormData] = useState({
        telefono: "",
        correo: "",
        nombre: "",
        apellido_mat: "",
        apellido_pat: "",
        password: "",
        confirmPassword: "",
        plan: "mensual",
        rut: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]); // Estado para los usuarios filtrados
    const [searchQuery, setSearchQuery] = useState(""); // Estado para la consulta de búsqueda

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await getUsersRequest();
                const { users } = response.data;
                setUsuarios(users); // Guardar los usuarios completos
                setFilteredUsuarios(users); // Mostrar todos los usuarios inicialmente
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filtrar usuarios según la búsqueda (por nombre o correo, por ejemplo)
        const filtered = usuarios.filter(
            (usuario) =>
                usuario.nombre.toLowerCase().includes(query) ||
                usuario.correo.toLowerCase().includes(query) ||
                usuario.rut.includes(query)
        );

        setFilteredUsuarios(filtered);
    };
    useEffect(() => {
        // Filtrar usuarios cuando cambia la lista de usuarios o la búsqueda
        if (searchQuery === "") {
            setFilteredUsuarios(usuarios); // Si no hay búsqueda, mostrar todos
        } else {
            const filtered = usuarios.filter(
                (usuario) =>
                    usuario.nombre.toLowerCase().includes(searchQuery) ||
                    usuario.correo.toLowerCase().includes(searchQuery) ||
                    usuario.rut.includes(searchQuery)
            );
            setFilteredUsuarios(filtered); // Filtrar según la búsqueda
        }
    }, [usuarios, searchQuery]);






    // Validaciones 
    const validaciones = {
        nombre: (value) => {
            if (!value) return "El nombre es requerido";
            if (value.length < 2) return "El nombre debe tener al menos 2 caracteres";
            if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(value)) return "Solo se permiten letras y espacios";
            return "";
        },

        apellido_pat: (value) => {
            if (!value) return "El apellido paterno es requerido";
            if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(value)) return "Solo se permiten letras y espacios";
            return "";
        },

        apellido_mat: (value) => {
            if (!value) return "El apellido materno es requerido";
            if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(value)) return "Solo se permiten letras y espacios";
            return "";
        },

        correo: (value) => {
            if (!value) return "El correo es requerido";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Correo electrónico inválido";
            return "";
        },

        telefono: (value) => {
            if (!value) return "El teléfono es requerido";
            if (!/^9\d{8}$/.test(value)) return "Debe comenzar con 9 y tener 9 dígitos en total";
            return "";
        },

        rut: (value) => {
            if (!value) return "El RUT es requerido";
            if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(value)) return "Formato inválido. Use: 12.345.678-9";
            return "";
        },

        password: (value) => {
            if (!value) return "La contraseña es requerida";
            if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres";
            if (!/\d/.test(value)) return "La contraseña debe contener al menos un número";
            if (!/[a-z]/.test(value)) return "La contraseña debe contener al menos una letra minúscula";
            if (!/[A-Z]/.test(value)) return "La contraseña debe contener al menos una letra mayúscula";
            return "";
        },

        confirmPassword: (value, formData) => {
            if (!value) return "Debe confirmar la contraseña";
            if (value !== formData.password) return "Las contraseñas no coinciden";
            return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validación en tiempo real
        const validacionFn = validaciones[name];
        if (validacionFn) {
            const error = validacionFn(value, formData);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const validarFormulario = () => {
        const newErrors = {};
        Object.keys(validaciones).forEach(field => {
            newErrors[field] = validaciones[field](formData[field], formData);
        });
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validarFormulario()) {
            return;
        }

        setLoading(true);

        const jsonData = {
            telefono: formData.telefono,
            correo: formData.correo,
            nombre: formData.nombre,
            apellido_mat: formData.apellido_mat,
            apellido_pat: formData.apellido_pat,
            password: formData.password,
            rut: formData.rut,
            plan: formData.plan
        };
        //manda los datos a la api
        try {
            const response = await fetch('https://sea-turtle-app-l3p77.ondigitalocean.app/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });

            const data = await response.json();
            //formato json
            if (response.ok) {
                setSuccess('Usuario registrado exitosamente');
                setFormData({
                    telefono: "",
                    correo: "",
                    nombre: "",
                    apellido_mat: "",
                    apellido_pat: "",
                    password: "",
                    confirmPassword: "",
                    plan: 1,
                    rut: ""
                });
            } else {
                setError(data.message || 'Error al registrar usuario');
            }
        } catch (error) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (name, label, type = "text", placeholder = "") => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`mt-2 block w-full rounded-lg border ${errors[name] ? 'border-red-500' : 'border-gray-700'
                    } bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-red-500 p-3 transition duration-200`}
                required
            />
            {errors[name] && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                    {errors[name]}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-white p-6">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-4xl mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-center text-3xl font-bold mb-8">Crear Cuenta</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                            {success}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-6">
                            {renderInput("correo", "Correo Electrónico", "email", "ejemplo@gmail.com")}
                            {renderInput("telefono", "Teléfono", "tel", "912345678")}
                            {renderInput("nombre", "Nombre")}
                            {renderInput("apellido_pat", "Apellido Paterno")}
                            {renderInput("rut", "RUT", "text", "12.345.678-9")}
                        </div>

                        <div className="space-y-6">
                            {renderInput("apellido_mat", "Apellido Materno")}
                            {renderInput("password", "Contraseña", "password", "********")}
                            {renderInput("confirmPassword", "Confirmar Contraseña", "password", "********")}

                            <div>
                                <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
                                    Plan
                                </label>
                                <select
                                    id="plan"
                                    name="plan"
                                    value={formData.plan}
                                    onChange={handleChange}
                                    className="mt-2 block w-full rounded-lg border border-gray-700 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-gray-500 p-3 transition duration-200"
                                    required
                                >
                                    <option value="1">1 MES</option>
                                    <option value="2">3 MESES</option>
                                    <option value="3">6 MESES</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </div>

            <div className="flex min-h-screen flex-col items-center justify-start bg-white p-1">
                {/* Buscar */}
                <div className="mb-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre, correo o RUT"
                        className="w-full max-w-md p-2 border rounded-lg shadow-sm"
                    />
                </div>

                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">Usuarios Registrados</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        RUT
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Correo Electrónico
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Suscripcion
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha Inicio
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha Fin
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsuarios.length > 0 ? (
                                    filteredUsuarios.map((usuario, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {usuario.rut}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {usuario.nombre}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {usuario.correo}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {usuario.suscripcion}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {usuario.fecha_inicio}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {usuario.fecha_expiracion}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-500">
                                            No hay usuarios que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Usuarios;