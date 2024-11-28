import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import NoExisto from '../pages/NoExisto';
import Usuarios from '../pages/Usuarios';
import Login from '../pages/Login';

import Inicio from '../pages/Inicio';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../pages/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppRouter() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer /> {/* Agrega ToastContainer */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Inicio />} />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/usuarios" element={<Usuarios />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NoExisto />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
