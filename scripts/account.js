auth.onAuthStateChanged(user => {
  if (!user) {
    window.location = 'login.html'
  }
});

function populateAccountInfo() {
  auth.onAuthStateChanged(user => {
    if (user) {
      userInfo = db.collection("users").doc(user.uid);
      
      userInfo.get()
        .then(userDoc => {
          let email = userDoc.data().email;
          let name = userDoc.data().name;

          console.log(email);
          console.log(name);

          let accountHeading = document.getElementById("heading");

          let pEmail = document.createElement("p");
          let pName = document.createElement("p");
          let infoContainer = document.createElement("div");
          
          accountHeading.insertAdjacentElement("afterend", infoContainer);

          infoContainer.insertAdjacentElement("afterbegin", pEmail);
          infoContainer.insertAdjacentElement("beforeend", pName);

          infoContainer.setAttribute("class", "container");
          infoContainer.setAttribute("style", "background: #9e9e9e;");

          pEmail.insertAdjacentText("beforeend", `Email: ${email}`);
          pName.insertAdjacentText("beforeend", `Name: ${name}`);

          pEmail.setAttribute("style", "font-size: 24px;");
          

          // reportHistoryHeading.insertAdjacentElement("afterend", reportsContainerDiv);

        });
      }
  })
}

populateAccountInfo();
  

  //     let reportsContainerDiv = document.createElement("div");
  //     reportsContainerDiv.setAttribute("id", "reports-container-div");
  //     reportsContainerDiv.setAttribute("class", "container");

  //     reportsCollection.get()
  //       .then(allReports => {
  //         allReports.forEach(doc => {

  //           //Get elements
  //           let reportHistoryHeading = document.querySelector("#report-history-heading");

  //           //Create elements
  //           let singleReportContainer = document.createElement("div");
  //           let a = document.createElement("a");

  //           //Set up Bootstrap toggle
  //           singleReportContainer.setAttribute("id", `report${reportNumber}`);
  //           singleReportContainer.setAttribute("class", "collapse card");
  //           a.setAttribute("id", "report-link")
  //           a.setAttribute("href", `#report${reportNumber}`);
  //           a.setAttribute("data-bs-toggle", "collapse");

  //           let descriptionParagraph = document.createElement("p");
  //           let fileURLSParagraph = document.createElement("p");
  //           let locationGeoPointParagraph = document.createElement("p");
  //           let phoneNumberParagraph = document.createElement("p");
  //           let severityParagraph = document.createElement("p");
  //           let timestampParagraph = document.createElement("p");

  //           //Append elements
  //           reportsContainerDiv.insertAdjacentElement("beforeend", a);
  //           reportsContainerDiv.insertAdjacentElement("beforeend", singleReportContainer);
  //           reportHistoryHeading.insertAdjacentElement("afterend", reportsContainerDiv);
  //           a.insertAdjacentText("afterbegin", `Report ${reportNumber}`);

  //           singleReportContainer.insertAdjacentElement("beforeend", descriptionParagraph);
  //           singleReportContainer.insertAdjacentElement("beforeend", fileURLSParagraph);
  //           singleReportContainer.insertAdjacentElement("beforeend", locationGeoPointParagraph);
  //           singleReportContainer.insertAdjacentElement("beforeend", phoneNumberParagraph);
  //           singleReportContainer.insertAdjacentElement("beforeend", severityParagraph);
  //           singleReportContainer.insertAdjacentElement("beforeend", timestampParagraph);

  //           descriptionParagraph.insertAdjacentText("beforeend", doc.data().description);
  //           fileURLSParagraph.insertAdjacentText("beforeend", doc.data().fileURLs);
  //           locationGeoPointParagraph.insertAdjacentText("beforeend", doc.data().locationGeoPoint);
  //           phoneNumberParagraph.insertAdjacentText("beforeend", doc.data().phoneNumber);
  //           severityParagraph.insertAdjacentText("beforeend", doc.data().severity);
  //           timestampParagraph.insertAdjacentText("beforeend", doc.data().timestamp);

  //           console.log(doc.data().description);
  //           console.log(doc.data().fileURLs);

  //           //check if any pictures were uploaded
  //           //if no pictures were uploaded, doc.data().fileURLs is undefined because
  //           //no array was created for the report in the reports collection
  //           if (doc.data().fileURLs !== undefined) {

  //             //get the keys for each key-value pair in the fileURLs
  //             let keys = Object.keys(doc.data().fileURLs);

  //             let numberOfKeys = keys.length;
  //             //console.log(`OBJECT KEYS: ${Object.keys(doc.data().fileURLs)}`);

  //             //Iterate through the array of objects
  //             //and print the 
  //             for (let i = 0; i < numberOfKeys; i++) {
  //               console.log(doc.data().fileURLs[i]);

  //             }
  //           }

  //           reportNumber++;

  //         })
  //       });
  //   }
  // });
      


