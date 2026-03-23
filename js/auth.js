import {auth} from "./firebase-config.js"

import {

signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

window.login = function(){

const email = document.getElementById("email").value

const password = document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Login successful")

window.location="student.html"

})

.catch(err=>alert(err.message))

}