import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiUsers, HiDocumentText, HiChartBar, HiCog, HiSupport, HiOutlineLogout, } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
    { icon: HiHome, text: 'Inicio', path: '/user/dashboard', allowedRoles: [2] },
    { icon: HiSupport, text: 'Talleres', path: '/user/Talleres', allowedRoles: [2] },
    { icon: HiUsers, text: 'Ver talleres', path: '/user/Talleres', allowedRoles: [3] },
    { icon: HiDocumentText, text: 'Actualizar Peso/Altura', path: '/user/UpdateUsers', allowedRoles: [3] },

];

export default function Sidebar({ isOpen }) {
    const { logout, user } = useAuth(); // Acceso al usuario desde el contexto
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user || !user.role_id) {
        return <div>Cargando...</div>;
    }

    console.log("Role ID del usuario:", user.role_id);
    console.log("Menu Items:", menuItems);

    const filteredMenuItems = menuItems.filter((item) =>
        item.allowedRoles.includes(Number(user.role_id))
    );

    console.log('Filtered Menu Items:', filteredMenuItems);

    return (
        <aside
            className={`${isOpen ? '' : 'hidden'} 
        fixed left-0 top-0 z-40 w-72 h-screen transition-transform duration-300 ease-in-out bg-white border-r`}
        >
            <div className="flex items-center gap-2 h-16 border-b px-6">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg"></div>
                <h1 className="text-xl font-bold bg-gradient-to-br from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    POWERFIT GYM
                </h1>
            </div>
            <div className="px-4 py-6">
                <nav className="space-y-1">
                    {filteredMenuItems.length === 0 ? (
                        <div>No tienes acceso a ningún menú.</div> // Mensaje si no hay elementos para mostrar
                    ) : (
                        filteredMenuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon
                                    className={`w-6 h-6 ${location.pathname === item.path
                                        ? 'text-primary-600'
                                        : 'text-gray-500'
                                        }`}
                                />
                                <span className={location.pathname === item.path ? 'font-semibold' : 'font-medium'}>
                                    {item.text}
                                </span>
                            </Link>
                        ))
                    )}
                </nav>
            </div>
            <div className="absolute bottom-0 w-full p-4">
                <button
                    className="flex items-center gap-4 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={handleLogout}
                >
                    <HiOutlineLogout className="w-6 h-6" />
                    <span className="font-medium">Cerrar Sesion</span>
                </button>
            </div>
        </aside>
    );
}
