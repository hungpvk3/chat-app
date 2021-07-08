import firebase from "firebase/app"

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCyD7Dauz56ZutMSM7NEnrLnw_mqATMlHY",
    authDomain: "chat-app-fecaf.firebaseapp.com",
    projectId: "chat-app-fecaf",
    storageBucket: "chat-app-fecaf.appspot.com",
    messagingSenderId: "734090603613",
    appId: "1:734090603613:web:2be2cd56c46ca0782931b4",
    measurementId: "G-QW1021SGS0"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()

auth.useEmulator('http://localhost:9099')

if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080')
}

export { db, auth }
export default firebase