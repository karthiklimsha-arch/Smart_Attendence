import { auth } from "./firebase-config.js";
import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

window.login = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(res=>{
localStorage.setItem("studentId",res.user.uid);
window.location = "student-dashboard.html";
})
.catch(err=>alert(err.message));

}