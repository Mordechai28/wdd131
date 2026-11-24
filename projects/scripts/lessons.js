const STORAGE_COMPLETED_KEY = "zerKeyzCompletedLessons";

const academyLessons = [
    {
        id: "scales-101",
        title: "Major & Minor Scale Fingering",
        level: "Beginner",
        category: "Technique",
        duration: "15 min",
        image: "images/lesson-scales.webp",
        alt: "Piano keys during a scale fingering exercise",
        summary: "Practice smooth thumb crossings and even finger weight across foundational major and minor scales."
    },
    {
        id: "triads-inversions",
        title: "Triads & Smooth Inversions",
        level: "Beginner",
        category: "Chords",
        duration: "18 min",
        image: "images/lesson-chords.webp",
        alt: "Keyboard chord study and musical notes",
        summary: "Keep hand movement minimal by shifting chord inversions instead of jumping across the keyboard."
    },
    {
        id: "groove-dynamics",
        title: "Rhythmic Comping & Dynamics",
        level: "Intermediate",
        category: "Rhythm",
        duration: "20 min",
        image: "images/lesson-keys.webp",
        alt: "Close-up of keyboard keys for rhythm practice",
        summary: "Build steady eighth-note grooves and control soft-to-loud phrasing between hands."
    },
    {
        id: "pop-voicings",
        title: "Seventh Chords & Progressions",
        level: "Intermediate",
        category: "Chords",
        duration: "22 min",
        image: "images/lesson-chords.webp",
        alt: "Chord voicing practice on keyboard",
        summary: "Add color and warmth to progressions using major 7th, minor 7th, and dominant 7th voicings."
    },
    {
        id: "finger-independence",
        title: "Left-Hand Bass & Right-Hand Melody",
        level: "Beginner",
        category: "Technique",
        duration: "16 min",
        image: "images/lesson-scales.webp",
        alt: "Two-hand coordination on piano keys",
        summary: "Coordinate simple bass patterns with clear melodic phrasing without rushing tempo."
    },
    {
        id: "syncopated-feel",
        title: "Syncopation & Metronome Lock",
        level: "Intermediate",
        category: "Rhythm",
        duration: "19 min",
        image: "images/lesson-keys.webp",
        alt: "Metronome and keyboard practice view",
        summary: "Place accents accurately on off-beats while maintaining a rock-solid internal pulse."
    }
];

function loadCompletedIds() {
    const saved = localStorage.getItem(STORAGE_COMPLETED_KEY);
    if (!saved) {
        return [];
    }
    return JSON.parse(saved);
}

function saveCompletedIds(ids) {
    localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(ids));
}

function updateProgressSummary(completedIds, totalCount) {
    const summaryEl = document.querySelector("#progress-summary");
    if (!summaryEl) {
        return;
    }

    if (completedIds.length === 0) {
        summaryEl.textContent = `0 of ${totalCount} lessons completed. Select a category or mark a lesson complete to track progress.`;
    } else if (completedIds.length === totalCount) {
        summaryEl.textContent = `All ${totalCount} of ${totalCount} lessons completed. Great consistency at the keys!`;
    } else {
        summaryEl.textContent = `${completedIds.length} of ${totalCount} lessons completed.`;
    }
}

function renderLessons(selectedCategory = "All") {
    const gridEl = document.querySelector("#lessons-grid");
    if (!gridEl) {
        return;
    }

    const completedIds = loadCompletedIds();
    const filteredLessons =
        selectedCategory === "All"
            ? academyLessons
            : academyLessons.filter((item) => item.category === selectedCategory);

    gridEl.innerHTML = filteredLessons
        .map((lesson) => {
            const isDone = completedIds.includes(lesson.id);
            const statusLabel = isDone ? "Completed" : "Mark Complete";
            const checkedAttr = isDone ? "checked" : "";

            return `
                <article class="info-card">
                    <img src="${lesson.image}" alt="${lesson.alt}" width="600" height="360" loading="lazy">
                    <h3>${lesson.title}</h3>
                    <p>${lesson.summary}</p>
                    <span class="lesson-meta">${lesson.level} &bull; ${lesson.category} &bull; ${lesson.duration}</span>
                    <div class="card-actions">
                        <label class="complete-toggle">
                            <input type="checkbox" class="lesson-check" data-id="${lesson.id}" ${checkedAttr}>
                            <span>${statusLabel}</span>
                        </label>
                    </div>
                </article>
            `;
        })
        .join("");

    updateProgressSummary(completedIds, academyLessons.length);
}

function setupLessonEvents() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gridEl = document.querySelector("#lessons-grid");
    let currentCategory = "All";

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            currentCategory = btn.dataset.category;
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderLessons(currentCategory);
        });
    });

    if (gridEl) {
        gridEl.addEventListener("change", (event) => {
            const target = event.target;
            if (!target.classList.contains("lesson-check")) {
                return;
            }

            const lessonId = target.dataset.id;
            let completed = loadCompletedIds();

            if (target.checked) {
                if (!completed.includes(lessonId)) {
                    completed.push(lessonId);
                }
            } else {
                completed = completed.filter((id) => id !== lessonId);
            }

            saveCompletedIds(completed);
            renderLessons(currentCategory);
        });
    }
}

renderLessons("All");
setupLessonEvents();