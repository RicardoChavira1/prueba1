// app/enfermedades / [id] / page.tsx

import { ENFERMEDADES_WIKI } from '@/lib/enfermedades';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface EnfermedadDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function EnfermedadDetailPage({ params }: EnfermedadDetailPageProps) {

    const { id } = await params;

    const idEnfermedad = parseInt(id, 10);
    const enfermedad = ENFERMEDADES_WIKI.find(e => e.id === idEnfermedad);

    if (!enfermedad) notFound();

    return (
        <main className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* ENCABEZADO */}
                <h1 className="text-center text-5xl font-extrabold text-orange-600 mb-10 drop-shadow-sm">
                    {enfermedad.nombre}
                </h1>

                {/* TARJETA PRINCIPAL */}
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200">

                    {/* Sección 1 */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Especie afectada</h2>
                        <p className="text-lg text-gray-700">{enfermedad.especie}</p>
                    </div>

                    <hr className="my-6 border-gray-300" />

                    {/* Sección 2 */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Síntomas</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {enfermedad.sintomas}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-300" />

                    {/* Sección 3 */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Tratamiento</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {enfermedad.tratamiento}
                        </p>
                    </div>

                    {/* Sección 4 opcional */}
                    {enfermedad.prevencion && (
                        <>
                            <hr className="my-6 border-gray-300" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Prevención</h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {enfermedad.prevencion}
                                </p>
                            </div>
                        </>
                    )}

                    {/* BOTÓN */}
                    <div className="text-center mt-10">
                        <Link
                            href="/enfermedades"
                            className="inline-block bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-3 px-10 rounded-full shadow-md text-lg"
                        >
                            ⟵ Volver al catálogo
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}







