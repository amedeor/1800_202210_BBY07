function createMap(latitude, longitude, mapContainerElementId) {
  let map = L.map(`${mapContainerElementId}`).setView([latitude, longitude], 15);
  let marker = L.marker([latitude, longitude]).addTo(map); //map is the name of the variable that we created at the beginning of the function, marker is added to map

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGVhbTA3IiwiYSI6ImNsMHZ4OHZ2aTA2NmkzZHJwMzMybGJsNWwifQ.Xxv9jHm2g3dsq1H0Dpd9CA'
  }).addTo(map);

  return map;
}

//map coordinates
const richmondOvalCoords = { latitude: 49.1740067, longitude: -123.1533034 };
console.log(richmondOvalCoords.latitude);
const cypressMountainCoords = { latitude: 49.3957428, longitude: -123.2052326 };
const pneCoords = { latitude: 49.2822281, longitude: -123.0442549 };
const rogersArenaCoords = { latitude: 49.2778355, longitude: -123.1175775 };
const ubcCoords = { latitude: 49.2585025, longitude: -123.2441084 };
const olympicParalymicCoords = { latitude: 49.2434708, longitude: -123.1094403 };
const creeksideCoords = { latitude: 50.0911199, longitude: -122.9809555 };
const blackcombCoords = { latitude: 50.0951035, longitude: -122.9022308 };

let mapContainers = document.querySelectorAll(".map-container");

let richmondOvalMap = createMap(richmondOvalCoords.latitude, richmondOvalCoords.longitude, "richmond-oval"); //we need to get the attribute of the id of the element where the map will be inserted into
let cypressMountainMap = createMap(cypressMountainCoords.latitude, cypressMountainCoords.longitude, "cypress"); //we need to get the attribute of the id of the element where the map will be inserted into
let pneMap = createMap(pneCoords.latitude, pneCoords.longitude, "pne");
let rogersArenaMap = createMap(rogersArenaCoords.latitude, rogersArenaCoords.longitude, "rogers-arena");
let ubcMap = createMap(ubcCoords.latitude, ubcCoords.longitude, "ubc-winter-sports");
let olympicParalympicMap = createMap(olympicParalymicCoords.latitude, olympicParalymicCoords.longitude, "olympic-paralympic-centre");
let creeksideMap = createMap(creeksideCoords.latitude, creeksideCoords.longitude, "creekside");
let blackcombMap = createMap(blackcombCoords.latitude, blackcombCoords.longitude, "blackcomb");

mapContainers.forEach(mapContainer => {
  console.log(mapContainer);
  mapContainer.addEventListener("shown.bs.collapse", e => {
    console.log("invalidateSize called");
    richmondOvalMap.invalidateSize();
    cypressMountainMap.invalidateSize();
    pneMap.invalidateSize();
    rogersArenaMap.invalidateSize();
    ubcMap.invalidateSize();
    olympicParalympicMap.invalidateSize();
    creeksideMap.invalidateSize();
    blackcombMap.invalidateSize();
  });
});

let logoLink = document.querySelector("#logo-link");

//if a user is not logged in and they click on the navbar logo, direct them to login.html
//if a user is logged in and they click on the navbar logo, direct them to main.html
logoLink.addEventListener("click", e => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location = "login.html";
    }
    else if (user) {
      window.location = "main.html"
    }
  });
})