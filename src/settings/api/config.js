// Import getEnvVars() from environment.js
import getEnvVars from '../../../environment';
const api = getEnvVars();

const firebaseConfig = {
    apiKey: api.FIREBASE_API_KEY,
    authDomain: api.FIREBASE_AUTH_DOMAIN,
    databaseURL: api.FIREBASE_DATABASE_URL,
    projectId: api.FIREBASE_PROJECT_ID,
    storageBucket: api.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: api.FIREBASE_MESSAGING_SENDER_ID,
  };

export {firebaseConfig};