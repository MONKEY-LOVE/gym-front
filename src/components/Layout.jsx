import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex">
            <Sidebar isOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col ml-72">
                <Navbar />
                <div className="p-6 overflow-auto flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
