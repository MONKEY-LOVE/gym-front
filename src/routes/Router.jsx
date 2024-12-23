import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import NoExisto from '../pages/NoExisto';
import Usuarios from '../pages/Usuarios';
import Login from '../pages/Login';
import Stats from '../pages/Estadisticas';
import Inicio from '../pages/Inicio';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../pages/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Manual from '../pages/manual';
import MenuUsuarios from '../components/Menu/Sidebar';  // Sidebar para usuario
import MenuAdmin from '../components/Sidebar';          // Sidebar para admin
import Talleres from '../pages/Talleres';
import Profile from '../pages/Profile';
import UpdateUsers from '../pages/UpdateUsers';

export default function AppRouter() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Inicio />} />

                    {/* ADMINISTRADOR */}
                    <Route element={<ProtectedRoute allowedRoles={[1]} />}>
                        <Route element={<Layout Sidebar={MenuAdmin} />}>
                            <Route path="/admin/dashboard" element={<Dashboard />} />
                            <Route path="/admin/usuarios" element={<Usuarios />} />
                            <Route path="/admin/manual" element={<Manual />} />
                            <Route path="/admin/estadisticas" element={<Stats />} />
                            <Route path="/admin/profile" element={<Profile />} />
                        </Route>
                    </Route>

                    {/* USUARIO NORMAL */}
                    <Route element={<ProtectedRoute allowedRoles={[2, 3]} />}>
                        <Route element={<Layout Sidebar={MenuUsuarios} />}>
                            <Route path="/user/dashboard" element={<Dashboard />} />
                            <Route path='/user/Talleres' element={<Talleres />} />
                            <Route path='/user/UpdateUsers' element={<UpdateUsers />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NoExisto />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
