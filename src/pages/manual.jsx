import React from 'react';
import {
    BookOpenIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    QuestionMarkCircleIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

function Manual() {
    const documentationSections = [
        {
            title: 'Video Tutoriales',
            icon: VideoCameraIcon,
            items: [
                {
                    title: 'Cómo crear un nuevo usuario',
                    description: 'Aprende a crear un nuevo usuario en nuestra plataforma.',
                    videoUrl: 'https://www.youtube.com/watch?v=AxjCSsBaCBs',
                },

            ],
        },
    ];

    const handleDownloadManual = () => {
        // In a real application, this would trigger the actual file download
        console.log('Downloading user manual...');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Manual de Usuario</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explora nuestra documentación para obtener ayuda con la configuración y el uso de nuestra plataforma.
                    </p>

                    {/* Download Manual Button */}
                    <button
                        onClick={handleDownloadManual}
                        className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                        Descargar Manual de Usuario
                    </button>
                </div>

                {/* Documentation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {documentationSections.map((section) => (
                        <div key={section.title} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <section.icon className="h-8 w-8 text-indigo-600 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                            </div>
                            <ul className="space-y-4">
                                {section.items.map((item) => (
                                    <li key={item.title} className="flex flex-col">
                                        <p className="text-gray-900 font-medium">{item.title}</p>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                        <a
                                            href={item.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline mt-1"
                                        >
                                            Ver Tutorial
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Manual;
