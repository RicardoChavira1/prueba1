"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import { auth } from "../../../../lib/firebase-client"; 
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useParams } from "next/navigation"; 
// Importamos las funciones ESPECÍFICAS de Campañas
import { 
    getCampanaById, 
    listenToCampanaComments, 
    addCampanaComment, 
    toggleAsistencia,
    Campana, 
    Comment 
} from "../../../../lib/firestore-service";

export default function CampanaDetailPage() {
    const params = useParams();
    const campanaId = params.id as string;

    const [campana, setCampana] = useState<Campana | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
        return () => unsubscribe();
    }, []);

    // 2. Cargar Campaña
    useEffect(() => {
        const fetchCampana = async () => {
            const data = await getCampanaById(campanaId);
            setCampana(data);
            setLoading(false);
        };
        if (campanaId) fetchCampana();
    }, [campanaId]);

    // 3. Escuchar Comentarios de la Campaña
    useEffect(() => {
        if (!campanaId) return;
        const unsubscribe = listenToCampanaComments(campanaId, (nuevosComentarios) => {
            setComments(nuevosComentarios);
        });
        return () => unsubscribe();
    }, [campanaId]);

    // 4. Enviar Comentario
    const handleComentar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nuevoComentario.trim() || !user) return;

        await addCampanaComment(campanaId, nuevoComentario, user);
        setNuevoComentario("");
    };

    // 5. Asistir desde el detalle
    const handleAsistir = async () => {
        if (!user || !campana) return;
        // Nota: Esto actualiza la BD, pero necesitamos actualizar el estado local 'campana' 
        // para ver el cambio instantáneo en el botón, o recargar la página.
        // Como 'getCampanaById' no es un listener en tiempo real, lo haremos manualmente en la UI:
        
        const yaAsiste = campana.asistentes.includes(user.uid);
        let nuevosAsistentes = [...campana.asistentes];

        if (yaAsiste) {
            nuevosAsistentes = nuevosAsistentes.filter(id => id !== user.uid);
        } else {
            nuevosAsistentes.push(user.uid);
        }

        setCampana({ ...campana, asistentes: nuevosAsistentes }); // Actualización optimista
        await toggleAsistencia(campana.id, user.uid, campana.asistentes);
    };

    const formatearFecha = (timestamp: any) => {
        if (!timestamp) return "Reciente...";
        // Si es timestamp de Firebase
        if (timestamp.seconds) {
             return new Date(timestamp.seconds * 1000).toLocaleDateString("es-ES", {
                hour: '2-digit', minute: '2-digit'
            });
        }
        return "Fecha desconocida";
    };

    if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Cargando campaña... 🏡</div>;
    if (!campana) return <div className="text-center mt-20 text-xl font-bold text-red-500">Campaña no encontrada 😿</div>;

    const asisto = user ? campana.asistentes.includes(user.uid) : false;

    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
                <Link href="/dashboard/adopciones" className="text-orange-600 font-bold mb-4 inline-block hover:underline">
                    ← Volver a Campañas
                </Link>

                {/* --- DETALLES DE LA CAMPAÑA --- */}
                <article className="bg-white p-8 rounded-xl shadow-md border border-orange-200 mb-8">
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{campana.titulo}</h1>
                    <p className="text-gray-500 mb-6 uppercase text-xs font-bold tracking-wide">Organizado por {campana.organizador}</p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm font-medium text-gray-700">
                        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                            <span>📅</span>
                            <span>{campana.fechaEvento} a las {campana.horaEvento}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                            <span>📍</span>
                            <span>{campana.direccion}</span>
                        </div>
                    </div>

                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap mb-8 border-b border-gray-100 pb-8">
                        {campana.descripcion}
                    </p>

                    {/* Sección de Asistencia */}
                    <div className="flex items-center justify-between">
                        <div className="text-gray-600">
                            <span className="font-bold text-gray-900 text-lg">{campana.asistentes.length}</span> personas asistirán
                        </div>
                        <button 
                            onClick={handleAsistir}
                            disabled={!user}
                            className={`px-8 py-3 rounded-full font-bold transition shadow-sm flex items-center gap-2 ${
                                asisto 
                                ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200" 
                                : "bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
                            }`}
                        >
                            {asisto ? "✅ Asistiré" : "🙋‍♂️ Asistir al evento"}
                        </button>
                    </div>
                </article>

                {/* --- COMENTARIOS / DUDAS --- */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Preguntas y Comentarios</h3>
                
                <div className="space-y-4 mb-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-gray-900">{comment.autorNombre}</span>
                                <span className="text-xs text-gray-400">• {formatearFecha(comment.fecha)}</span>
                            </div>
                            <p className="text-gray-700">{comment.contenido}</p>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <div className="text-center py-10 bg-white/50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">Nadie ha comentado aún. ¿Tienes alguna duda sobre el evento?</p>
                        </div>
                    )}
                </div>

                {/* Input Comentarios */}
                <div className="bg-white p-4 rounded-xl shadow-lg border border-orange-100 sticky bottom-4">
                    <form onSubmit={handleComentar} className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
                            placeholder={user ? "Escribe tu pregunta..." : "Inicia sesión para preguntar"}
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            disabled={!user}
                        />
                        <button 
                            type="submit"
                            disabled={!nuevoComentario.trim() || !user}
                            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 disabled:opacity-50 transition"
                        >
                            Enviar
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
}