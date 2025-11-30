"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../lib/firebase-client";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada correctamente.");
            
            setUser(null);
            router.push('/Login'); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const renderAuthLinks = () => {
        if (loading) return <div className="h-10 w-48" />;

        if (user) {
            return (
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-bold text-sm hidden sm:block">
                        Hola, {user.displayName || user.email}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-4 rounded-full font-bold text-base hover:bg-red-600 transition duration-150"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            );
        }

        return (
            <>
                <Link href="/Login" className="text-gray-700 font-bold text-base hover:text-gray-900">Iniciar sesión</Link>
                <Link href="/Singup" className="bg-orange-500 text-white py-2 px-4 rounded-full font-bold text-base hover:bg-orange-600 transition duration-150">Crear cuenta</Link>
            </>
        );
    };

    const renderMobileAuthLinks = () => {
        if (loading) return null;

        if (user) {
            return (
                <>
                    <li className="text-center">
                        <span className="font-bold text-lg text-gray-800">
                            {user.displayName || user.email}
                        </span>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded-full font-bold text-base hover:bg-red-600 transition duration-150 w-full"
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                </>
            );
        }

        return (
            <>
                <li>
                    <Link href="/Login" className="text-gray-700 font-bold text-base hover:text-gray-900">
                        Iniciar sesión
                    </Link>
                </li>
                <li>
                    <Link href="/Singup" className="bg-orange-500 text-white py-2 px-4 rounded-full font-bold text-base hover:bg-orange-600 transition duration-150">
                        Crear cuenta
                    </Link>
                </li>
            </>
        );
    };

    return (
        <header className="site-header relative">
            <nav
                className="p-4 border-b border-yellow-700 flex items-center justify-between"
                style={{ backgroundColor: '#fdb711' }}
            >
                <div className="container mx-auto flex items-center justify-between">
                    <a className="brand flex items-center gap-2" href="/">
                        <Image src="/logo.png" alt="Logo Wikipets" width={200} height={150} />
                    </a>
                    
                    {/* Menú de Escritorio */}
                    <ul className="menu2 hidden md:flex flex-1 justify-center gap-8 md:gap-10">
                        <li><a href="#perros" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Perros</a></li>
                        <li><a href="#gatos" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Gatos</a></li>
                        <li><a href="#enfermedades" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Enfermedades</a></li>
                        
                        {/* --- Enlace al Foro --- */}
                        <li>
                            <Link href="/dashboard/foro" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">
                                Foro
                            </Link>
                        </li>

                        <li><a href="#adopciones" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Adopciones</a></li>
                    </ul>
                    
                    <div className="hidden md:flex items-center gap-3">
                        {renderAuthLinks()}
                    </div>

                    <button
                        className="md:hidden text-gray-800 text-3xl font-extrabold focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
                
                {/* Menú Móvil */}
                <div
                    className={`md:hidden absolute top-full left-0 w-full bg-yellow-100 border-t border-yellow-300 transition-all duration-300 overflow-hidden shadow-md z-40 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <li><a href="#perros" className="font-bold text-lg text-gray-800">Perros</a></li>
                        <li><a href="#gatos" className="font-bold text-lg text-gray-800">Gatos</a></li>
                        <li><a href="#enfermedades" className="font-bold text-lg text-gray-800">Enfermedades</a></li>
                        
                        {/* --- Enlace al Foro (Móvil) --- */}
                        <li>
                            <Link href="/dashboard/foro" className="font-bold text-lg text-gray-800" onClick={() => setMenuOpen(false)}>
                                Foro
                            </Link>
                        </li>

                        <li><a href="#adopciones" className="font-bold text-lg text-gray-800">Adopciones</a></li>
                        
                        <li className="flex flex-col items-center gap-2 mt-2 w-full px-4">
                            {renderMobileAuthLinks()}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}