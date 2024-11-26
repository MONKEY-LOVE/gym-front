import { FaDumbbell } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Hero() {
    return (
        <header className="bg-gradient-to-r from-black to-gray-800 text-white py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <nav className="absolute top-0 left-0 right-0 p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <FaDumbbell className="text-3xl text-yellow-500 mr-2" />
                        <span className="text-xl font-bold">POWERFIT GYM</span>
                    </div>
                    <Link
                        to="/login"
                        className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </nav>
            <div className="container mx-auto text-center relative z-10 px-4">
                <FaDumbbell className="text-7xl mx-auto mb-6 text-yellow-500 animate-bounce" />
                <h1 className="text-6xl font-bold mb-6 tracking-tight">POWERFIT GYM</h1>
                <p className="text-2xl text-gray-300 mb-8">Transforma tu cuerpo, transforma tu vida</p>
                <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105">
                    Comienza ahora
                </button>
            </div>
        </header>
    );
}