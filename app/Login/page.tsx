"use client";
import { useState } from "react";
import Header from "../../Components/Header"; 
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut 
} from "firebase/auth";
import { auth } from "../../lib/firebase-client";

export default function LogInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<number | null>(null); 
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();

    const createSessionCookie = async (idToken: string) => {
        try {
            const res = await fetch("/api/sessionlogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken, remember: true }),
            });

            if (res.ok) {
                console.log(`✅ Éxito: Cookie creada (Status ${res.status})`);
                setSuccessMessage(`¡Inicio de sesión correcto! (Código ${res.status})`);
                
                // 2. Esperamos 1.5 segundos y redirigimos
                setTimeout(() => {
                    // --- CAMBIO AQUÍ: Redirigir a '/' en lugar de '/dashboard/users' ---
                    router.push('/'); 
                    router.refresh(); 
                }, 1500);
                
            } else {
                await signOut(auth); 
                const data = await res.json();
                setErrorCode(res.status);

                console.error(`❌ Error detectado en API: ${res.status}`);
                console.error(`   Mensaje del servidor: ${data.error}`);

                if (res.status === 400) {
                    setError("Error 400: Petición incorrecta (Falta Token).");
                } else if (res.status === 401) {
                    setError("Error 401: No autorizado (Token inválido).");
                } else {
                    setError(`Error ${res.status}: ${data.error}`);
                }
                setLoading(false);
            }
        } catch (err) {
            console.error("Error de red crítico:", err);
            await signOut(auth);
            setError("Error de conexión con el servidor.");
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setErrorCode(null);
        setSuccessMessage(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken(true);
            await createSessionCookie(idToken);
        } catch (error: any) {
            console.error("Error Firebase:", error.message);
            setError("Correo o contraseña incorrectos.");
            setLoading(false);
            await signOut(auth);
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        setError(null);
        setErrorCode(null);
        setSuccessMessage(null);

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken(true);
            await createSessionCookie(idToken);
        } catch (error: any) {
            console.error("Error Google:", error.message);
            setError("Error al iniciar sesión con Google.");
            setLoading(false);
            await signOut(auth);
        }
    }

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Header />

      <section className="flex-grow flex items-center justify-center py-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <img src="/logo.png" alt="Logo Wikipets" className="mx-auto mb-4 w-24" />
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Iniciar sesión</h1>

          <form className="space-y-4 text-left" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            {successMessage && (
                <div className="p-3 rounded-lg text-sm font-medium bg-green-100 text-green-700 border border-green-200 animate-pulse" role="alert">
                    <p className="flex items-center justify-center gap-2">
                        ✅ {successMessage}
                    </p>
                </div>
            )}

            {error && (
                <div className="p-3 rounded-lg text-sm font-medium bg-red-100 text-red-700 border border-red-200" role="alert">
                    <p className="flex flex-col items-center justify-center gap-1">
                        <span>❌ {error}</span> 
                        {errorCode && (
                            <span className="bg-red-200 px-2 py-0.5 rounded text-xs font-bold mt-1">
                                Código HTTP: {errorCode}
                            </span>
                        )}
                    </p>
                </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-white font-bold py-3 rounded-full hover:bg-yellow-500 transition duration-150 flex items-center justify-center disabled:bg-yellow-200 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : "Entrar"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-xs text-gray-500">o inicia sesión con</span>
              <div className="h-px flex-1 bg-gray-300" />
          </div>

          <button
              type="button"
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-full transition duration-150 inline-flex items-center justify-center gap-2 shadow-sm"
              onClick={loginWithGoogle}
              disabled={loading}
          >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2.2c3.31 0 5.69 1.5 7.15 4.14l-2.6 2.01c-.96-1.53-2.19-2.58-4.55-2.58-3.7 0-6.7 3.01-6.7 6.7s3 6.7 6.7 6.7c2.44 0 4.15-.98 5.54-2.38l2.06 2.06c-1.8 1.76-4.14 2.82-7.6 2.82-5.46 0-9.8-4.34-9.8-9.8s4.34-9.8 9.8-9.8z" fill="#4285F4" /><path d="M21.35 11.1h-9.18v2.98h5.27a4.52 4.52 0 0 1-1.95 2.96 6.06 6.06 0 0 1-3.32.96 6.06 6.06 0 0 1-4.28-1.78 6.26 6.26 0 0 1-1.76-4.4 6.25 6.25 0 0 1 1.76-4.4 6.06 6.06 0 0 1 4.28-1.78c1.46 0 2.78.5 3.82 1.33l2.1-2.1A9.3 9.3 0 0 0 12.17 2 9.1 9.1 0 0 0 5.7 4.7 9.25 9.25 0 0 0 3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" fill="#FBBC05" /><path d="M12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" fill="#EA4335" /><path d="M3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" fill="#34A853" /></svg>
              Continuar con Google
          </button>

          <p className="text-sm text-gray-600 mt-6">
            ¿No tienes cuenta? <Link href="/Singup" className="text-yellow-500 font-semibold hover:underline">Crear una</Link>
          </p>
        </div>
      </section>

      <footer className="w-full border-t border-gray-300 py-6 text-center text-sm text-gray-700 bg-gray-50">
          <div className="flex justify-center gap-6 mb-2">
              <Link href="/contacto" className="hover:underline">Términos</Link>
              <Link href="/privacidad" className="hover:underline">Privacidad</Link>
          </div>
          <p>© 2025 Wikipets. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}