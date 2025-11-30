import Link from 'next/link';
import { ENFERMEDADES_WIKI, Enfermedad } from '@/lib/enfermedades';

export default function EnfermedadesPage() {
    const enfermedadesPerros = ENFERMEDADES_WIKI.filter(e => e.especie === 'Perros');
    const enfermedadesGatos = ENFERMEDADES_WIKI.filter(e => e.especie === 'Gatos');

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Encabezado */}
            <section className="bg-gradient-to-r from-orange-400 to-yellow-400 py-12 shadow-md rounded-b-3xl mb-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
                        Enfermedades Comunes en Mascotas 🐾
                    </h1>
                    <p className="mt-4 text-lg text-white/90">
                        Aprende a identificar síntomas y cuidar mejor a tus peluditos.
                    </p>
                </div>
            </section>

            {/* Sección principal */}
            <section className="container mx-auto px-6 mb-20">
                <h2 className="text-4xl font-bold text-center text-orange-600 mb-12">
                    Consulta por Especie
                </h2>

                <div className="flex flex-col md:flex-row gap-12 justify-between">

                    {/* Columna Perros */}
                    <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
                        <h3 className="text-3xl font-bold mb-8 text-center text-gray-700">
                            Enfermedades de Perros 🐶
                        </h3>

                        <ul className="space-y-5">
                            {enfermedadesPerros.map((enfermedad: Enfermedad) => (
                                <li
                                    key={enfermedad.id}
                                    className="flex items-center justify-between bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition"
                                >
                                    <span className="text-xl font-semibold text-gray-800">
                                        {enfermedad.nombre}
                                    </span>

                                    <Link
                                        href={`/enfermedades/${enfermedad.id}`}
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition"
                                    >
                                        Ver Detalles
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna Gatos */}
                    <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
                        <h3 className="text-3xl font-bold mb-8 text-center text-gray-700">
                            Enfermedades de Gatos 🐱
                        </h3>

                        <ul className="space-y-5">
                            {enfermedadesGatos.map((enfermedad: Enfermedad) => (
                                <li
                                    key={enfermedad.id}
                                    className="flex items-center justify-between bg-green-50 p-5 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition"
                                >
                                    <span className="text-xl font-semibold text-gray-800">
                                        {enfermedad.nombre}
                                    </span>

                                    <Link
                                        href={`/enfermedades/${enfermedad.id}`}
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition"
                                    >
                                        Ver Detalles
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </section>

            {/* Pie elegante */}
            <section className="bg-white py-16 mt-10 shadow-inner">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Cuidar a tus mascotas es cuidarte a ti 💛
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto">
                    Consulta esta información regularmente para prevenir enfermedades
                    y mantener a tus amigos peludos felices y saludables.
                </p>
            </section>

        </main>
    );
}


