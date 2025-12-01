import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot, 
    serverTimestamp,
    Timestamp,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    increment 
} from "firebase/firestore";
import { db } from "./firebase-client";

// --- TIPOS ---
export interface Comment {
    id: string;
    autorId: string;
    autorNombre: string;
    autorFoto?: string;
    contenido: string;
    fecha: Timestamp;
}

export interface Post {
    id: string;
    autorId: string;
    autorNombre: string;
    autorFoto?: string;
    contenido: string;
    fecha: Timestamp;
    likes: string[];
    comentarios: number;
}

export interface Campana {
    id: string;
    organizadorId: string;
    organizador: string; 
    titulo: string;
    descripcion: string;
    fechaEvento: string; 
    horaEvento: string;
    direccion: string;
    asistentes: string[]; 
    likes: string[];
    comentarios: number;
    fechaCreacion: Timestamp;
}

// ==========================================
//                 FORO (POSTS)
// ==========================================

export const addPost = async (texto: string, user: any) => {
    try {
        await addDoc(collection(db, "posts"), {
            autorId: user.uid,
            autorNombre: user.displayName || user.email.split('@')[0],
            autorFoto: user.photoURL || null,
            contenido: texto,
            fecha: serverTimestamp(),
            likes: [],
            comentarios: 0,
        });
        return true;
    } catch (e) {
        console.error("Error al crear post: ", e);
        return false;
    }
};

export const listenToPosts = (callback: (posts: Post[]) => void) => {
    const q = query(collection(db, "posts"), orderBy("fecha", "desc"));
    return onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            likes: Array.isArray(doc.data().likes) ? doc.data().likes : [] 
        })) as Post[];
        callback(posts);
    });
};

export const toggleLike = async (postId: string, userId: string, currentLikes: string[]) => {
    const docRef = doc(db, "posts", postId);
    try {
        if (currentLikes.includes(userId)) {
            await updateDoc(docRef, { likes: arrayRemove(userId) });
        } else {
            await updateDoc(docRef, { likes: arrayUnion(userId) });
        }
    } catch (error) {
        console.error("Error like:", error);
    }
};

// --- NUEVO: FUNCIONES PARA DETALLES Y COMENTARIOS ---

// 1. Obtener un solo post (para la página de detalle)
export const getPostById = async (postId: string) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Post;
    }
    return null;
};

// 2. Escuchar comentarios de un post específico
export const listenToComments = (postId: string, callback: (comments: Comment[]) => void) => {
    // Apuntamos a la SUB-COLECCIÓN "comentarios" dentro del post
    const q = query(
        collection(db, "posts", postId, "comentarios"), 
        orderBy("fecha", "asc") // Los comentarios viejos arriba, nuevos abajo
    );
    
    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as Comment[];
        callback(comments);
    });
};

// 3. Agregar Comentario
export const addComment = async (postId: string, texto: string, user: any) => {
    try {
        // A. Guardamos el comentario en la subcolección
        await addDoc(collection(db, "posts", postId, "comentarios"), {
            autorId: user.uid,
            autorNombre: user.displayName || user.email.split('@')[0],
            autorFoto: user.photoURL || null,
            contenido: texto,
            fecha: serverTimestamp(),
        });

        // B. Aumentamos el contador en el post principal (Atomicity)
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            comentarios: increment(1) // Función mágica de Firebase para sumar 1
        });

        return true;
    } catch (e) {
        console.error("Error al comentar: ", e);
        return false;
    }
};
// ==========================================
//           CAMPAÑAS DE ADOPCIÓN (NUEVO)
// ==========================================

// 1. Crear Campaña
export const addCampana = async (datos: any, user: any) => {
    try {
        await addDoc(collection(db, "campanas"), {
            organizadorId: user.uid,
            organizador: user.displayName || user.email.split('@')[0],
            titulo: datos.titulo,
            descripcion: datos.descripcion,
            fechaEvento: datos.fecha,
            horaEvento: datos.hora,
            direccion: datos.direccion,
            asistentes: [],
            likes: [],
            comentarios: 0,
            fechaCreacion: serverTimestamp(),
        });
        return true;
    } catch (e) {
        console.error("Error al crear campaña: ", e);
        return false;
    }
};

// 2. Escuchar Campañas
export const listenToCampanas = (callback: (campanas: Campana[]) => void) => {
    const q = query(collection(db, "campanas"), orderBy("fechaCreacion", "desc"));
    return onSnapshot(q, (snapshot) => {
        const campanas = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            asistentes: doc.data().asistentes || [], // Asegurar array
            likes: doc.data().likes || []
        })) as Campana[];
        callback(campanas);
    });
};

// 3. Confirmar/Cancelar Asistencia
export const toggleAsistencia = async (campanaId: string, userId: string, currentAsistentes: string[]) => {
    const docRef = doc(db, "campanas", campanaId);
    try {
        if (currentAsistentes.includes(userId)) {
            // Ya asiste -> Quitamos (Cancelar asistencia)
            await updateDoc(docRef, { asistentes: arrayRemove(userId) });
        } else {
            // No asiste -> Agregamos (Confirmar asistencia)
            await updateDoc(docRef, { asistentes: arrayUnion(userId) });
        }
    } catch (error) {
        console.error("Error asistencia:", error);
    }
};
export const getCampanaById = async (campanaId: string) => {
    const docRef = doc(db, "campanas", campanaId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Campana;
    }
    return null;
};

export const addCampanaComment = async (campanaId: string, texto: string, user: any) => {
    try {
        // Guardamos en la subcolección de LA CAMPAÑA
        await addDoc(collection(db, "campanas", campanaId, "comentarios"), {
            autorId: user.uid,
            autorNombre: user.displayName || user.email.split('@')[0],
            autorFoto: user.photoURL || null,
            contenido: texto,
            fecha: serverTimestamp(),
        });
        // Incrementamos contador
        const docRef = doc(db, "campanas", campanaId);
        await updateDoc(docRef, { comentarios: increment(1) });
        return true;
    } catch (e) {
        console.error("Error al comentar campaña: ", e);
        return false;
    }
};

export const listenToCampanaComments = (campanaId: string, callback: (comments: Comment[]) => void) => {
    const q = query(collection(db, "campanas", campanaId, "comentarios"), orderBy("fecha", "asc"));
    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Comment[];
        callback(comments);
    });
};
export const toggleCampanaLike = async (campanaId: string, userId: string, currentLikes: string[]) => {
    const docRef = doc(db, "campanas", campanaId);
    try {
        if (currentLikes.includes(userId)) {
            await updateDoc(docRef, { likes: arrayRemove(userId) });
        } else {
            await updateDoc(docRef, { likes: arrayUnion(userId) });
        }
    } catch (error) {
        console.error("Error like campaña:", error);
    }
};