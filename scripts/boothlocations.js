//Creates a map
//latitude - the latitude of the coordinate
//longitude - the longitude of the coordinate
//mapContainerElementId - the ID of the element that will be the parent element of the map
//returns a map object
function createMap(latitude, longitude, mapContainerElementId) {
  let map = L.map(`${mapContainerElementId}`, { gestureHandling: true }).setView([latitude, longitude], 15);
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

//Populates the page with cards containing the maps of each security booth location
function populateSecurityBoothLocations() {

  let securityBoothLocationsCollection = db.collection("securityboothlocations").orderBy("name", "asc");

  let securityBoothLocationNumber = 1;

  let securityBoothLocationsContainer = document.createElement("div");
  securityBoothLocationsContainer.setAttribute("id", "maps-container-div");
  securityBoothLocationsContainer.setAttribute("class", "container");

  securityBoothLocationsCollection.get()
    .then(allBoothLocations => {
      allBoothLocations.forEach(doc => {

        let clickOnLocationMessage = document.querySelector("#click-on-location-message");

        clickOnLocationMessage.insertAdjacentElement("afterend", securityBoothLocationsContainer);

        let map;

        //Create elements
        let singleLocationContainer = document.createElement("div");
        let a = document.createElement("a"); //the link that is created will be the name of the security booth location (e.g., Rogers Arena)

        //Set up Bootstrap toggle
        singleLocationContainer.setAttribute("id", `location${securityBoothLocationNumber}`);
        singleLocationContainer.setAttribute("class", "collapse card");
        a.setAttribute("id", "booth-location-link")
        a.setAttribute("href", `#location${securityBoothLocationNumber}`);
        a.setAttribute("data-bs-toggle", "collapse");

        //Append elements
        securityBoothLocationsContainer.insertAdjacentElement("beforeend", a);
        securityBoothLocationsContainer.insertAdjacentElement("beforeend", singleLocationContainer);

        //Insert the name of the security booth location as the text for the link
        a.insertAdjacentText("afterbegin", `${doc.data().name}`);

        let mapContainer = document.createElement("div");
        mapContainer.setAttribute("id", `map${securityBoothLocationNumber}`);
        //used to set the width of the map so that it is displayed on the HTML page, width value is mandatory for rendering
        mapContainer.setAttribute("class", "map-style color");

        let mapTitle = document.createElement("p");
        mapTitle.setAttribute("class", "map-title");
        mapTitle.insertAdjacentText("afterbegin", doc.data().name);
        singleLocationContainer.insertAdjacentElement("beforeend", mapTitle);
        singleLocationContainer.insertAdjacentElement("beforeend", mapContainer); //add the map container element to the DOM before calling L.map()

        //Get latitude and longitude from each map location
        latitude = doc.data().coordinates.latitude;
        longitude = doc.data().coordinates.longitude;

        //Get the attribute of the id of the element where the map will be inserted into
        map = createMap(latitude, longitude, mapContainer.getAttribute("id"));

        //Add an event listener to the Bootstrap collapse event
        //When the collapse event is fired, invalidate the resize so that the map renders full width in the Bootstrap card
        singleLocationContainer.addEventListener("shown.bs.collapse", e => {
          map.invalidateSize();
        });
        securityBoothLocationNumber++;
      });
    })
    .catch(error => {
      console.log(error);
    });
}

populateSecurityBoothLocations();

let logoLink = document.querySelector("#logo-link");

//if a user is not logged in and they click on the navbar logo, direct them to login.html
//if a user is logged in and they click on the navbar logo, direct them to main.html
logoLink.addEventListener("click", e => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location = "index.html";
    }
    else if (user) {
      window.location = "main.html"
    }
  });
});