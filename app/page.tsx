"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../Components/Header";

export default function Home() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* HEADER*/}
      <Header />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-image-container">
          <Image
            src="/banner.png"
            alt="Perros y gatos en el parque"
            fill
            className="hero-image"
            priority
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-cont">
          <h1 className="hero-titulo">Un hogar lleno de amor para cada mascota</h1>
          <p className="hero-descripcion">
            Encuentra información, consejos y todo lo que necesitas para cuidar a tu mejor amigo
          </p>
          <div className="hero-botones">
            <a href="#guias" className="hero-boton primary">Explorar guías</a>
            <a href="#adopciones" className="hero-boton secondary">Ver adopciones</a>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="container">
        <section className="section pb-0 pt-10">
          <h1 className="main-title text-5xl">Bienvenido a Wikipets 🐾</h1>
          <p className="subtitle">Todo lo que necesitas saber sobre tus mascotas</p>
          <article className="text-center mx-auto mission-text"> {/* Tailwind*/}
            <p>
              Somos un espacio creado para los amantes de los perros y gatos. Nuestra misión es brindar información clara
              y útil sobre cuidados, adopciones, guías y consejos que ayuden a mejorar la vida de las mascotas y fortalecer
              el vínculo con sus familias. Creemos que cada mascota merece un hogar lleno de amor, respeto y bienestar.
            </p>
            <div className="w-1/4 h-1 mx-auto mt-10 mb-0 bg-yellow-500 rounded-full opacity-50"></div>
          </article>
        </section>

        <section className="section center pt-0">
          <h2 className="main-title mb-2 mt-0 pt-0">Caso de Éxito</h2>
          <p className="subtitle text-xl mb-8">Conoce historias reales de adopciones felices en nuestra comunidad 🐕🐈</p>
          <section id="carrusel-fotos">
            <div className="container">
              {/*Carrusel INSANO */}
              <div className="carousel-window">
                <div className="carousel-track">
                  <div className="carousel-item">
                    <img src="4.jpeg" alt="Perro " />
                  </div>
                  <div className="carousel-item">
                    <img src="2.jpg" alt="Gato jugando con bola de estambre" />
                  </div>
                  <div className="carousel-item">
                    <img src="3.jpg" alt="Veterinario examinando mascota" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Tailwind*/}
        <section className="section center rounded-2xl shadow-lg 
                    bg-gradient-to-r from-yellow-300 to-orange-500">
          <h2 className="text-2xl font-semibold mb-2">🐶 ¡Hay que mejorar el mundo de las mascotas!🐱 </h2>
          <a href="#adopta" className="btn bg-orange-600 text-white shadow-xl hover:bg-orange-700 text-lg py-3 px-6">
            Adopta ahora
          </a>
        </section>
        <section className="section" aria-labelledby="testimonials-title">
          <div className="container">
            <h2 id="testimonials-title" className="main-title mb-10">Historias que Inspiran Confianza</h2>
            <div className="grid">
              <div className="card testimonial-card col-4 col-md-6 col-sm-12">
                <p className="testimonial-text">"Gracias a la guía de razas de Wikipets, encontramos el perro perfecto para nuestra familia. ¡Lleva 6 meses con nosotros y estamos felices!"</p>
                <p className="testimonial-author">- Narali X., Adopción Exitosa 🐾</p>
              </div>
              <div className="card testimonial-card col-4 col-md-6 col-sm-12">
                <p className="testimonial-text">"La información de cuidados y prevención de enfermedades es súper clara. Pude identificar a tiempo un problema menor en mi gato. ¡Recomendado!"</p>
                <p className="testimonial-author">- Fixiu A., Cuidador de Gatos 🐈</p>
              </div>
              <div className="card testimonial-card col-4 col-md-6 col-sm-12">
                <p className="testimonial-text">"El foro es una gran comunidad. Siempre encuentro respuestas rápidas a mis dudas sobre alimentación. Gran recurso para dueños primerizos."</p>
                <p className="testimonial-author">- Alejandro M., Dueña Primeriza 🐶</p>
              </div>
            </div>
          </div>
        </section>
        {/*FAQ´S */}
        <section id="faq" className="section">
          <div className="container">
            <h2 className="main-title">Preguntas Frecuentes 🤔</h2>
            <p className="subtitle">
              Resolvemos las dudas más comunes de nuestra comunidad.
            </p>

            <div className="faq-container">
              <details className="faq-item">
                <summary className="faq-question">
                  ¿Cómo funciona el proceso de adopción en Wikipets?
                </summary>
                <div className="faq-answer">
                  <p>
                    En Wikipets, facilitamos el contacto entre rescatistas, albergues y personas interesadas en adoptar. La sección de "Adopciones" te permite ver los perfiles de las mascotas disponibles. Cada perfil tiene la información de contacto directo del responsable para que puedas iniciar el proceso. Nosotros no gestionamos directamente las adopciones, sino que somos un puente para conectar.
                  </p>
                </div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">
                  ¿La información sobre enfermedades reemplaza a un veterinario?
                </summary>
                <div className="faq-answer">
                  <p>
                    <strong>De ninguna manera.</strong> La información que proporcionamos en la sección de "Enfermedades" es puramente educativa y orientativa. Su objetivo es ayudarte a reconocer posibles síntomas y a entender la importancia de la prevención. Siempre debes consultar a un veterinario profesional para obtener un diagnóstico preciso y un tratamiento adecuado para tu mascota.
                  </p>
                </div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">
                  ¿Puedo publicar una mascota para adopción en el sitio?
                </summary>
                <div className="faq-answer">
                  <p>
                    ¡Sí! Si eres un rescatista independiente o parte de un albergue, puedes crear una cuenta en nuestra plataforma y utilizar el foro o la futura sección de publicaciones para compartir el perfil de las mascotas que buscan un hogar. Te recomendamos incluir fotos de buena calidad y una descripción detallada de su carácter y necesidades.
                  </p>
                </div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">
                  ¿El foro es moderado por profesionales?
                </summary>
                <div className="faq-answer">
                  <p>
                    El foro es una comunidad de amantes de las mascotas donde los usuarios comparten sus experiencias y consejos. Si bien nuestro equipo de moderadores se asegura de mantener un ambiente respetuoso y seguro, las opiniones compartidas provienen de otros dueños de mascotas. Para consejos médicos o de comportamiento complejos, siempre recomendamos buscar la ayuda de un veterinario o etólogo certificado.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-300 py-6 text-center text-sm text-gray-700 bg-gray-50">
        <div className="flex justify-center gap-6 mb-2">
          <a href="/contacto" className="hover:underline">Términos</a>
          <a href="/privacidad" className="hover:underline">Privacidad</a>
        </div>
        <p>© 2025 Wikipets. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
