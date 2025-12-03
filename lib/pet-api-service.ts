// Definimos la estructura que nos devuelve la API (Tipado fuerte)
export interface Raza {
    id: number;
    name: string;
    weight: { metric: string };
    height: { metric: string };
    life_span: string;
    temperament?: string;
    origin?: string;
    description?: string; 
    reference_image_id: string;
    image?: { url: string };
}

const DOG_API_URL = "https://api.thedogapi.com/v1";
const CAT_API_URL = "https://api.thecatapi.com/v1";

const DOG_KEY = process.env.NEXT_PUBLIC_DOG_API_KEY;
const CAT_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;

// --- FUNCIÓN GENÉRICA PARA PEDIR DATOS ---
async function fetchFromApi(url: string, apiKey: string | undefined) {
    if (!apiKey) {
        console.error("❌ Error: Falta la API Key en .env.local");
        return [];
    }

    try {
        const res = await fetch(url, {
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            next: { revalidate: 3600 } 
        });

        if (!res.ok) throw new Error(`Error API: ${res.status}`);
        
        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// --- PERROS ---
export const getDogBreeds = async (): Promise<Raza[]> => {
    // CAMBIO: Aumentamos el límite a 100 para traer más razas
    return await fetchFromApi(`${DOG_API_URL}/breeds?limit=100`, DOG_KEY);
};

export const getDogImage = async (imageId: string) => {
    const data = await fetchFromApi(`${DOG_API_URL}/images/${imageId}`, DOG_KEY);
    return data.url;
};

// --- GATOS ---
export const getCatBreeds = async (): Promise<Raza[]> => {
    // CAMBIO: Aumentamos el límite a 100 para traer más razas
    return await fetchFromApi(`${CAT_API_URL}/breeds?limit=1000`, CAT_KEY);
};

export const getCatImage = async (imageId: string) => {
    const data = await fetchFromApi(`${CAT_API_URL}/images/${imageId}`, CAT_KEY);
    return data.url;
};