// Footer Dynamic Dates
const currentYearElement = document.getElementById("currentyear");
currentYearElement.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;

// Static Weather Values matching HTML text content
const temperature = 10; // °C
const windSpeed = 5;    // km/h

// Function to calculate metric wind chill in exactly ONE line of code
const calculateWindChill = (temp, speed) => (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);

const chillElement = document.getElementById("chill");

// Check conditions before calling wind chill function (Metric: temp <= 10 °C and wind speed > 4.8 km/h)
if (temperature <= 10 && windSpeed > 4.8) {
    chillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    chillElement.textContent = "N/A";
}