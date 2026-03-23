import { db } from "./firebase-config.js"

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"

async function loadAttendance(){

const querySnapshot = await getDocs(collection(db,"attendance"))

const table = document.getElementById("attendanceTable")

table.innerHTML = ""

querySnapshot.forEach((doc)=>{

const data = doc.data()

const row = document.createElement("tr")

row.innerHTML = `
<td>${data.student}</td>
<td>${data.subject}</td>
<td>${data.time}</td>
<td>${data.status}</td>
`

table.appendChild(row)

})

}

loadAttendance()
window.downloadExcel = function(){

const table = document.querySelector("table")

let csv = []

for(let row of table.rows){

let cols = row.querySelectorAll("td, th")

let rowData = []

cols.forEach(col=>{
rowData.push(col.innerText)
})

csv.push(rowData.join(","))
}

let csvFile = new Blob([csv.join("\n")], {type:"text/csv"})

let link = document.createElement("a")

link.href = URL.createObjectURL(csvFile)

link.download = "attendance.csv"

link.click()

}