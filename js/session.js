import { db } from "./firebase-config.js";
import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.startSession = async function(){

const subject = localStorage.getItem("subject");

const startTime = Date.now();
const expiresAt = startTime + (10 * 60 * 1000); // 10 min

const session = await addDoc(collection(db,"sessions"),{
subject,
startTime,
expiresAt,
teacherId: "teacher1"
});

const link = location.origin + "/student.html?session=" + session.id;

document.getElementById("sessionLink").innerText = link;

}