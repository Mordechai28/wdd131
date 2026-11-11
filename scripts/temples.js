// Dynamic Footer Dates
const currentYearElement = document.getElementById("currentyear");
currentYearElement.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;

// Hamburger Menu Toggle Functionality
const hambutton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hambutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hambutton.classList.toggle('open');
});