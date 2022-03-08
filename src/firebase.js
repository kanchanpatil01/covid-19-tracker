import firebasse from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseApp = firebasse.initializeApp({
    apiKey: "AIzaSyC8oUXgQ3duPNgk1m-t0wKMdZSS6I5fV_s",
    authDomain: "covid-19-tracker-35bf6.firebaseapp.com",
    projectId: "covid-19-tracker-35bf6",
    storageBucket: "covid-19-tracker-35bf6.appspot.com",
    messagingSenderId: "1018804919704",
    appId: "1:1018804919704:web:1737c2796514a780765fed",
    measurementId: "G-8RZ49PGF20"
})

const db = firebaseApp.firestore();

export { db };