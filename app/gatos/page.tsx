// app/gatos/page.tsx (Solo se modifica el componente GuiaGatosPage)
"use client";
import { useState } from 'react';
import Header from '@/Components/Header';
import Link from 'next/link';

// Simulación de datos (se mantiene igual)
const PERFILES_GATOS_COMPLETO = [
    { id: 101, nombre: "Siamés", imagen: "/siames.png", actividad: "Alto" },
    { id: 102, nombre: "Maine Coon", imagen: "/mainecoon.png", actividad: "Medio" },
    { id: 103, nombre: "Persa", imagen: "/persa.png", actividad: "Bajo" },
    { id: 104, nombre: "Bengala", imagen: "/bengala.png", actividad: "Alto" },
    { id: 105, nombre: "Sphynx", imagen: "/sphynx.png", actividad: "Medio" },
    { id: 106, nombre: "Ragdoll", imagen: "/ragdoll.png", actividad: "Medio" },
    { id: 107, nombre: "Abisinio", imagen: "/abisinio.png", actividad: "Alto" },
    { id: 108, nombre: "Británico Pelo Corto", imagen: "/bpc.png", actividad: "Bajo" },
    { id: 109, nombre: "Gato Europeo", imagen: "/europeo.png", actividad: "Bajo" },
    { id: 110, nombre: "Scottish Fold", imagen: "/scottish.png", actividad: "Medio" },
];

const NIVELES_ACTIVIDAD = ["Bajo", "Medio", "Alto"];

export default function GuiaGatosPage() {
    const [filtroActividad, setFiltroActividad] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState('');
    const [filtroAbierto, setFiltroAbierto] = useState(false);

    const perfilesFiltrados = PERFILES_GATOS_COMPLETO
        .filter(perfil =>
            filtroActividad === null || perfil.actividad === filtroActividad
        )
        .filter(perfil =>
            perfil.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* --- ENCABEZADO Y FILTROS (se mantiene igual) --- */}
            <section className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="main-title text-4xl mb-4">Guía de Razas de Gatos</h1>

                    <div className="w-full max-w-xl flex items-center relative">
                        <div className="relative">
                            <button
                                onClick={() => setFiltroAbierto(!filtroAbierto)}
                                className="bg-orange-400 p-3 rounded-l-lg font-bold text-white flex items-center hover:bg-orange-500 transition duration-150 relative z-10"
                            >
                                Filtros {filtroActividad ? `(${filtroActividad})` : ''}
                                <span className={`ml-2 transform ${filtroAbierto ? 'rotate-180' : 'rotate-0'} transition-transform`}>↓</span>
                            </button>

                            {filtroAbierto && (
                                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-48 z-20">
                                    <button
                                        onClick={() => { setFiltroActividad(null); setFiltroAbierto(false); }}
                                        className={`block w-full text-left p-2 hover:bg-gray-100 ${filtroActividad === null ? 'bg-yellow-200 font-bold' : ''}`}
                                    >
                                        Mostrar Todos
                                    </button>
                                    {NIVELES_ACTIVIDAD.map(nivel => (
                                        <button
                                            key={nivel}
                                            onClick={() => { setFiltroActividad(nivel); setFiltroAbierto(false); }}
                                            className={`block w-full text-left p-2 hover:bg-gray-100 ${filtroActividad === nivel ? 'bg-yellow-200 font-bold' : ''}`}
                                        >
                                            Nivel de Actividad: {nivel}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            placeholder="Busca por raza o nombre de esta"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="flex-grow p-3 border-t border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                        <div className="bg-yellow-400 p-3 rounded-r-lg">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* --- GRID DE TARJETAS DE PERFILES (Aquí está el cambio) --- */}
                <div className="grid gap-6 grid-cols-5 col-sm-12 col-md-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                    {perfilesFiltrados.map((perfil) => (
                        <Link key={perfil.id} href={`/gatos/${perfil.id}`}>
                            <article className="card bg-yellow-100 p-4 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1" style={{ backgroundColor: '#fff7e0' }}>

                                {/* 🎨 CAMBIO: Mostramos la imagen definida en el perfil */}
                                <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={perfil.imagen}
                                        alt={perfil.nombre}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <p className="font-bold text-gray-800 mb-1">{perfil.nombre}</p>
                                <div className="text-xs text-gray-600">Ver Perfil →</div>
                            </article>
                        </Link>
                    ))}
                    {perfilesFiltrados.length === 0 && (
                        <p className="text-center text-gray-500 mt-10 col-span-full">No se encontraron razas con ese filtro o nombre.</p>
                    )}
                </div>

                {/* --- PAGINACIÓN (se mantiene igual) --- */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <a href="#" className="text-gray-500 p-2">{'<'}</a>
                    <a href="#" className="bg-yellow-400 text-gray-800 font-bold p-2 w-8 h-8 flex items-center justify-center rounded-full">1</a>
                    {/* ... el resto de la paginación */}
                    <a href="#" className="text-gray-500 p-2">{'>'}</a>
                </div>
            </section>

        </main>
    );
}