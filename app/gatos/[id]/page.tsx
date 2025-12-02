// app/gatos/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/Components/Header';

// Simulación de datos de detalle para Gatos (¡Lista completa con Nivel de Actividad!)
const RAZAS_GATOS_SIMULADAS = [
    {
        id: 101, origen: "Tailandia", nombre: "Siamés", actividad: "Alto",
        caracter: "Muy vocal, sociable y afectuoso. Requiere mucha interacción y puede sentirse solo si se le ignora.",
        cuidados: "Dieta equilibrada y atención constante. Cepillado mínimo. Ojos sensibles.",
        imagen: "/siames.png"
    },
    {
        id: 102, origen: "EE. UU.", nombre: "Maine Coon", actividad: "Medio",
        caracter: "Gigante gentil, juguetón e inteligente. Se le conoce como el 'perro' de los gatos, muy paciente.",
        cuidados: "Necesita un cepillado regular para evitar enredos en su pelaje largo y denso. Es propenso a la cardiomiopatía hipertrófica.",
        imagen: "/mainecoon.png"
    },
    {
        id: 103, origen: "Irán", nombre: "Persa", actividad: "Bajo",
        caracter: "Tranquilo y dulce. Prefiere ambientes relajados y prefiere la compañía de adultos.",
        cuidados: "El cuidado de su pelaje largo es intensivo y diario. Requiere limpieza facial constante debido a su estructura craneal.",
        imagen: "/persa.png"
    },
    {
        id: 104, origen: "EE. UU.", nombre: "Bengala", actividad: "Alto",
        caracter: "Activo, curioso y aventurero. Necesita mucho juego y espacio para trepar. Le gusta el agua.",
        cuidados: "Requiere enriquecimiento ambiental para evitar el aburrimiento y la destrucción. Su pelo corto es de bajo mantenimiento.",
        imagen: "/bengala.png"
    },
    {
        id: 105, origen: "Canadá", nombre: "Sphynx", actividad: "Medio",
        caracter: "Extrovertido y muy afectuoso. Es extremadamente dependiente de la interacción humana.",
        cuidados: "Requiere baños regulares para quitar el aceite de su piel. Es sensible al frío y necesita protección solar en verano.",
        imagen: "/sphynx.png"
    },
    {
        id: 106, origen: "EE. UU.", nombre: "Ragdoll", actividad: "Medio",
        caracter: "Relajado y dócil. Se 'desploma' cuando lo levantas. Es un gato de interior ideal.",
        cuidados: "Su pelaje semilargo no se enreda fácilmente, pero necesita cepillado semanal. Dieta controlada para evitar la obesidad.",
        imagen: "/ragdoll.png"
    },
    {
        id: 107, origen: "Etiopía", nombre: "Abisinio", actividad: "Alto",
        caracter: "Curioso, activo y atlético. Disfruta de la compañía y es muy juguetón.",
        cuidados: "Necesita estimulación constante y espacio para correr y saltar. Su pelo es fácil de mantener.",
        imagen: "/abisinio.png"
    },
    {
        id: 108, origen: "Reino Unido", nombre: "Británico Pelo Corto", actividad: "Bajo",
        caracter: "Tranquilo, paciente y reservado. Es un gato ideal para personas que trabajan fuera de casa.",
        cuidados: "Cepillado ocasional, más frecuente en épocas de muda. Propenso a ganar peso si no se ejercita.",
        imagen: "/bpc.png"
    },
    {
        id: 109, origen: "Europa", nombre: "Gato Europeo", actividad: "Bajo",
        caracter: "Robusto, inteligente y buen cazador. Su personalidad es adaptable y puede ser independiente.",
        cuidados: "Gato de bajo mantenimiento, con necesidad de actividad física para evitar el sedentarismo.",
        imagen: "/europeo.png"
    },
    {
        id: 110, origen: "Escocia", nombre: "Scottish Fold", actividad: "Medio",
        caracter: "Dulce, tranquilo y con una expresión facial única debido a sus orejas plegadas.",
        cuidados: "Sus orejas deben revisarse semanalmente para prevenir infecciones. Requiere cuidado con problemas óseos hereditarios.",
        imagen: "/scottish.png"
    },
];

interface GatoDetailPageProps {
    params: { id: string };
}

export default function GatoDetailPage({ params }: GatoDetailPageProps) {
    const idRaza = parseInt(params.id, 10);
    const raza = RAZAS_GATOS_SIMULADAS.find(r => r.id === idRaza);

    if (!raza) notFound();

    return (
        <>
            <Header />
            <main className="bg-gray-100 min-h-screen py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* ENCABEZADO */}
                    <h1 className="text-center text-5xl font-extrabold text-orange-600 mb-10 drop-shadow-sm">
                        {raza.nombre}
                    </h1>

                    {/* TARJETA PRINCIPAL (Similar a Enfermedades) */}
                    <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
                        {/* Origen */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Origen</h2>
                            <p className="text-lg text-gray-700">{raza.origen}</p>
                        </div>
                        <hr className="my-6 border-gray-300" />

                        {/* Nivel de Actividad/Atención (NUEVO) */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Nivel de Actividad y Atención</h2>
                            <span className={`inline-block py-1 px-3 rounded-full font-bold text-white 
                ${raza.actividad === 'Alto' ? 'bg-red-500' :
                                    raza.actividad === 'Medio' ? 'bg-yellow-500' : 'bg-green-500'}`}
                            >
                                {raza.actividad}
                            </span>
                            <p className="text-lg text-gray-700 leading-relaxed mt-3">
                                {/* Breve descripción del carácter para contextualizar la actividad */}
                                {raza.caracter.split('.')[0]}.
                            </p>
                        </div>
                        <hr className="my-6 border-gray-300" />

                        {/* Carácter */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Detalle del Carácter</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {raza.caracter}
                            </p>
                        </div>
                        <hr className="my-6 border-gray-300" />

                        {/* Cuidados y Necesidades */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Cuidados y Necesidades</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {raza.cuidados}
                            </p>
                        </div>

                        {/* BOTÓN */}
                        <div className="text-center mt-10">
                            <Link
                                href="/gatos"
                                className="inline-block bg-orange-500 hover:bg-orange-600 transition text-white font-
                semibold py-3 px-10 rounded-full shadow-md text-lg"
                            >
                                ← Volver a la Guía de Gatos
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}