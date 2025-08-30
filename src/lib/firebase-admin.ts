import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Este objeto contém as credenciais para o seu projeto.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

// Inicializa o app do Firebase Admin apenas uma vez.
if (!getApps().length) {
  initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : undefined,
  });
}

// Exporta a instância do banco de dados para ser usada em outras partes do servidor.
const adminDb = getFirestore();

export { adminDb };


