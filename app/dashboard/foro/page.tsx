"use client";
import { useState } from "react";
import Header from "@/Components/Header";
import Link from "next/link";

// Definimos una interfaz temporal para nuestros datos de prueba
type Post = {
  id: number;
  autor: string;
  contenido: string;
  fecha: string;
  likes: number;
  comentarios: number;
};

// Datos de prueba (Hardcoded) para visualizar el diseño antes de usar Firebase
const postsIniciales: Post[] = [
  {
    id: 1,
    autor: "Juan Pérez",
    contenido: "¡Hola a todos! Mi perro Max aprendió a dar la pata hoy. Estoy muy orgulloso 🐶.",
    fecha: "Hace 2 horas",
    likes: 5,
    comentarios: 2,
  },
  {
    id: 2,
    autor: "María Gonzalez",
    contenido: "¿Alguien sabe qué darle a un gato con dolor de estómago? He probado con arroz pero no quiere comer. Ayuda por favor 🙏",
    fecha: "Hace 4 horas",
    likes: 12,
    comentarios: 8,
  },
  {
    id: 3,
    autor: "Carlos Ruiz",
    contenido: "La campaña de adopción de ayer fue un éxito total. Gracias a todos los que asistieron.",
    fecha: "Ayer",
    likes: 45,
    comentarios: 10,
  }
];

export default function ForoPage() {
  const [posts, setPosts] = useState<Post[]>(postsIniciales);
  const [nuevoPost, setNuevoPost] = useState("");

  // Función simulada para agregar un post a la lista visualmente
  const handlePublicar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoPost.trim()) return;

    const postTemporal: Post = {
      id: Date.now(),
      autor: "Usuario Actual", // Esto luego vendrá de Firebase Auth
      contenido: nuevoPost,
      fecha: "Ahora mismo",
      likes: 0,
      comentarios: 0,
    };

    setPosts([postTemporal, ...posts]); // Agregamos al inicio de la lista
    setNuevoPost(""); // Limpiamos el input
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        
        {/* Título de la Sección */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Foro de la Comunidad 🐾</h1>
          <p className="text-gray-600">Comparte experiencias, dudas y amor por las mascotas.</p>
        </div>

        {/* --- ÁREA DE CREAR PUBLICACIÓN (INPUT) --- */}
        <section className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-8">
          <form onSubmit={handlePublicar}>
            <div className="flex gap-4">
              {/* Avatar Simulado */}
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-grow">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none bg-gray-50"
                  rows={3}
                  placeholder="¿Qué está pasando con tu mascota hoy?"
                  value={nuevoPost}
                  onChange={(e) => setNuevoPost(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button 
                    type="submit"
                    className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition duration-150 disabled:opacity-50"
                    disabled={!nuevoPost.trim()}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* --- FEED DE PUBLICACIONES (LISTA) --- */}
        <section className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              
              {/* Cabecera del Post */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {post.autor.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{post.autor}</h3>
                  <span className="text-xs text-gray-500">{post.fecha}</span>
                </div>
              </div>

              {/* Contenido del Post */}
              <p className="text-gray-800 text-lg mb-4 whitespace-pre-wrap leading-relaxed">
                {post.contenido}
              </p>

              {/* Acciones (Likes, Comentarios) */}
              <div className="flex items-center gap-6 border-t border-gray-100 pt-3 text-gray-500">
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <span className="text-sm font-medium">{post.comentarios} comentarios</span>
                </button>
              </div>

            </article>
          ))}
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