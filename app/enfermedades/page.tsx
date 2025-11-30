import Link from 'next/link';
import { ENFERMEDADES_WIKI, Enfermedad } from '@/lib/enfermedades';

export default function EnfermedadesPage() {
    const enfermedadesPerros = ENFERMEDADES_WIKI.filter(e => e.especie === 'Perros');
    const enfermedadesGatos = ENFERMEDADES_WIKI.filter(e => e.especie === 'Gatos');

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Encabezado tipo hero */}
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

            {/* Sección de categorías */}
            <section className="container mx-auto px-6 mb-16">
                <h2 className="text-4xl font-bold text-center text-orange-600 mb-10">
                    Consulta por Especie
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Tarjeta perros */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                        <h3 className="text-3xl font-bold mb-6 text-center text-gray-700">
                            Enfermedades de Perros 🐶
                        </h3>

                        <ul className="space-y-4">
                            {enfermedadesPerros.map((enfermedad: Enfermedad) => (
                                <li
                                    key={enfermedad.id}
                                    className="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100"
                                >
                                    <span className="text-lg font-semibold text-gray-800">
                                        {enfermedad.nombre}
                                    </span>

                                    <Link
                                        href={`/enfermedades/${enfermedad.id}`}
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-full transition"
                                    >
                                        Ver Detalles
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tarjeta gatos */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                        <h3 className="text-3xl font-bold mb-6 text-center text-gray-700">
                            Enfermedades de Gatos 🐱
                        </h3>

                        <ul className="space-y-4">
                            {enfermedadesGatos.map((enfermedad: Enfermedad) => (
                                <li
                                    key={enfermedad.id}
                                    className="flex items-center justify-between bg-green-50 p-4 rounded-lg shadow-sm border border-green-100"
                                >
                                    <span className="text-lg font-semibold text-gray-800">
                                        {enfermedad.nombre}
                                    </span>

                                    <Link
                                        href={`/enfermedades/${enfermedad.id}`}
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-full transition"
                                    >
                                        Ver Detalles
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </section>

            {/* Sección bonita final */}
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

