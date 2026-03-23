let faceMatcher;

export async function loadModels(){
await faceapi.nets.tinyFaceDetector.loadFromUri("models");
await faceapi.nets.faceLandmark68Net.loadFromUri("models");
await faceapi.nets.faceRecognitionNet.loadFromUri("models");
}

// blink detection
export function checkBlink(landmarks){
const leftEye = landmarks.getLeftEye();
const rightEye = landmarks.getRightEye();

const left = Math.abs(leftEye[1].y - leftEye[5].y);
const right = Math.abs(rightEye[1].y - rightEye[5].y);

return (left < 3 && right < 3);
}

// load registered face
export async function initFaceMatcher(db){

const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js");

const snap = await getDoc(doc(db,"students","student1"));

const desc = new Float32Array(snap.data().face);

const labeled = new faceapi.LabeledFaceDescriptors("student1",[desc]);

faceMatcher = new faceapi.FaceMatcher([labeled],0.6);

}

// match face
export async function matchFace(video){

const detection = await faceapi
.detectSingleFace(video,new faceapi.TinyFaceDetectorOptions())
.withFaceLandmarks()
.withFaceDescriptor();

if(!detection) return null;

if(!checkBlink(detection.landmarks)){
alert("Blink to verify");
return null;
}

const result = faceMatcher.findBestMatch(detection.descriptor);

return result.label;

}