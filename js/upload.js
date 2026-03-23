import { db } from "./firebase-config.js"

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"

const imageUpload = document.getElementById("imageUpload")
const preview = document.getElementById("preview")

imageUpload.addEventListener("change", ()=>{

const file = imageUpload.files[0]
preview.src = URL.createObjectURL(file)

})

async function loadModels(){

await faceapi.nets.tinyFaceDetector.loadFromUri("./models")
await faceapi.nets.faceLandmark68Net.loadFromUri("./models")
await faceapi.nets.faceRecognitionNet.loadFromUri("./models")

console.log("Models loaded")

}

loadModels()


window.registerFace = async function(){

const detection = await faceapi
.detectSingleFace(preview,new faceapi.TinyFaceDetectorOptions())
.withFaceLandmarks()
.withFaceDescriptor()

if(!detection){

alert("No face detected")
return

}

const descriptor = Array.from(detection.descriptor)

await setDoc(doc(db,"students","student1"),{
face: descriptor
})

alert("Face registered successfully")

}