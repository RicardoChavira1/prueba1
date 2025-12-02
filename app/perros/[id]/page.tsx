// app/perros/[id]/page.tsx (Solo se modifica el array de datos)
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/Components/Header';

// Simulación de datos de detalle para Perros (¡Lista completa con TAMAÑO!)
const RAZAS_PERROS_SIMULADAS = [
    {
        id: 1, nombre: "Chihuahua", grupo: "Juguete", tamaño: "Pequeño",
        caracter: "Valiente, Leal, enérgico. Se adapta a espacios pequeños. Es el perro más pequeño del mundo.",
        cuidados: "Necesita abrigarse en climas fríos. Cepillado ocasional. Son propensos a problemas dentales.",
        imagen: "/chihuahua.png"
    },
    {
        id: 2, nombre: "Pastor Alemán", grupo: "Pastoreo", tamaño: "Grande",
        caracter: "Inteligente, obediente y protector. Excelente perro de trabajo y familia. Requieren mucha estimulación mental.",
        cuidados: "Requiere ejercicio diario intenso y cepillado frecuente por su doble capa de pelo. Cuidado con la displasia de cadera.",
        imagen: "/pastoraleman.png"
    },
    {
        id: 3, nombre: "Golden Retriever", grupo: "Deportivos", tamaño: "Grande",
        caracter: "Amable, confiable y muy adaptable. Perro de familia ideal, excelente con niños.",
        cuidados: "Necesita mucho ejercicio y atención para evitar la ansiedad. Cepillado regular para mantener su pelaje brillante.",
        imagen: "/golden.png"
    },
    {
        id: 4, nombre: "Labrador", grupo: "Deportivos", tamaño: "Mediano", // Clasificado como mediano/grande, lo pondremos en Mediano.
        caracter: "Activo, extrovertido y juguetón. Uno de los perros más populares del mundo.",
        cuidados: "Propenso a la obesidad, necesita controlar su dieta. Mucho ejercicio y juegos acuáticos.",
        imagen: "/labrador.png"
    },
    {
        id: 5, nombre: "Pug", grupo: "Juguete", tamaño: "Pequeño",
        caracter: "Encantador, travieso y tranquilo. Tienen una personalidad cómica.",
        cuidados: "Requieren limpieza de pliegues faciales y son sensibles al calor. Caminatas cortas y suaves.",
        imagen: "/pug.png"
    },
    {
        id: 6, nombre: "Bulldog Francés", grupo: "No Deportivos", tamaño: "Pequeño",
        caracter: "Juguetón, alerta y adaptable. Se llevan bien con otros animales y personas.",
        cuidados: "Cuidado con problemas respiratorios por su hocico chato. No toleran bien el calor.",
        imagen: "/bulldog.png"
    },
    {
        id: 7, nombre: "Beagle", grupo: "Cacería", tamaño: "Mediano",
        caracter: "Alegre, curioso y amigable. Tienen un fuerte instinto de olfato y pueden ser tercos.",
        cuidados: "Necesita supervisión al aire libre por su tendencia a seguir rastros. Ejercicio moderado y constante.",
        imagen: "/beagle.png"
    },
    {
        id: 8, nombre: "Border Collie", grupo: "Pastoreo", tamaño: "Mediano",
        caracter: "Extremadamente inteligente, atlético y trabajador. Requiere actividad física y mental constante.",
        cuidados: "Necesita tareas y ejercicios de agilidad para canalizar su energía. Cepillado semanal.",
        imagen: "/bordercollie.png"
    },
    {
        id: 9, nombre: "Yorkshire Terrier", grupo: "Juguete", tamaño: "Pequeño",
        caracter: "Vibrante, audaz y posesivo. A pesar de su tamaño, son guardianes ruidosos.",
        cuidados: "Su pelaje requiere cepillado diario para evitar enredos. Propenso a problemas de rodilla.",
        imagen: "/yorkshire.png"
    },
    {
        id: 10, nombre: "Doberman", grupo: "Trabajo", tamaño: "Grande",
        caracter: "Elegante, leal y temido. Son protectores por naturaleza y muy apegados a su familia.",
        cuidados: "Requiere entrenamiento firme y socialización temprana. Es sensible al frío por su pelo corto.",
        imagen: "/doberman.png"
    },
];
// ... (El resto del componente sigue igual)

interface PerroDetailPageProps {
    params: { id: string };
}

export default function PerroDetailPage({ params }: PerroDetailPageProps) {
    const idRaza = parseInt(params.id, 10);
    const raza = RAZAS_PERROS_SIMULADAS.find(r => r.id === idRaza);

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
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Grupo y Origen</h2>
                            <p className="text-lg text-gray-700">{raza.grupo}</p>
                        </div>
                        <hr className="my-6 border-gray-300" />

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Carácter</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {raza.caracter}
                            </p>
                        </div>
                        <hr className="my-6 border-gray-300" />

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Cuidados y Necesidades</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {raza.cuidados}
                            </p>
                        </div>

                        {/* BOTÓN */}
                        <div className="text-center mt-10">
                            <Link
                                href="/perros"
                                className="inline-block bg-orange-500 hover:bg-orange-600 transition text-white font-
                semibold py-3 px-10 rounded-full shadow-md text-lg"
                            >
                                ← Volver a la Guía de Perros
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}