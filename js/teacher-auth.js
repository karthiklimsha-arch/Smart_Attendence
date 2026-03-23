import { auth } from "./firebase-config.js"

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

window.teacherLogin = function(){

const subject = document.getElementById("subject").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

localStorage.setItem("subject",subject)

alert("Teacher Login Successful")

window.location = "teacher-dashboard.html"

})

.catch(err=>{

alert(err.message)

})

}