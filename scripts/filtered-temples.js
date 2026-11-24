const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple-lds-83166-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Durban South Africa",
    location: "Umhlanga, KwaZulu-Natal, South Africa",
    dedicated: "2020, February, 16",
    area: 19860,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/durban-south-africa-temple/durban-south-africa-temple-7929-thumb.jpg"
  }
];

const cardsContainer = document.querySelector("#temple-cards");
const headingEl = document.querySelector("#page-heading");

function getDedicatedYear(dedicatedString) {
  return parseInt(dedicatedString.split(",")[0].trim(), 10);
}

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.classList.add("temple-card");

  const title = document.createElement("h2");
  title.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<strong>Size:</strong> ${temple.area.toLocaleString()} sq ft`;

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = "lazy";
  img.width = 400;
  img.height = 250;

  card.append(title, location, dedicated, area, img);
  return card;
}

function displayTemples(list, label) {
  cardsContainer.innerHTML = "";
  headingEl.textContent = label;

  list.forEach((temple) => {
    cardsContainer.appendChild(createTempleCard(temple));
  });
}

function setActiveNav(activeId) {
  document.querySelectorAll("#nav-list a").forEach((link) => {
    link.classList.toggle("active", link.id === activeId);
  });
}

document.querySelector("#filter-home").addEventListener("click", (event) => {
  event.preventDefault();
  setActiveNav("filter-home");
  displayTemples(temples, "Home");
});

document.querySelector("#filter-old").addEventListener("click", (event) => {
  event.preventDefault();
  setActiveNav("filter-old");
  const oldTemples = temples.filter((t) => getDedicatedYear(t.dedicated) < 1900);
  displayTemples(oldTemples, "Old Temples (Before 1900)");
});

document.querySelector("#filter-new").addEventListener("click", (event) => {
  event.preventDefault();
  setActiveNav("filter-new");
  const newTemples = temples.filter((t) => getDedicatedYear(t.dedicated) > 2000);
  displayTemples(newTemples, "New Temples (After 2000)");
});

document.querySelector("#filter-large").addEventListener("click", (event) => {
  event.preventDefault();
  setActiveNav("filter-large");
  const largeTemples = temples.filter((t) => t.area > 90000);
  displayTemples(largeTemples, "Large Temples (> 90,000 sq ft)");
});

document.querySelector("#filter-small").addEventListener("click", (event) => {
  event.preventDefault();
  setActiveNav("filter-small");
  const smallTemples = temples.filter((t) => t.area < 10000);
  displayTemples(smallTemples, "Small Temples (< 10,000 sq ft)");
});

const menuBtn = document.querySelector("#menu-btn");
const navList = document.querySelector("#nav-list");
if (menuBtn && navList) {
  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

const yearEl = document.querySelector("#year");
const modifiedEl = document.querySelector("#lastModified");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
if (modifiedEl) {
  modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}

displayTemples(temples, "Home");