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
            console.log("Sesión cerrada.");
            setUser(null);
            router.push('/Login'); 
            router.refresh(); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const renderAuthLinks = () => {
        if (loading) return <div className="h-10 w-20 bg-yellow-200 animate-pulse rounded" />;

        if (user) {
            return (
                <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-gray-700 font-bold text-xs md:text-sm hidden sm:block">
                        Hola, {user.displayName?.split(' ')[0] || "Amigo"}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-full font-bold text-xs md:text-base hover:bg-red-600 transition duration-150 whitespace-nowrap"
                    >
                        Salir
                    </button>
                </div>
            );
        }

        return (
            <div className="flex gap-2">
                <Link href="/Login" className="text-gray-700 font-bold text-sm md:text-base hover:text-gray-900 self-center">Ingresar</Link>
                <Link href="/Singup" className="bg-orange-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-full font-bold text-sm md:text-base hover:bg-orange-600 transition duration-150">Crear</Link>
            </div>
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
                className="p-3 md:p-4 border-b border-yellow-700 flex items-center justify-between"
                style={{ backgroundColor: '#fdb711' }}
            >
                <div className="container mx-auto flex items-center justify-between">
                    
                    <a className="brand flex items-center gap-2" href="/">
                        {/* AQUÍ ESTÁ EL AJUSTE DE TAMAÑO:
                           - Móvil: w-28 (Pequeño, perfecto para cel)
                           - PC: md:w-36 (Mediano, ya no se ve gigante)
                        */}
                        <div className="relative w-28 h-12 md:w-36 md:h-14">
                            <Image 
                                src="/logo.png" 
                                alt="Logo Wikipets" 
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </a>
                    
                    {/* Menú de Escritorio (Uno solo, sin duplicados) */}
                    <ul className="menu2 hidden md:flex flex-1 justify-center gap-6 lg:gap-10">
                        <li><Link href="/perros" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Perros</Link></li>
                        <li><Link href="/gatos" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Gatos</Link></li>
                        <li><Link href="/enfermedades" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Enfermedades</Link></li>
                        <li><Link href="/dashboard/foro" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Foro</Link></li>
                        <li><Link href="/dashboard/adopciones" className="font-extrabold text-lg text-gray-800 hover:text-orange-500 transition duration-150">Adopciones</Link></li>
                    </ul>

                    <div className="hidden md:flex items-center gap-3">
                        {renderAuthLinks()}
                    </div>

                    <button
                        className="md:hidden text-gray-800 text-3xl font-extrabold focus:outline-none ml-auto"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* MENÚ MÓVIL */}
                <div
                    className={`md:hidden absolute top-full left-0 w-full bg-yellow-100 border-t border-yellow-300 transition-all duration-300 overflow-hidden shadow-md z-40 ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <ul className="flex flex-col items-center gap-4 py-6 pb-10">
                        <li><Link href="/perros" className="font-bold text-xl text-gray-800" onClick={() => setMenuOpen(false)}>Perros</Link></li>
                        <li><Link href="/gatos" className="font-bold text-xl text-gray-800" onClick={() => setMenuOpen(false)}>Gatos</Link></li>
                        <li><Link href="/enfermedades" className="font-bold text-xl text-gray-800" onClick={() => setMenuOpen(false)}>Enfermedades</Link></li>
                        <li><Link href="/dashboard/foro" className="font-bold text-xl text-gray-800" onClick={() => setMenuOpen(false)}>Foro</Link></li>
                        <li><Link href="/dashboard/adopciones" className="font-bold text-xl text-gray-800" onClick={() => setMenuOpen(false)}>Adopciones</Link></li>

                        <li className="flex flex-col items-center gap-4 mt-4 w-full px-8 border-t border-yellow-200 pt-4">
                            {renderMobileAuthLinks()}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}