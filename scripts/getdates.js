// Get the current year for the copyright notice
const currentYearElement = document.getElementById("currentyear");
const today = new Date();
currentYearElement.textContent = today.getFullYear();

// Get the document's last modified date and inject it into the footer
const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;