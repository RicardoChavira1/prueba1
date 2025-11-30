"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header"; 
import { auth } from "../../../lib/firebase-client"; 
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link"; // Asegúrate de tener este import
// Importamos toggleLike también
import { addPost, listenToPosts, toggleLike, Post } from "../../../lib/firestore-service";

export default function ForoPage() {
  const [posts, setPosts] = useState<Post[]>([]); 
  const [nuevoPost, setNuevoPost] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = listenToPosts((nuevosPosts) => {
        setPosts(nuevosPosts);
    });
    return () => unsubscribe();
  }, []);

  const handlePublicar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoPost.trim() || !user) return;

    setIsSubmitting(true);
    const exito = await addPost(nuevoPost, user);
    if (exito) setNuevoPost("");
    setIsSubmitting(false);
  };

  const handleLikeInteraction = async (post: Post) => {
      if (!user) {
          alert("Debes iniciar sesión para dar like ❤️");
          return;
      }
      await toggleLike(post.id, user.uid, post.likes);
  };

  const formatearFecha = (timestamp: any) => {
      if (!timestamp) return "Enviando...";
      return new Date(timestamp.seconds * 1000).toLocaleDateString("es-ES", {
          hour: '2-digit', minute: '2-digit'
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Foro de la Comunidad 🐾</h1>
          <p className="text-gray-600">Comparte experiencias, dudas y amor por las mascotas.</p>
        </div>

        <section className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-8">
          <form onSubmit={handlePublicar}>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl overflow-hidden">
                {user?.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    "👤"
                )}
              </div>
              <div className="flex-grow">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none bg-gray-50"
                  rows={3}
                  placeholder={user ? `Hola ${user.displayName || 'amigo'}, ¿qué nos cuentas hoy?` : "Inicia sesión para publicar..."}
                  value={nuevoPost}
                  onChange={(e) => setNuevoPost(e.target.value)}
                  disabled={!user || isSubmitting}
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  {!user && <span className="text-xs text-red-500 font-semibold">Debes iniciar sesión para postear</span>}
                  <button 
                    type="submit"
                    className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition duration-150 disabled:opacity-50 ml-auto"
                    disabled={!nuevoPost.trim() || !user || isSubmitting}
                  >
                    {isSubmitting ? "Publicando..." : "Publicar"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>

        <section className="space-y-6">
          {posts.map((post) => {
            const isLiked = user ? post.likes.includes(user.uid) : false;

            return (
                <article key={post.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 uppercase overflow-hidden">
                    {post.autorFoto ? <img src={post.autorFoto} className="w-full h-full object-cover"/> : post.autorNombre.charAt(0)}
                    </div>
                    <div>
                    <h3 className="font-bold text-gray-900">{post.autorNombre}</h3>
                    <span className="text-xs text-gray-500">{formatearFecha(post.fecha)}</span>
                    </div>
                </div>

                <p className="text-gray-800 text-lg mb-4 whitespace-pre-wrap leading-relaxed">
                    {post.contenido}
                </p>

                <div className="flex items-center gap-6 border-t border-gray-100 pt-3 text-gray-500">
                    {/* BOTÓN LIKE */}
                    <button 
                        onClick={() => handleLikeInteraction(post)}
                        className={`flex items-center gap-2 transition-colors group ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                    >
                        <svg 
                            className={`w-5 h-5 group-hover:scale-110 transition-transform ${isLiked ? 'fill-current' : 'fill-none'}`} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span className="text-sm font-medium">{post.likes.length}</span>
                    </button>

                    {/* --- AQUÍ ESTÁ EL CAMBIO: Botón Comentarios ahora es un LINK --- */}
                    <Link 
                        href={`/dashboard/foro/${post.id}`} 
                        className="flex items-center gap-2 hover:text-blue-500 transition-colors group"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        <span className="text-sm font-medium">{post.comentarios} comentarios</span>
                    </Link>
                    {/* ---------------------------------------------------------------- */}
                </div>

                </article>
            );
          })}
          
          {posts.length === 0 && (
              <p className="text-center text-gray-500 mt-10">Aún no hay publicaciones. ¡Sé el primero!</p>
          )}
        </section>

      </main>

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