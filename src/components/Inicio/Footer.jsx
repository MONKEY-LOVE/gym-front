import { FaDumbbell, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <FaDumbbell className="text-3xl text-yellow-500 mr-2" />
                            <span className="text-xl font-bold">POWERFIT GYM</span>
                        </div>
                        <p className="text-gray-400">Transforma tu cuerpo, transforma tu vida</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-yellow-500">Inicio</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Clases</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Horarios</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Lunes - Sabado: 6am - 10pm</li>
                            <li>Saturday: 7am - 8pm</li>
                            <li>Sunday: 10am - 2pm</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Siguenos</h3>
                        <div className="flex space-x-4 justify-center md:justify-start">
                            <a href="#" className="text-gray-400 hover:text-yellow-500">
                                <FaInstagram className="text-2xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500">
                                <FaFacebook className="text-2xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500">
                                <FaTwitter className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}