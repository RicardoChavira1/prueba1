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

// --- POSTS ---

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