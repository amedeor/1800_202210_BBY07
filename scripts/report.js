//check if the user is logged in, if not, redirect to the login.html page
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location = 'login.html'
  }
});

//get a reference to the HTML form
const emergencyReportForm = document.querySelector("#emergency-report-form");

let fileUploadButton = document.querySelector("#file-upload");
let reportEmergencyButton = document.querySelector("#report-emergency-button");
let fileUploadContainerElement = document.querySelector("#file-upload-container");
let filesContainerElement = document.createElement("div");
filesContainerElement.setAttribute("id", "uploaded-files-container");
let uploadedFilesHeading = document.createElement("p");
uploadedFilesHeading.setAttribute("id", "uploaded-files-heading");
uploadedFilesHeading.setAttribute("class", "form-control-heading");

let deleteFilesButton = document.createElement("input");
deleteFilesButton.setAttribute("type", "button");
deleteFilesButton.setAttribute("value", "Delete all uploaded files");
deleteFilesButton.setAttribute("id", "delete-files-button")
deleteFilesButton.setAttribute("class", "btn btn-danger");

let fileURLs = [];

//create unique ID for the storage location
const uniqueStorageFolderId = Date.now() + Math.random();
console.log(`Unique storage folder ID: ${uniqueStorageFolderId}`);

fileUploadButton.addEventListener("change", e => {

  fileUploadContainerElement.insertAdjacentElement("beforeend", filesContainerElement);

  //if there is no heading, insert it
  if (document.body.contains(uploadedFilesHeading) === false) {
    filesContainerElement.insertAdjacentElement("afterbegin", uploadedFilesHeading);
    uploadedFilesHeading.insertAdjacentText("afterbegin", "Uploaded files:");
  }

  for (let i = 0; i < e.target.files.length; i++) {
    let file = e.target.files[i];
    let fileName = file.name;

    let fileParagraph = document.createElement("p");
    fileParagraph.insertAdjacentText("afterbegin", fileName);
    filesContainerElement.insertAdjacentElement("beforeend", fileParagraph);

    uploadFileToFirestore();
  }

  if (e.target.files.length > 0) {
    fileUploadContainerElement.insertAdjacentElement("beforeend", deleteFilesButton);
  }
});

deleteFilesButton.addEventListener("click", e => {
  console.log(fileUploadButton.files);
  fileUploadButton.value = null;
  console.log(fileUploadButton.files);

  filesContainerElement.textContent = "";
  deleteFilesButton.remove();
  uploadedFilesHeading.remove();
  uploadedFilesHeading.textContent = "";

  deleteFileUploadFolderInFirestore();
})

function deleteFileUploadFolderInFirestore() {
  //create a reference to the unique storage folder for the report
  let storageReference = firebase.storage().ref(`/users/${auth.currentUser.uid}/${uniqueStorageFolderId}`);
  
  //delete the folder containing all uploaded files by deleting each file in the folder
  //Firebase doesn't not support deleting storage folders directly
  storageReference.listAll()
    .then(allItemsInFolder => {
      allItemsInFolder.items.forEach(file => {
        file.delete()
      })
    })
    .catch(error => {
      console.log(error);
    })
}

async function uploadFileToFirestore() {
  try {
    //get the file from the HTML form
    const file = document.querySelector("#file-upload").files[0];

    //create a reference to firestore 
    let storageReference = firebase.storage().ref(`/users/${auth.currentUser.uid}/${uniqueStorageFolderId}/${file.name}`)

    //upload the file to firestore
    let uploadTask = await storageReference.put(file);
    let fileDownloadURL = await uploadTask.ref.getDownloadURL(); //get the link to the file in storage

    console.log(`File URL: ${fileDownloadURL}`);

    fileURLs.push(fileDownloadURL); //store the link to the file in an array

  } catch (error) {
    console.log(error);
  }
}

//Get the location of the user
const locationCheckbox = document.querySelector("#location-checkbox");

let latitude;
let longitude;

locationCheckbox.addEventListener("change", e => {
  if (locationCheckbox.checked === true) {
    console.log("checked");
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);
      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;
    });
  }
});

//save report data
emergencyReportForm.addEventListener("submit", e => {
  //prevents the default action of reloading the page after clicking the submit button
  e.preventDefault();

  const signedInUser = auth.currentUser;
  const signedInUserId = signedInUser.uid;
  console.log(signedInUserId);

  //go to the correct user document by referencing to the user's uid
  const userDocument = db.collection("users").doc(signedInUserId);
  console.log(userDocument);

  //get the reports collection of the current user
  const reports = userDocument.collection("reports");

  //If the user doesn't share their location data, then assign the GeoPoint a 
  //latitude of 0 and a longitude of 0
  let userLocation;

  if (latitude === undefined || longitude === undefined) {
    userLocation = new firebase.firestore.GeoPoint(0, 0);
  } else {
    userLocation = new firebase.firestore.GeoPoint(latitude, longitude);
    console.log(userLocation.latitude, userLocation.longitude);
  }

  const timestamp = new firebase.firestore.Timestamp.now();

  //write the data from the form to the database
  //use .then to wait for add to database task to finish
  //once database write is complete, display success message or error message
  reports.add({
    description: emergencyReportForm.description.value,
    phoneNumber: emergencyReportForm.phoneNumber.value,
    severity: emergencyReportForm.severity.value,
    locationGeoPoint: userLocation,
    timestamp: timestamp,
    fileFolderID: uniqueStorageFolderId,
    fileURLs: fileURLs
  }).then(() => {
    alert("Your security report has been successfully submitted.");
    window.location = "main.html";
  }).catch(error => {
    console.log(error);
  });
});

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
})