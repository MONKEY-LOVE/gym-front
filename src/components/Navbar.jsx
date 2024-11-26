import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { HiMenuAlt3, HiOutlineBell, HiOutlineSearch, HiOutlineMail } from 'react-icons/hi';

export default function Navbar({ toggleSidebar }) {
  const { isAuthenticated, user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [localUser, setLocalUser] = useState(user);


  const rolesMap = {
    1: "Admin",
    2: "Cliente",
    3: "Profesor",
  };

  useEffect(() => {
  }, [user]);


  const roleName = rolesMap[user.role_id];

  return (
    <nav className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          <HiMenuAlt3 className="w-6 h-6 text-gray-600" />
        </button>
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-72 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <HiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <HiOutlineMail className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <HiOutlineBell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 bg-primary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                <button className="text-sm text-primary-600 hover:text-primary-700">Marcar Todas Leidas</button>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'AASDASD', time: '2 tiempo', unread: true },
                  { title: 'ASDSAD', time: '1 hora', unread: true },
                  { title: 'ASDASDSADSAD', time: '2 hora', unread: false },
                ].map((notification, index) => (
                  <div
                    key={index}
                    className={`p-3 ${notification.unread ? 'bg-primary-50' : 'hover:bg-gray-50'
                      } rounded-lg transition-colors cursor-pointer`}
                  >
                    <p className={`text-sm ${notification.unread ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 border-l pl-6">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=0EA5E9&color=fff"
            alt="Profile"
            className="w-9 h-9 rounded-lg"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-900">{user.nombre} {user.apellido_pat} {user.apellido_mat}</p>
            <p className="text-xs text-gray-500">{roleName}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}