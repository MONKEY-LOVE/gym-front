import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { login, errors: loginErrors, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();


    const onSubmit = handleSubmit(async (data) => {
        await login(data);
    })


    useEffect(() => {
        if (isAuthenticated && user) {
            switch (user.role_id) {
                case 1:
                    navigate("/admin/dashboard");
                    break;
                case 2:
                    navigate("/user/dashboard");
                    break;
                default:
                    navigate("/");
                    break;
            }
        }
    }, [isAuthenticated, user, navigate])


    useEffect(() => {
        if (loginErrors && loginErrors.length > 0) {
            toast.error("Credenciales incorrectas");
        }
    }, [loginErrors])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900"> {/* Fondo gris oscuro */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-10 w-full max-w-md">
                <h2 className="text-center text-3xl font-bold text-white mb-8">Inicia Sesión</h2>






                {/* Formulario de inicio de sesión */}
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
                        <input
                            type="email"
                            {...register("correo", { required: "El correo es obligatorio" })}
                            className="mt-2 block w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:ring-2 focus:ring-gray-500 p-3 transition duration-200"
                            placeholder="ejemplo@correo.com"
                            aria-label="Correo electrónico"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña</label>
                        <input
                            type="password"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                            className="mt-2 block w-full rounded-lg border border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:ring-2 focus:ring-gray-500 p-3 transition duration-200"
                            placeholder="Contraseña"
                            aria-label="Contraseña"
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;




