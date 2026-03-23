import { db } from "./firebase-config.js"

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"


const video = document.getElementById("video")

async function startCamera(){

const stream = await navigator.mediaDevices.getUserMedia({video:true})

video.srcObject = stream

}

startCamera()


async function loadModels(){

await faceapi.nets.tinyFaceDetector.loadFromUri("/models")

await faceapi.nets.faceLandmark68Net.loadFromUri("/models")

await faceapi.nets.faceRecognitionNet.loadFromUri("/models")

}

loadModels()


window.registerFace = async function(){

const detection = await faceapi
.detectSingleFace(video)
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

alert("Face Registered")

}