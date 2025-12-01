"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header"; 
import { auth } from "../../../lib/firebase-client"; 
import { onAuthStateChanged, User } from "firebase/auth";
// --- CAMBIO: Importamos Link para la navegación ---
import Link from "next/link";
// --- CAMBIO: Importamos toggleCampanaLike ---
import { addCampana, listenToCampanas, toggleAsistencia, toggleCampanaLike, Campana } from "../../../lib/firestore-service";

export default function AdopcionesPage() {
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = listenToCampanas((nuevasCampanas) => {
        setCampanas(nuevasCampanas);
    });
    return () => unsubscribe();
  }, []);

  const handlePublicar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim() || !user) return;

    setIsSubmitting(true);

    const datos = {
        titulo: nuevoTitulo,
        descripcion: nuevaDescripcion,
        fecha: nuevaFecha,
        hora: nuevaHora,
        direccion: nuevaDireccion
    };

    const exito = await addCampana(datos, user);

    if (exito) {
        setNuevoTitulo("");
        setNuevaDescripcion("");
        setNuevaFecha("");
        setNuevaHora("");
        setNuevaDireccion("");
    } else {
        alert("Error al crear la campaña");
    }
    
    setIsSubmitting(false);
  };

  const handleAsistir = async (campana: Campana) => {
    if (!user) {
        alert("Debes iniciar sesión para confirmar asistencia 🙋‍♂️");
        return;
    }
    await toggleAsistencia(campana.id, user.uid, campana.asistentes);
  };

  // --- NUEVA FUNCIÓN: Manejar el Like ---
  const handleLike = async (campana: Campana) => {
    if (!user) {
        alert("Debes iniciar sesión para dar like ❤️");
        return;
    }
    // Llamamos a la nueva función del servicio
    await toggleCampanaLike(campana.id, user.uid, campana.likes);
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Campañas de Adopción 🏡</h1>
          <p className="text-gray-600">Encuentra eventos, jornadas de adopción y ayuda a encontrar hogares.</p>
        </div>

        {/* --- FORMULARIO DE CREACIÓN --- */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-orange-200 mb-10">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Organizar nueva campaña</h2>
          <form onSubmit={handlePublicar} className="space-y-4">
            
            <input
              type="text"
              placeholder={user ? "Nombre del evento o campaña" : "Inicia sesión para crear una campaña"}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
              value={nuevoTitulo}
              onChange={e => setNuevoTitulo(e.target.value)}
              required
              disabled={!user}
            />

            <div className="flex gap-4">
                <input
                    type="date"
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 text-gray-600"
                    value={nuevaFecha}
                    onChange={e => setNuevaFecha(e.target.value)}
                    required
                    disabled={!user}
                />
                <input
                    type="time"
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 text-gray-600"
                    value={nuevaHora}
                    onChange={e => setNuevaHora(e.target.value)}
                    required
                    disabled={!user}
                />
            </div>

            <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">📍</span>
                <input
                type="text"
                placeholder="Dirección o Ubicación (Ej. Parque Central)"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
                value={nuevaDireccion}
                onChange={e => setNuevaDireccion(e.target.value)}
                required
                disabled={!user}
                />
            </div>

            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none bg-gray-50"
              rows={3}
              placeholder="Describe de qué trata la campaña..."
              value={nuevaDescripcion}
              onChange={e => setNuevaDescripcion(e.target.value)}
              required
              disabled={!user}
            ></textarea>

            <button 
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition shadow-sm disabled:opacity-50"
              disabled={!user || isSubmitting}
            >
              {isSubmitting ? "Publicando..." : "Publicar Campaña"}
            </button>
          </form>
        </section>

        {/* --- LISTA DE CAMPAÑAS --- */}
        <section className="space-y-6">
          {campanas.map((campana) => {
            const asisto = user ? campana.asistentes.includes(user.uid) : false;
            // Calculamos si dio Like
            const isLiked = user ? campana.likes.includes(user.uid) : false;

            return (
            <article key={campana.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              
              <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600 uppercase">
                  {campana.organizador.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Organizado por</p>
                  <h3 className="font-bold text-gray-800">{campana.organizador}</h3>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{campana.titulo}</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full w-fit">
                      <span>📅</span>
                      {/* Usamos fechaEvento y horaEvento que coinciden con el servicio */}
                      <span>{campana.fechaEvento} a las {campana.horaEvento}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full w-fit">
                      <span>📍</span>
                      <span>{campana.direccion}</span>
                  </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                {campana.descripcion}
              </p>

              <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center -space-x-2 overflow-hidden">
                      {campana.asistentes.slice(0, 5).map((uid, idx) => (
                          <div key={idx} className="h-8 w-8 rounded-full ring-2 ring-white bg-blue-400 flex items-center justify-center text-xs text-white font-bold" title="Asistente">
                              👤
                          </div>
                      ))}
                      
                      {campana.asistentes.length > 5 && (
                          <div className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                              +{campana.asistentes.length - 5}
                          </div>
                      )}
                      
                      <span className="ml-4 text-sm text-gray-600 font-medium">
                          {campana.asistentes.length === 0 
                            ? "Sé el primero en asistir" 
                            : `${campana.asistentes.length} personas asistirán`
                          }
                      </span>
                  </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex gap-4">
                    {/* --- BOTÓN LIKE CONECTADO --- */}
                    <button 
                        onClick={() => handleLike(campana)}
                        className={`flex items-center gap-2 transition group ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                    >
                        <svg 
                            className={`w-5 h-5 group-hover:scale-110 transition-transform ${isLiked ? 'fill-current' : 'fill-none'}`} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span className="text-sm font-medium">{campana.likes.length}</span>
                    </button>
                    {/* ---------------------------- */}
                    
                    {/* Botón Comentarios */}
                    <Link href={`/dashboard/adopciones/${campana.id}`} className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition">
                        <span>💬</span> <span className="text-sm">{campana.comentarios}</span>
                    </Link>
                </div>

                <button 
                    onClick={() => handleAsistir(campana)}
                    className={`px-6 py-2 rounded-full font-bold transition shadow-sm flex items-center gap-2 ${
                        asisto 
                        ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200" 
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                >
                    {asisto ? "✅ Asistiré" : "🙋‍♂️ Asistir"}
                </button>
              </div>

            </article>
            );
          })}
          
          {campanas.length === 0 && (
              <p className="text-center text-gray-500 mt-10">No hay campañas activas. ¡Organiza una!</p>
          )}
        </section>

      </main>
    </div>
  );
}