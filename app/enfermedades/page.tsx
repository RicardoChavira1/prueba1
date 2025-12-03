import Link from 'next/link';
import { ENFERMEDADES_WIKI, Enfermedad } from '@/lib/enfermedades';
import Header from "../Components/Header";

export default function EnfermedadesPage() {
    const enfermedadesPerros = ENFERMEDADES_WIKI.filter(e => e.especie === 'Perros');
    const enfermedadesGatos = ENFERMEDADES_WIKI.filter(e => e.especie === 'Gatos');

    return (
        <div className="flex flex-col min-h-screen bg-orange-50/50">
            <Header />
            
            {/* --- HERO SECTION --- */}
            <section className="relative bg-gradient-to-br from-orange-500 to-yellow-400 py-16 md:py-24 rounded-b-[3rem] shadow-lg mb-12 overflow-hidden">
                {/* Círculos decorativos de fondo */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-md mb-4 tracking-tight">
                        Salud y Bienestar 🩺
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Guía completa de enfermedades comunes. Aprende a identificar síntomas para cuidar mejor a tus peluditos.
                    </p>
                </div>
            </section>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <main className="container mx-auto px-4 md:px-6 mb-20 max-w-6xl flex-grow">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                    {/* === COLUMNA PERROS === */}
                    <article className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-100 overflow-hidden flex flex-col">
                        <div className="bg-blue-50 p-6 md:p-8 border-b border-blue-100">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 flex items-center justify-center gap-3">
                                <span className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm text-2xl">🐶</span>
                                Perros
                            </h3>
                        </div>

                        <div className="p-6 md:p-8 flex-grow">
                            <ul className="space-y-4">
                                {enfermedadesPerros.map((enfermedad: Enfermedad) => (
                                    <li key={enfermedad.id} className="group">
                                        <Link 
                                            href={`/enfermedades/${enfermedad.id}`}
                                            className="block bg-white border border-gray-100 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300 group-hover:-translate-y-1"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                    <span className="text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                                                        {enfermedad.nombre}
                                                    </span>
                                                </div>
                                                
                                                <span className="bg-blue-50 text-blue-600 text-sm font-bold py-2 px-6 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors text-center w-full sm:w-auto">
                                                    Ver detalles →
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    {/* === COLUMNA GATOS === */}
                    <article className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-100 overflow-hidden flex flex-col">
                        <div className="bg-green-50 p-6 md:p-8 border-b border-green-100">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-green-800 flex items-center justify-center gap-3">
                                <span className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm text-2xl">🐱</span>
                                Gatos
                            </h3>
                        </div>

                        <div className="p-6 md:p-8 flex-grow">
                            <ul className="space-y-4">
                                {enfermedadesGatos.map((enfermedad: Enfermedad) => (
                                    <li key={enfermedad.id} className="group">
                                        <Link 
                                            href={`/enfermedades/${enfermedad.id}`}
                                            className="block bg-white border border-gray-100 rounded-2xl p-4 hover:border-green-300 hover:shadow-md transition-all duration-300 group-hover:-translate-y-1"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                                    <span className="text-lg font-bold text-gray-700 group-hover:text-green-600 transition-colors">
                                                        {enfermedad.nombre}
                                                    </span>
                                                </div>
                                                
                                                <span className="bg-green-50 text-green-600 text-sm font-bold py-2 px-6 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors text-center w-full sm:w-auto">
                                                    Ver detalles →
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                </div>
            </main>

            {/* --- PIE INFORMATIVO --- */}
            <section className="bg-white border-t border-orange-100 py-16">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <div className="mb-6 flex justify-center">
                        <span className="bg-yellow-100 text-yellow-700 text-4xl p-4 rounded-full shadow-sm">💛</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Prevenir es amar
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Esta guía es informativa. Recuerda que ante cualquier síntoma extraño, 
                        <strong className="text-orange-500"> la visita al veterinario es irreemplazable</strong>. 
                        ¡Cuídalos como ellos te cuidan a ti!
                    </p>
                </div>
            </section>

            {/* --- FOOTER GLOBAL --- */}
            <footer className="w-full border-t border-gray-200 py-6 text-center text-sm text-gray-700 bg-gray-50">
                <div className="flex justify-center gap-6 mb-2">
                    {/* Enlace interno */}
                    <Link href="/contacto" className="hover:underline">Términos</Link>
                    <Link href="/privacidad" className="hover:underline">Privacidad</Link>
                    
                    {/* Enlace externo a YouTube */}
                    <a 
                        href="https://www.youtube.com/@rosquetobey_1" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline text-red-600 font-semibold flex items-center gap-1"
                    >
                        <span>📺</span> Redes Sociales
                    </a>
                </div>
                <p>© 2025 Wikipets. Todos los derechos reservados.</p>
            </footer>

        </div>
    );
}