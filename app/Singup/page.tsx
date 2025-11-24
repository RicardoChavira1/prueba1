"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../Components/Header";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { auth } from "../../lib/firebase-client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function SingUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdUser, setCreatedUser] = useState<any>(null);

    useEffect(() => {
        if (error || createdUser) {
            const timer = setTimeout(() => {
                setError(null);
                setCreatedUser(null);
            }, 3000); 
            return () => clearTimeout(timer);
        }
    }, [error, createdUser]);

    const validateForm = () => {
        setError(null);

        if (password !== confirmPassword) {
            setError("Las contraseñas deben coincidir. Por favor, revísalas.");
            return false;
        }

        if (!termsAccepted) {
            setError("Debes aceptar los términos y condiciones para registrarte.");
            return false;
        }

        return true;
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true); 
        setError(null);
        setCreatedUser(null);

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
           if (auth.currentUser) { 
                await updateProfile(auth.currentUser, {
                    displayName: name 
                });
                console.log("Perfil actualizado con nombre:", name);
            }
            console.log("usuario creado", cred.user);
            setCreatedUser(cred.user); 
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTermsAccepted(false);
        } catch (error: any) {
            console.error("error al crear usuario", error);
            if (error.code === 'auth/email-already-in-use') {
                setError("Este correo electrónico ya está registrado.");
            } else if (error.code === 'auth/weak-password') {
                setError("La contraseña es demasiado débil. Debe tener al menos 6 caracteres.");
            } else {
                setError("Hubo un error al crear el usuario. Intenta nuevamente.");
            }
        }
        setLoading(false); 
    }

    const singupWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                console.log("Usuario de google", user)
                console.log("Token de acceso", token)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error :(", errorCode, errorMessage)
                setError("Error al iniciar sesión con Google.");
            });
    }
    return (
        <>
            <Header />
            <section className="flex items-center justify-center min-h-screen bg-yellow-50 py-10">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
                    <img
                        src="/logo.png"
                        alt="Logo Wikipets"
                        className="mx-auto mb-6 w-28"
                    />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Crea tu cuenta en Wikipets
                    </h1>
                    <p className="text-sm text-gray-600 mb-8">
                        Regístrate gratis para acceder a guías, foros y adopciones.
                    </p>

                    <form className="space-y-4 text-left" onSubmit={onSubmit}>

                        {/* Campo Nombre */}
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Nombre Completo</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Tu nombre"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Campo Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Correo Electrónico</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="tucorreo@dominio.com"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Mínimo 8 caracteres"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Campo Confirmar Contraseña */}
                        <div>
                            <label htmlFor="confirm" className="block text-gray-700 font-semibold mb-1">Confirmar Contraseña</label>
                            <input
                                id="confirm"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repite la contraseña"
                                required
                                minLength={8}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Aceptar Términos y Condiciones */}
                        <div className="flex items-center gap-2">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)} // Simplificado
                                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                Acepto los <a href="/terms" className="text-orange-500 hover:underline">términos y condiciones</a>
                            </label>
                        </div>

                        {(error || createdUser) && (
                            <div
                                className={`p-3 rounded-lg text-sm font-medium ${
                                    error
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-green-100 text-green-700'
                                }`}
                                role="alert"
                            >
                                {error ? (
                                    <p>❌ {error}</p>
                                ) : (
                                    <p>✅ ¡Cuenta creada con éxito! Ya puedes iniciar sesión.</p>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading} 
                            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-full hover:bg-orange-600 transition duration-150 shadow-md mt-6
                                       flex items-center justify-center
                                       disabled:bg-orange-300 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    {/* Spinner SVG */}
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registrando...
                                </>
                            ) : (
                                '¡Registrarme!'
                            )}
                        </button>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-300" />
                            <span className="text-xs text-gray-500">o regístrate con</span>
                            <div className="h-px flex-1 bg-gray-300" />
                        </div>

                        <button
                            type="button"
                            className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-full transition duration-150 inline-flex items-center justify-center gap-2 shadow-sm"
                            onClick={singupWithGoogle} // Simplificado
                            disabled={loading} // También se deshabilita si está cargando
                        >
                            {/* Ícono SVG de Google (Minimalista) */}
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                                <path d="M12 2.2c3.31 0 5.69 1.5 7.15 4.14l-2.6 2.01c-.96-1.53-2.19-2.58-4.55-2.58-3.7 0-6.7 3.01-6.7 6.7s3 6.7 6.7 6.7c2.44 0 4.15-.98 5.54-2.38l2.06 2.06c-1.8 1.76-4.14 2.82-7.6 2.82-5.46 0-9.8-4.34-9.8-9.8s4.34-9.8 9.8-9.8z" fill="#4285F4" />
                                <path d="M21.35 11.1h-9.18v2.98h5.27a4.52 4.52 0 0 1-1.95 2.96 6.06 6.06 0 0 1-3.32.96 6.06 6.06 0 0 1-4.28-1.78 6.26 6.26 0 0 1-1.76-4.4 6.25 6.25 0 0 1 1.76-4.4 6.06 6.06 0 0 1 4.28-1.78c1.46 0 2.78.5 3.82 1.33l2.1-2.1A9.3 9.3 0 0 0 12.17 2 9.1 9.1 0 0 0 5.7 4.7 9.25 9.25 0 0 0 3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" fill="#FBBC05" />
                                <path d="M12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" fill="#EA4335" />
                                <path d="M3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" fill="#34A853" />
                            </svg>
                            Continuar con Google
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 mt-6">
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            href="/Login"
                            className="text-orange-500 font-semibold hover:underline"
                        >
                            Iniciar sesión
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
}