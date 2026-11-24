const STORAGE_PLANS_KEY = "zerKeyzPracticePlans";

function getSavedPlans() {
    const raw = localStorage.getItem(STORAGE_PLANS_KEY);
    if (!raw) {
        return [];
    }
    return JSON.parse(raw);
}

function savePlans(plans) {
    localStorage.setItem(STORAGE_PLANS_KEY, JSON.stringify(plans));
}

function getCoachingTip(level, minutes) {
    if (level === "Beginner" && minutes < 20) {
        return "Short, focused 15-minute daily sessions build strong habits without hand fatigue.";
    }
    if (minutes >= 45) {
        return "Split longer sessions into warm-ups, chords/scales, and song work so focus stays sharp.";
    }
    return "Pair a metronome warm-up with one chord or rhythm goal every session.";
}

function renderSavedPlans() {
    const listEl = document.querySelector("#saved-plans-list");
    if (!listEl) {
        return;
    }

    const plans = getSavedPlans();
    if (plans.length === 0) {
        listEl.innerHTML = `<p>No practice plans saved yet. Submit the form to create one.</p>`;
        return;
    }

    listEl.innerHTML = plans
        .map(
            (plan) => `
            <article class="plan-item">
                <h3>${plan.name} (${plan.level})</h3>
                <p><strong>Weekly Target:</strong> ${plan.minutes * 7} mins/week (${plan.minutes} mins/day)</p>
                <p><strong>Goal:</strong> ${plan.notes}</p>
                <p><strong>Tip:</strong> ${plan.tip}</p>
            </article>
        `
        )
        .join("");
}

function setupEnrollmentForm() {
    const form = document.querySelector("#practice-form");
    const feedback = document.querySelector("#form-feedback");

    if (!form || !feedback) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.querySelector("#student-name");
        const emailInput = document.querySelector("#student-email");
        const levelSelect = document.querySelector("#skill-level");
        const minutesInput = document.querySelector("#minutes-per-day");
        const notesInput = document.querySelector("#practice-notes");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const level = levelSelect.value;
        const minutes = Number(minutesInput.value);
        const notes = notesInput.value.trim() || "Consistent daily keyboard practice";

        if (!name || !email || !level || Number.isNaN(minutes) || minutes < 10) {
            feedback.textContent = "Please enter your name, a valid email, a skill level, and at least 10 daily practice minutes.";
            return;
        }

        const newPlan = {
            name,
            email,
            level,
            minutes,
            notes,
            tip: getCoachingTip(level, minutes)
        };

        const existingPlans = getSavedPlans();
        existingPlans.unshift(newPlan);
        savePlans(existingPlans);

        feedback.textContent = `Saved practice plan for ${name} (${minutes} minutes/day).`;
        form.reset();
        minutesInput.value = "30";
        renderSavedPlans();
    });
}

renderSavedPlans();
setupEnrollmentForm();