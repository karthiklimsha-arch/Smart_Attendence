export function checkLocation(){

return new Promise(resolve=>{

navigator.geolocation.getCurrentPosition(pos=>{

const lat = pos.coords.latitude;
const lon = pos.coords.longitude;

const campusLat = 8.8932;
const campusLon = 76.6141;

const R = 6371;
const dLat = (lat-campusLat)*Math.PI/180;
const dLon = (lon-campusLon)*Math.PI/180;

const a =
Math.sin(dLat/2)**2 +
Math.cos(campusLat*Math.PI/180) *
Math.cos(lat*Math.PI/180) *
Math.sin(dLon/2)**2;

const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

const distance = R*c;

resolve(distance < 0.2);

});

});
}q
