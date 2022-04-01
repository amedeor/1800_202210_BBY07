auth.onAuthStateChanged(user => {
  if (!user) {
    window.location = 'login.html'
  }
});

function createMap(latitude, longitude, mapContainerElementId) {
  let map = L.map(`${mapContainerElementId}`).setView([latitude, longitude], 13);
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

function populateReportHistory() {
  auth.onAuthStateChanged(user => {
    if (user) {
      let reportsCollection = db.collection("users").doc(user.uid).collection("reports").orderBy("timestamp", "desc"); //order reports by timestamp, descending (most recent is first)

      //check if a reports collection exists
      db.collection("users").doc(user.uid).collection("reports").limit(1).get().then(results => {
        console.log(results.size);
        let reportsMessage = document.createElement("p");
        reportsMessage.setAttribute("id", "reports-message");
        let reportHistoryHeading = document.querySelector("#report-history-heading");
  
        if (results.size > 0) {
          reportsMessage.insertAdjacentText("beforeend", "Click on a date to view a report");
          reportHistoryHeading.insertAdjacentElement("afterend", reportsMessage);
        } else {
          reportsMessage.insertAdjacentText("beforeend", "You do not have any reports yet");
          reportHistoryHeading.insertAdjacentElement("afterend", reportsMessage);
        }
      });

      let reportNumber = 1;

      let reportsContainerDiv = document.createElement("div");
      reportsContainerDiv.setAttribute("id", "reports-container-div");
      reportsContainerDiv.setAttribute("class", "container");

      reportsCollection.get()
        .then(allReports => {
          allReports.forEach(doc => {

            //Get elements
            //let reportHistoryHeading = document.querySelector("#report-history-heading");

            let reportsMessage = document.querySelector("#reports-message");

            //Create elements
            let singleReportContainer = document.createElement("div");
            let a = document.createElement("a");

            //Set up Bootstrap toggle
            singleReportContainer.setAttribute("id", `report${reportNumber}`);
            singleReportContainer.setAttribute("class", "collapse card");
            a.setAttribute("id", "report-link")
            a.setAttribute("href", `#report${reportNumber}`);
            a.setAttribute("data-bs-toggle", "collapse");

            let descriptionParagraph = document.createElement("p");
            let locationGeoPointParagraph = document.createElement("p");
            let phoneNumberParagraph = document.createElement("p");
            let severityParagraph = document.createElement("p");
            let timestampParagraph = document.createElement("p");

            let latitude;
            let longitude;

            if (doc.data().locationGeoPoint !== undefined) {
              latitude = doc.data().locationGeoPoint.latitude;
              longitude = doc.data().locationGeoPoint.longitude;
            }

            let jsDateObject = doc.data().timestamp.toDate();
            let formattedDate = jsDateObject.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
            let formattedTime = jsDateObject.toLocaleTimeString('en-US');
            let dateAndTime = `${formattedDate} ${formattedTime}`

            //Append elements
            reportsContainerDiv.insertAdjacentElement("beforeend", a);
            reportsContainerDiv.insertAdjacentElement("beforeend", singleReportContainer);
            reportsMessage.insertAdjacentElement("afterend", reportsContainerDiv);
            //set the display name of the report to the date/time it was created
            a.insertAdjacentText("afterbegin", `${dateAndTime}`);


            let timeStampHeading = document.createElement("p");
            let severityHeading = document.createElement("p");
            let descriptionHeading = document.createElement("p");
            let locationGeoPointHeading = document.createElement("p");
            let phoneNumberHeading = document.createElement("p");
            let fileURLHeading = document.createElement("p");


            let mapContainer = document.createElement("div");
            mapContainer.setAttribute("id", `map${reportNumber}`);
            //used to set the width of the map so that it is displayed on the HTML page, width value is mandatory for rendering
            mapContainer.setAttribute("class", "map-style");

            console.log(mapContainer.getAttribute("id"));

            singleReportContainer.insertAdjacentElement("beforeend", timeStampHeading);
            singleReportContainer.insertAdjacentElement("beforeend", severityHeading);
            singleReportContainer.insertAdjacentElement("beforeend", descriptionHeading);
            singleReportContainer.insertAdjacentElement("beforeend", locationGeoPointHeading);
            singleReportContainer.insertAdjacentElement("beforeend", phoneNumberHeading);
            singleReportContainer.insertAdjacentElement("beforeend", fileURLHeading);

            timeStampHeading.insertAdjacentElement("afterend", timestampParagraph);
            severityHeading.insertAdjacentElement("afterend", severityParagraph);
            descriptionHeading.insertAdjacentElement("afterend", descriptionParagraph);
            locationGeoPointHeading.insertAdjacentElement("afterend", locationGeoPointParagraph);
            locationGeoPointParagraph.insertAdjacentElement("afterend", mapContainer); //add the map container element to the DOM before calling L.map()
            phoneNumberHeading.insertAdjacentElement("afterend", phoneNumberParagraph);

            timeStampHeading.insertAdjacentText("afterbegin", "Time and date:");
            severityHeading.insertAdjacentText("afterbegin", "Severity:");
            descriptionHeading.insertAdjacentText("afterbegin", "Description:");
            locationGeoPointHeading.insertAdjacentText("afterbegin", "Geolocation:");
            phoneNumberHeading.insertAdjacentText("afterbegin", "Phone number:");
            fileURLHeading.insertAdjacentText("afterbegin", "Attached media:");

            timeStampHeading.setAttribute("class", "data-heading");
            severityHeading.setAttribute("class", "data-heading");
            descriptionHeading.setAttribute("class", "data-heading");
            locationGeoPointHeading.setAttribute("class", "data-heading");
            phoneNumberHeading.setAttribute("class", "data-heading");
            fileURLHeading.setAttribute("class", "data-heading");

            console.log(jsDateObject);
            console.log(formattedDate);

            timestampParagraph.insertAdjacentText("beforeend", dateAndTime);

            let map;

            if (doc.data().locationGeoPoint !== undefined) {
              if (latitude !== 0 && longitude !== 0) {
                locationGeoPointParagraph.insertAdjacentText("beforeend", `latitude: ${latitude} longitude: ${longitude}`);
                map = createMap(latitude, longitude, mapContainer.getAttribute("id")); //we need to get the attribute of the id of the element where the map will be inserted into
              } else {
                locationGeoPointParagraph.insertAdjacentText("beforeend", "No location data available");
              }
            }

            //Add an event listener to the Bootstrap collapse event
            //When the collapse event is fired, invalidate the resize so that the map renders full width in the Bootstrap card
            singleReportContainer.addEventListener("shown.bs.collapse", e => {
              if (latitude !== 0 && longitude !== 0) {
                console.log("invalidateSize called");
                map.invalidateSize();
              } else {
                //remove the mapContainer's map-style class if there is no location data so a large blank map does not get rendered
                mapContainer.classList.toggle("map-style")
              }
            })

            severityParagraph.insertAdjacentText("beforeend", doc.data().severity);

            descriptionParagraph.insertAdjacentText("beforeend", doc.data().description);

            phoneNumberParagraph.insertAdjacentText("beforeend", doc.data().phoneNumber);

            //check if any pictures were uploaded
            //if no pictures were uploaded, doc.data().fileURLs is undefined because
            //no array was created for the report in the reports collection
            if (doc.data().fileURLs.length > 0) {

              //get the keys for each key-value pair in the fileURLs
              let keys = Object.keys(doc.data().fileURLs);

              let numberOfKeys = keys.length;
              //console.log(`OBJECT KEYS: ${Object.keys(doc.data().fileURLs)}`);

              //Iterate through the array of objects
              //and print each file URL
              for (let i = 0; i < numberOfKeys; i++) {
                let fileURLLink = document.createElement("a");
                fileURLLink.setAttribute("id", `file-url-${i}`);
                fileURLLink.insertAdjacentText("beforeend", `File ${i + 1}`);
                fileURLLink.setAttribute("href", doc.data().fileURLs[i]);
                fileURLLink.setAttribute("target", "_blank");
                singleReportContainer.insertAdjacentElement("beforeend", fileURLLink);

                // let fileURLParagraph = document.createElement("p");
                // fileURLParagraph.setAttribute("id", `file-url-${i}`);
                // fileURLParagraph.insertAdjacentText("beforeend", doc.data().fileURLs[i]);
                // singleReportContainer.insertAdjacentElement("beforeend", fileURLParagraph);

              }
            } else if (doc.data().fileURLs.length === 0) {
              let fileURLParagraph = document.createElement("p");
              fileURLParagraph.insertAdjacentText("beforeend", "No media attached");
              fileURLParagraph.setAttribute("class", "no-padding");
              fileURLHeading.insertAdjacentElement("afterend", fileURLParagraph);
            }

            reportNumber++;
          })
        });
    }
  });
}

populateReportHistory();

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


