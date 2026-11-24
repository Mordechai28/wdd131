const featuredLessonsData = [
    {
        id: "scale-foundations",
        title: "Major & Minor Scale Fingering",
        level: "Beginner",
        category: "Technique",
        duration: "15 min",
        summary: "Build smooth thumb-under crossover habits across C, G, F, and D major scales."
    },
    {
        id: "chord-progressions",
        title: "I–V–vi–IV Chord Voicings",
        level: "Intermediate",
        category: "Chords",
        duration: "20 min",
        summary: "Connect everyday pop and worship progressions smoothly using first and second inversions."
    },
    {
        id: "groove-comping",
        title: "Rhythmic Comping & Dynamics",
        level: "Intermediate",
        category: "Rhythm",
        duration: "18 min",
        summary: "Lock into steady eighth-note and syncopated grooves while balancing left- and right-hand volume."
    }
];

function setFooterInfo() {
    const yearEl = document.querySelector("#current-year");
    const modifiedEl = document.querySelector("#last-modified");

    if (yearEl) {
        yearEl.textContent = `${new Date().getFullYear()}`;
    }

    if (modifiedEl) {
        modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
    }
}

function setupNavigation() {
    const toggleBtn = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#primary-nav");

    if (!toggleBtn || !navMenu) {
        return;
    }

    toggleBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        toggleBtn.setAttribute("aria-expanded", `${isOpen}`);
    });
}

function renderFeaturedLessons(lessons) {
    const container = document.querySelector("#featured-lessons");

    if (!container) {
        return;
    }

    container.innerHTML = lessons
        .map(
            (lesson) => `
            <article class="info-card">
                <h3>${lesson.title}</h3>
                <p>${lesson.summary}</p>
                <span class="lesson-meta">${lesson.level} &bull; ${lesson.category} &bull; ${lesson.duration}</span>
            </article>
        `
        )
        .join("");
}

setFooterInfo();
setupNavigation();
renderFeaturedLessons(featuredLessonsData);