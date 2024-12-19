import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';  // Asegúrate de importar el Navbar correctamente

export default function Layout({ Sidebar }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex">
            <Sidebar isOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col ml-72">
                <Navbar />  {/* Aquí se renderiza el Navbar */}
                <div className="p-6 overflow-auto flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
