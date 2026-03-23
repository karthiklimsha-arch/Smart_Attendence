import { db } from "./firebase-config.js"

import {
doc,
getDoc,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"


// VIDEO ELEMENT
const video = document.getElementById("video")

// MEDIAPIPE CANVAS
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


async function startCamera(){

try{

const stream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:false
})

video.srcObject = stream

}catch(error){

console.error("Camera error:",error)

alert("Camera access denied or not available")

}

}

window.addEventListener("DOMContentLoaded",startCamera)


// LOAD FACE MODELS
async function loadModels(){

await faceapi.nets.tinyFaceDetector.loadFromUri("models")

await faceapi.nets.faceLandmark68Net.loadFromUri("models")

await faceapi.nets.faceRecognitionNet.loadFromUri("models")

}


// GET STORED STUDENT FACE
async function getStoredFace(){

const ref = doc(db,"students","student1")

const snap = await getDoc(ref)

if(!snap.exists()){

alert("Student face not registered")
return null

}

return snap.data().face

}


// GET SESSION ID FROM URL
const params = new URLSearchParams(window.location.search)

const sessionID = params.get("session")


// START SYSTEM
async function init(){

await loadModels()

await startCamera()

startFaceMesh()   // <-- MEDIAPIPE STARTED HERE

}

init()






// MARK ATTENDANCE
window.markAttendance = async function(){

if(!sessionID){

alert("Invalid session link")
return

}

navigator.geolocation.getCurrentPosition(async position=>{

const lat = position.coords.latitude
const lon = position.coords.longitude

console.log(lat,lon)

})

// LOAD STORED FACE
const storedFace = await getStoredFace()

if(!storedFace) return

const storedDescriptor = new Float32Array(storedFace)


// DETECT CURRENT FACE
const detection = await faceapi
.detectSingleFace(video,new faceapi.TinyFaceDetectorOptions())
.withFaceLandmarks()
.withFaceDescriptor()


if(!detection){

alert("No face detected")
return

}


// COMPARE FACES
const distance = faceapi.euclideanDistance(
detection.descriptor,
storedDescriptor
)


// THRESHOLD CHECK
if(distance > 0.6){

alert("Face does not match registered student")
return

}


// SAVE ATTENDANCE
await addDoc(collection(db,"attendance"),{

student:"Student1",

subject:localStorage.getItem("subject"),

session:sessionID,

time:new Date().toLocaleTimeString(),

status:"Present",

faceVerified:true

})

alert("Attendance Marked Successfully")

}