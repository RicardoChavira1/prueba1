import Link from 'next/link';
import { ENFERMEDADES_WIKI, Enfermedad } from '@/lib/enfermedades';
import Header from "@/Components/Header";

export default function EnfermedadesPage() {
  const enfermedadesPerros = ENFERMEDADES_WIKI.filter(e => e.especie === 'Perros');
  const enfermedadesGatos = ENFERMEDADES_WIKI.filter(e => e.especie === 'Gatos');

  return (
    <main className="min-h-screen bg-yellow-50">
      <Header />

      {/* ENCABEZADO */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 py-16 shadow-lg rounded-b-[3rem] mb-16">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-xl">
            Enfermedades Comunes en Mascotas 🐾
          </h1>
          <p className="mt-5 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Identifica síntomas, aprende y cuida mejor a tus peluditos.
          </p>
        </div>
      </section>

      {/* SECCIÓN PRINCIPAL */}
      <section className="container mx-auto px-6 mb-24">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-14">
          Consulta por Especie
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* PERROS */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-100">
            <h3 className="text-3xl font-extrabold mb-10 text-center text-blue-700">
              Enfermedades de Perros 🐶
            </h3>

            <ul className="space-y-6">
              {enfermedadesPerros.map((enfermedad: Enfermedad) => (
                <li
                  key={enfermedad.id}
                  className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xl font-bold text-gray-800">
                      {enfermedad.nombre}
                    </span>

                    <Link
                      href={`/enfermedades/${enfermedad.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-7 rounded-full shadow transition"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* GATOS */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-100">
            <h3 className="text-3xl font-extrabold mb-10 text-center text-green-700">
              Enfermedades de Gatos 🐱
            </h3>

            <ul className="space-y-6">
              {enfermedadesGatos.map((enfermedad: Enfermedad) => (
                <li
                  key={enfermedad.id}
                  className="bg-green-50 p-6 rounded-2xl border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xl font-bold text-gray-800">
                      {enfermedad.nombre}
                    </span>

                    <Link
                      href={`/enfermedades/${enfermedad.id}`}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-7 rounded-full shadow transition"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* PIE ELEGANTE */}
      <section className="bg-white py-20 mt-12 shadow-inner rounded-t-3xl border-t border-orange-100">
        <h2 className="text-4xl font-black text-center text-gray-800 mb-5">
          Cuidar a tus mascotas es cuidarte a ti 💛
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
          Consulta esta guía regularmente para prevenir enfermedades y mantener a tus amigos 
          peludos felices, fuertes y saludables.
        </p>
      </section>
       {/* --- FOOTER --- */}
            <footer className="w-full border-t border-gray-200 py-6 text-center text-sm text-gray-700 bg-gray-50">
                <div className="flex justify-center gap-6 mb-2">
                    <Link href="/contacto" className="hover:underline">Términos</Link>
                    <Link href="/privacidad" className="hover:underline">Privacidad</Link>
                    <a 
                        href="https://www.youtube.com/@rosquetobey_1" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline text-red-600 font-semibold"
                    >
                        Redes Sociales
                    </a>
                </div>
                <p>© 2025 Wikipets. Todos los derechos reservados.</p>
            </footer>
    </main>
    
  );
}
