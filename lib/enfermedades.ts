// /lib/enfermedades.ts

export const ENFERMEDADES_WIKI = [
    // --- ENFERMEDADES DE PERROS 🐶 ---
    {
        id: 1,
        nombre: "Parvovirus Canino",
        especie: "Perros",
        sintomas: "Vómitos severos, Diarrea con sangre, Deshidratación, Letargo.",
        tratamiento: "Fluidoterapia intensiva, antibióticos (para infecciones secundarias), medicación antiemética.",
        prevencion: "Vacunación (Puppy, triple o quíntuple) y desinfección ambiental."
    },
    {
        id: 3,
        nombre: "Moquillo (Distemper)",
        especie: "Perros",
        sintomas: "Fiebre, secreción ocular y nasal, tos, neumonía, hiperqueratosis (endurecimiento de almohadillas), tics nerviosos.",
        tratamiento: "No hay cura específica. Terapia de soporte sintomático (fluidos, anticonvulsivos).",
        prevencion: "Vacunación obligatoria (múltiple canina)."
    },
    {
        id: 4,
        nombre: "Tos de las perreras",
        especie: "Perros",
        sintomas: "Tos seca y fuerte, como si tuvieran algo atorado en la garganta, arcadas, secreción nasal.",
        tratamiento: "Antitusivos, antibióticos (si hay infección bacteriana secundaria), reposo.",
        prevencion: "Vacuna intranasal o inyectable (Bordetella bronchiseptica)."
    },
    {
        id: 5,
        nombre: "Leishmaniasis",
        especie: "Perros",
        sintomas: "Pérdida de pelo alrededor de los ojos, úlceras en la piel, crecimiento excesivo de uñas, cojera, problemas renales.",
        tratamiento: "Fármacos específicos (Miltefosina, Alopurinol), control de por vida.",
        prevencion: "Vacunación, uso de pipetas y collares repelentes de flebótomos (mosquito)."
    },
    {
        id: 6,
        nombre: "Rabia",
        especie: "Perros",
        sintomas: "Cambios de comportamiento, agresividad, parálisis progresiva, babeo excesivo, hidrofobia.",
        tratamiento: "Ninguno. La enfermedad es mortal y requiere cuarentena o eutanasia para evitar contagio (zoonosis).",
        prevencion: "Vacunación obligatoria anual."
    },

    // --- ENFERMEDADES DE GATOS 🐱 ---
    {
        id: 2, // Mantenemos el ID original de este ejemplo
        nombre: "Rinotraqueitis Felina (FHV-1)",
        especie: "Gatos",
        sintomas: "Estornudos recurrentes, conjuntivitis severa, secreción nasal y ocular, fiebre, úlceras en la boca.",
        tratamiento: "Cuidados de apoyo, antibióticos para infecciones bacterianas secundarias, antivirales (en casos graves).",
        prevencion: "Vacunación triple felina (FVRCP)."
    },
    {
        id: 7,
        nombre: "Panleucopenia Felina",
        especie: "Gatos",
        sintomas: "Fiebre alta, depresión súbita, vómitos, diarrea, deshidratación grave, baja de glóbulos blancos (leucopenia).",
        tratamiento: "Cuidados intensivos, fluidoterapia, antibióticos, control de vómitos y náuseas.",
        prevencion: "Vacunación triple felina (FVRCP)."
    },
    {
        id: 8,
        nombre: "Inmunodeficiencia Felina (FIV)",
        especie: "Gatos",
        sintomas: "Infecciones recurrentes (gingivitis, estomatitis), fiebre persistente, pérdida de peso, letargo.",
        tratamiento: "Manejo de infecciones secundarias y cuidados de apoyo. No hay cura.",
        prevencion: "Evitar el contacto con gatos infectados (se transmite principalmente por mordeduras)."
    },
    {
        id: 9,
        nombre: "Peritonitis Infecciosa Felina (PIF)",
        especie: "Gatos",
        sintomas: "Fiebre persistente, pérdida de apetito, abdomen distendido (forma húmeda), problemas neurológicos (forma seca).",
        tratamiento: "En la mayoría de los casos, fatal. Nuevos tratamientos antivirales pueden ser efectivos, pero son caros.",
        prevencion: "Mantener buena higiene y evitar el estrés en colonias de gatos."
    },
    {
        id: 10,
        nombre: "Toxoplasmosis",
        especie: "Gatos",
        sintomas: "Generalmente asintomática. En gatitos o inmunosuprimidos: fiebre, letargo, neumonía, ictericia.",
        tratamiento: "Antibióticos específicos (Clindamicina) para tratar los síntomas clínicos.",
        prevencion: "No alimentar con carne cruda y limpiar el arenero diariamente (los humanos pueden contagiarse)."
    }
];

// Opcional: Definir el tipo de dato si usas TypeScript
export type Enfermedad = typeof ENFERMEDADES_WIKI[0];