import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

function formatPrivateKey(key: string | undefined) {
  if (!key) return undefined;

  // Intentamos limpiar comillas y saltos de línea
  const keyBody = key.replace(/^['"]|['"]$/g, '').replace(/\\n/g, '\n');
  
  return keyBody;
}

const privateKey = formatPrivateKey(privateKeyEnv);

// --- DIAGNÓSTICO EN CONSOLA (Mira tu terminal al guardar) ---
if (!privateKey) {
  console.error("❌ [FATAL] La clave privada está vacía.");
} else {
  const headerCorrecto = privateKey.startsWith("-----BEGIN PRIVATE KEY-----");
  const footerCorrecto = privateKey.endsWith("-----END PRIVATE KEY-----");
  const tieneSaltos = privateKey.includes("\n");

  if (headerCorrecto && footerCorrecto && tieneSaltos) {
    console.log("✅ [INFO] La clave privada parece tener el formato correcto.");
  } else {
    console.error("❌ [ERROR DE FORMATO] La clave privada está mal formada:");
    console.error(`   - Empieza bien: ${headerCorrecto ? "SÍ" : "NO"}`);
    console.error(`   - Termina bien: ${footerCorrecto ? "SÍ" : "NO"}`);
    console.error(`   - Tiene saltos de línea reales: ${tieneSaltos ? "SÍ" : "NO (Esto es el problema)"}`);
    // Imprimimos los primeros 50 caracteres para ver si hay basura al inicio
    console.log(`   - Inicio de la clave: "${privateKey.substring(0, 50)}..."`);
  }
}

export const adminApp = getApps().length 
    ? getApps()[0]
    : initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });

export const adminAuth = getAuth(adminApp);