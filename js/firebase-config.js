import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"

import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"

const firebaseConfig = {

apiKey: "AIzaSyCMhuIR2biW0wxPLTgY8RzGgW9NyYgnLIk",
authDomain: "geo-attendence-1702e.firebaseapp.com",
projectId: "geo-attendence-1702e",
storageBucket: "geo-attendence-1702e.firebasestorage.app",
messagingSenderId: "295550893731",
appId: "1:295550893731:web:f4b5cd5cd10ac8f923c916"

}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)