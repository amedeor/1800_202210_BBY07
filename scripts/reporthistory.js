auth.onAuthStateChanged(user => {
  if (!user) {
    window.location = 'login.html'
  }
});

function populateReportHistory() {
  auth.onAuthStateChanged(user => {
    if (user) {
      reportsCollection = db.collection("users").doc(user.uid).collection("reports");

      let reportNumber = 1;

      let reportsContainerDiv = document.createElement("div");
      reportsContainerDiv.setAttribute("id", "reports-container-div");
      reportsContainerDiv.setAttribute("class", "container");

      reportsCollection.get()
        .then(allReports => {
          allReports.forEach(doc => {

            //Get elements
            let reportHistoryHeading = document.querySelector("#report-history-heading");

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

            //Append elements
            reportsContainerDiv.insertAdjacentElement("beforeend", a);
            reportsContainerDiv.insertAdjacentElement("beforeend", singleReportContainer);
            reportHistoryHeading.insertAdjacentElement("afterend", reportsContainerDiv);
            a.insertAdjacentText("afterbegin", `Report ${reportNumber}`);


            let timeStampHeading = document.createElement("p");
            let severityHeading = document.createElement("p");
            let descriptionHeading = document.createElement("p");
            let locationGeoPointHeading = document.createElement("p");
            let phoneNumberHeading = document.createElement("p");
            let fileURLHeading = document.createElement("p");


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


            timestampParagraph.insertAdjacentText("beforeend", doc.data().timestamp.toDate());

            if (doc.data().locationGeoPoint !== undefined) {
              locationGeoPointParagraph.insertAdjacentText("beforeend", `latitude: ${latitude} longitude: ${longitude}`);
            }

            severityParagraph.insertAdjacentText("beforeend", doc.data().severity);

            descriptionParagraph.insertAdjacentText("beforeend", doc.data().description);

            phoneNumberParagraph.insertAdjacentText("beforeend", doc.data().phoneNumber);

            //check if any pictures were uploaded
            //if no pictures were uploaded, doc.data().fileURLs is undefined because
            //no array was created for the report in the reports collection
            if (doc.data().fileURLs !== undefined) {

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
                fileURLLink.setAttribute("href",doc.data().fileURLs[i]);
                fileURLLink.setAttribute("target", "_blank");
                singleReportContainer.insertAdjacentElement("beforeend", fileURLLink);

                // let fileURLParagraph = document.createElement("p");
                // fileURLParagraph.setAttribute("id", `file-url-${i}`);
                // fileURLParagraph.insertAdjacentText("beforeend", doc.data().fileURLs[i]);
                // singleReportContainer.insertAdjacentElement("beforeend", fileURLParagraph);

              }
            }

            reportNumber++;
          })
        });
    }
  });
}

populateReportHistory();

console.log("HELLO WORLD!");