import { db } from "./firebase-config.js";
import {
collection,
query,
orderBy,
limit,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const box = document.getElementById("sessionBox");

(async ()=>{

const q = query(
collection(db,"sessions"),
orderBy("startTime","desc"),
limit(1)
);

const snap = await getDocs(q);

snap.forEach(doc=>{
const d = doc.data();

const now = Date.now();

if(now > d.expiresAt){
box.innerHTML = "❌ Session expired";
return;
}

const link = `student.html?session=${doc.id}`;

box.innerHTML = `
<a href="${link}">
👉 Join Attendance Session
</a>
`;

});

})();