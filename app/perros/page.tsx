"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Link from "next/link";
import { getDogBreeds } from "@/lib/pet-api-service";

type PerroUI = {
    id: number | string;
    nombre: string;
    imagen: string;
    actividad: string;
    temperamento?: string;
};

const NIVELES_ACTIVIDAD = ["Bajo", "Medio", "Alto"];
const ITEMS_POR_PAGINA = 12; // Paginación de 12 en 12

export default function GuiaPerrosPage() {
    const [perros, setPerros] = useState<PerroUI[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filtros
    const [filtroActividad, setFiltroActividad] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [filtroAbierto, setFiltroAbierto] = useState(false);

    // Paginación
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        const cargarPerros = async () => {
            try {
                const razasApi = await getDogBreeds();
                const map = razasApi.map((raza, index) => ({
                    id: raza.id,
                    nombre: raza.name,
                    imagen: raza.image?.url || "",
                    actividad: NIVELES_ACTIVIDAD[index % 3], // Simulado para el filtro
                    temperamento: raza.temperament
                }));
                setPerros(map);
            } catch (error) {
                console.error("Error cargando perros:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarPerros();
    }, []);

    // Resetear página al filtrar
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, filtroActividad]);

    // 1. Filtrar
    const filtrados = perros
        .filter(p => !filtroActividad || p.actividad === filtroActividad)
        .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    // 2. Paginar
    const indiceUltimo = paginaActual * ITEMS_POR_PAGINA;
    const indicePrimero = indiceUltimo - ITEMS_POR_PAGINA;
    const perrosVisibles = filtrados.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA);

    // Funciones de cambio de página
    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
            <Header />

            <main className="container mx-auto px-4 py-10 flex-grow w-full max-w-7xl">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 drop-shadow-sm">
                        Guía de Razas de Perros 🐶
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
                        Encuentra información rápida y confiable sobre el mejor amigo del hombre.
                    </p>
                </div>

                {/* Filtros y búsqueda */}
                <div className="flex flex-col items-center gap-4 mb-12 w-full">
                    <div className="relative w-full max-w-xs">
                        <button
                            onClick={() => setFiltroAbierto(!filtroAbierto)}
                            className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-sm flex justify-between items-center"
                        >
                            {filtroActividad ? `Actividad: ${filtroActividad}` : "Filtrar Actividad"}
                            <span className={`transition-transform ${filtroAbierto ? 'rotate-180' : 'rotate-0'}`}>
                                ▼
                            </span>
                        </button>

                        {filtroAbierto && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                <button
                                    onClick={() => {
                                        setFiltroActividad(null);
                                        setFiltroAbierto(false);
                                    }}
                                    className="p-3 w-full text-left hover:bg-orange-50 transition"
                                >
                                    Mostrar Todos
                                </button>
                                {NIVELES_ACTIVIDAD.map(n => (
                                    <button
                                        key={n}
                                        onClick={() => {
                                            setFiltroActividad(n);
                                            setFiltroAbierto(false);
                                        }}
                                        className="p-3 w-full text-left hover:bg-orange-50 transition text-gray-700"
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center w-full max-w-md shadow-sm rounded-lg overflow-hidden bg-white border border-gray-200">
                        <input
                            type="text"
                            placeholder="Buscar raza (ej. Labrador, Pug...)"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="p-3 flex-grow focus:outline-none text-sm"
                        />
                        <div className="p-3 px-4">🔍</div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin h-10 w-10 border-b-4 border-orange-500 rounded-full mx-auto"></div>
                        <p className="text-gray-500 mt-4">Cargando perritos...</p>
                    </div>
                ) : (
                    <>
                        {/* ✅ SOLUCIÓN FLEXBOX WRAP (Igual que Gatos):
                           - flex-wrap: Permite que los elementos bajen si no caben.
                           - justify-center: Centra las tarjetas en la pantalla.
                           - gap-6: Espacio constante entre tarjetas.
                           - w-72: Ancho fijo cómodo para ver bien la foto y el texto.
                        */}
                        <div className="flex flex-wrap justify-center gap-6 w-full pb-10">
                            {perrosVisibles.map((perfil) => (
                                <Link 
                                    key={perfil.id} 
                                    href={`/perros/${perfil.id}`} 
                                    // Definimos el ancho fijo para PC (w-72) y fluido para móvil (w-full)
                                    className="group block w-full sm:w-72 flex-grow-0 flex-shrink-0"
                                >
                                    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col overflow-hidden border border-gray-200 h-full">

                                        <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden relative flex-shrink-0">
                                            {perfil.imagen ? (
                                                <img
                                                    src={perfil.imagen}
                                                    alt={perfil.nombre}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-5xl opacity-30">
                                                    🐕
                                                </div>
                                            )}
                                            <span className="absolute top-2 left-2 text-xs font-semibold bg-white/80 px-2 py-1 rounded-lg backdrop-blur shadow-sm text-orange-600 border border-orange-100">
                                                {perfil.actividad}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-col flex-grow">
                                            <h3 className="text-gray-800 font-semibold text-lg truncate w-full" title={perfil.nombre}>
                                                {perfil.nombre}
                                            </h3>
                                            
                                            {perfil.temperamento && (
                                                <p className="text-gray-400 text-xs uppercase tracking-wide mt-1 truncate w-full" title={perfil.temperamento}>
                                                    {perfil.temperamento.split(',')[0]}
                                                </p>
                                            )}

                                            <div className="mt-auto pt-4">
                                                <span className="text-sm font-medium text-orange-600 group-hover:text-orange-700 transition">
                                                    Ver Perfil →
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {/* CONTROLES DE PAGINACIÓN */}
                        {!loading && filtrados.length > 0 && (
                            <div className="flex justify-center items-center gap-4 mt-4 mb-12">
                                <button 
                                    onClick={paginaAnterior}
                                    disabled={paginaActual === 1}
                                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                                >
                                    ← Anterior
                                </button>
                                
                                <span className="text-gray-600 font-medium">
                                    Página {paginaActual} de {totalPaginas}
                                </span>

                                <button 
                                    onClick={paginaSiguiente}
                                    disabled={paginaActual === totalPaginas}
                                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                                >
                                    Siguiente →
                                </button>
                            </div>
                        )}
                    </>
                )}

                {(!loading && filtrados.length === 0) && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-300 mt-10">
                        <p className="text-gray-500 text-xl mb-4">🐶 No encontramos coincidencias.</p>
                        <button
                            onClick={() => { setBusqueda(''); setFiltroActividad(null); }}
                            className="text-orange-500 font-semibold hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </main>

            <footer className="w-full border-t border-gray-200 py-6 text-center text-sm text-gray-700 bg-white mt-auto">
                <p>© 2025 Wikipets. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}