"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import { auth } from "../../../../lib/firebase-client"; 
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
// Importamos las nuevas funciones
import { getPostById, listenToComments, addComment, Post, Comment } from "../../../../lib/firestore-service";
import { useParams } from "next/navigation"; // Para leer la URL

export default function PostDetailPage() {
    const params = useParams();
    const postId = params.id as string; // Leemos el ID de la URL

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Detectar Usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
        return () => unsubscribe();
    }, []);

    // 2. Cargar el Post Principal
    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPostById(postId);
            setPost(data);
            setLoading(false);
        };
        if (postId) fetchPost();
    }, [postId]);

    // 3. Escuchar Comentarios en tiempo real
    useEffect(() => {
        if (!postId) return;
        const unsubscribe = listenToComments(postId, (nuevosComentarios) => {
            setComments(nuevosComentarios);
        });
        return () => unsubscribe();
    }, [postId]);

    // 4. Enviar Comentario
    const handleComentar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nuevoComentario.trim() || !user) return;

        await addComment(postId, nuevoComentario, user);
        setNuevoComentario(""); // Limpiar input
    };

    const formatearFecha = (timestamp: any) => {
        if (!timestamp) return "Reciente...";
        return new Date(timestamp.seconds * 1000).toLocaleDateString("es-ES", {
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) return <div className="text-center mt-20">Cargando hilo... 🐾</div>;
    if (!post) return <div className="text-center mt-20">Post no encontrado 😿</div>;

    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
                {/* Botón Volver */}
                <Link href="/dashboard/foro" className="text-orange-600 font-bold mb-4 inline-block hover:underline">
                    ← Volver al Foro
                </Link>

                {/* --- POST ORIGINAL --- */}
                <article className="bg-white p-6 rounded-xl shadow-md border border-orange-200 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xl uppercase overflow-hidden">
                            {post.autorFoto ? <img src={post.autorFoto} className="w-full h-full object-cover"/> : post.autorNombre.charAt(0)}
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-xl">{post.autorNombre}</h2>
                            <span className="text-sm text-gray-500">{formatearFecha(post.fecha)}</span>
                        </div>
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{post.contenido}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-gray-500">
                        <span>❤️ {post.likes.length} likes</span>
                        <span>💬 {comments.length} comentarios</span>
                    </div>
                </article>

                {/* --- LISTA DE COMENTARIOS --- */}
                <h3 className="text-xl font-bold text-gray-700 mb-4">Respuestas</h3>
                
                <div className="space-y-4 mb-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 ml-4 relative">
                            {/* Línea conectora visual */}
                            <div className="absolute -left-4 top-6 w-4 h-0.5 bg-gray-300"></div>
                            
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-sm text-gray-800">{comment.autorNombre}</span>
                                <span className="text-xs text-gray-400">• {formatearFecha(comment.fecha)}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.contenido}</p>
                        </div>
                    ))}
                    {comments.length === 0 && <p className="text-gray-400 italic text-center">Sé el primero en responder...</p>}
                </div>

                {/* --- INPUT PARA COMENTAR --- */}
                <div className="bg-white p-4 rounded-xl shadow-lg border border-orange-100 sticky bottom-4">
                    <form onSubmit={handleComentar} className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
                            placeholder={user ? "Escribe una respuesta..." : "Inicia sesión para responder"}
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            disabled={!user}
                        />
                        <button 
                            type="submit"
                            disabled={!nuevoComentario.trim() || !user}
                            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 disabled:opacity-50 transition"
                        >
                            <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
}