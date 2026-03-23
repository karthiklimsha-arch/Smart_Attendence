import { db } from "./firebase-config.js";
import {
collection,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const logs = document.getElementById("logs");

onSnapshot(collection(db,"attendance"), snap=>{

logs.innerHTML = "";

snap.forEach(doc=>{
const d = doc.data();

logs.innerHTML += `
<tr>
<td>${d.name}</td>
<td>${d.time}</td>
</tr>
`;

});

});