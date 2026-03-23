import { db } from "./firebase-config.js";
import { checkLocation } from "./geofence.js";
import { loadModels, initFaceMatcher, matchFace } from "./face-recognition.js";

import {
doc,
getDoc,
collection,
addDoc,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const video = document.getElementById("video");

const params = new URLSearchParams(location.search);
const sessionId = params.get("session");

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>video.srcObject = stream);

// INIT
(async ()=>{
await loadModels();
await initFaceMatcher(db);
})();

// MAIN FUNCTION
window.markAttendance = async function(){

const studentId = localStorage.getItem("studentId");

// 🔴 CHECK SESSION VALID
const sessionRef = doc(db,"sessions",sessionId);
const sessionSnap = await getDoc(sessionRef);

const session = sessionSnap.data();

if(Date.now() > session.expiresAt){
alert("Session expired");
return;
}

// 🔴 DUPLICATE CHECK
const q = query(
collection(db,"attendance"),
where("studentId","==",studentId),
where("sessionId","==",sessionId)
);

const existing = await getDocs(q);

if(!existing.empty){
alert("Already marked!");
return;
}

// 🔴 GEO FENCE
const inside = await checkLocation();

if(!inside){
alert("Outside campus");
return;
}

// 🔴 FACE MATCH
const name = await matchFace(video);

if(!name || name === "unknown"){
alert("Face not recognized");
return;
}

// ✅ SAVE
await addDoc(collection(db,"attendance"),{
studentId,
name,
sessionId,
time: new Date().toLocaleString()
});

alert("Attendance marked!");

}