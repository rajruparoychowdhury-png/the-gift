const state = {
    scores: {
        chill: 0,
        creative: 0,
        outing: 0,
        trip: 0,
        symbolic: 0
    },
    vibe: "",
    randomness: 0,
    currentStep: 0
};

const app = document.getElementById('app');

function init() {
    renderStep();
    setTimeout(() => {
        app.classList.add('visible');
    }, 100);
}

function renderStep() {
    // Clear current content with fade out
    app.classList.remove('visible');

    setTimeout(() => {
        app.innerHTML = ''; // Clear content

        if (state.currentStep >= STORY.length) {
            renderReveal();
        } else {
            const stepData = STORY[state.currentStep];
            if (stepData.type === 'intro') {
                renderIntro(stepData);
            } else if (stepData.type === 'fate') {
                renderFate(stepData);
            } else {
                renderChapter(stepData);
            }
        }

        // Fade in new content
        app.classList.add('visible');
    }, 500); // Wait for fade out
}

function renderIntro(data) {
    const container = document.createElement('div');
    container.innerHTML = `
        <h1>The Gift</h1>
        <p class="scene-text">${data.text}</p>
        <button class="cta-btn">${data.cta}</button>
    `;

    container.querySelector('button').addEventListener('click', nextStep);
    app.appendChild(container);
}

function renderChapter(data) {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>${data.title}</h2>
        <p class="scene-text">${data.text}</p>
        <div class="choices"></div>
    `;

    const choicesContainer = container.querySelector('.choices');

    data.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', () => handleChoice(choice));
        choicesContainer.appendChild(btn);
    });

    app.appendChild(container);
}

function renderFate(data) {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>${data.title}</h2>
        <p class="scene-text">${data.text}</p>
        <div class="fate-container"></div>
    `;

    const fateContainer = container.querySelector('.fate-container');

    if (data.fateType === 'threads') {
        data.options.forEach(opt => {
            const thread = document.createElement('div');
            thread.className = 'fate-thread';
            thread.addEventListener('click', () => handleChoice(opt));
            fateContainer.appendChild(thread);
        });
    } else if (data.fateType === 'words') {
        data.options.forEach(opt => {
            const word = document.createElement('div');
            word.className = 'fate-word';
            word.textContent = opt.text;
            word.addEventListener('click', () => handleChoice(opt));
            fateContainer.appendChild(word);
        });
    } else if (data.fateType === 'shapes') {
        data.options.forEach(opt => {
            const shape = document.createElement('div');
            shape.className = 'fate-shape';
            shape.textContent = opt.text;
            shape.addEventListener('click', () => handleChoice(opt));
            fateContainer.appendChild(shape);
        });
    }

    app.appendChild(container);
}

function handleChoice(choice) {
    // Update State
    if (choice.score) {
        for (const [key, value] of Object.entries(choice.score)) {
            if (state.scores[key] !== undefined) {
                state.scores[key] += value;
            }
        }
    }

    if (choice.vibe) {
        state.vibe = choice.vibe;
    }

    if (choice.randomness !== undefined) {
        state.randomness = choice.randomness;
    }

    nextStep();
}

function nextStep() {
    state.currentStep++;
    renderStep();
}

function renderReveal() {
    // transform scores into a result
    const winningCategory = getWinningCategory();
    const finalGift = getGiftFromCategory(winningCategory);

    const container = document.createElement('div');
    container.innerHTML = `
        <h1>This is what found you.</h1>
        <p class="scene-text">Your choices have settled.<br>Luck has had its say.<br>I’m just following through.</p>
        <div class="reveal-box fade-in" style="margin-top: 3rem; padding: 2rem; border: 1px solid var(--accent-color);">
            <h2 style="color: var(--accent-color);">${finalGift}</h2>
            <p style="font-size: 0.9rem; margin-top: 1rem;">Category: ${winningCategory.charAt(0).toUpperCase() + winningCategory.slice(1)}</p>
        </div>
        <button class="cta-btn" style="margin-top: 3rem;">Start Over</button>
    `;

    container.querySelector('button').addEventListener('click', () => {
        // Reset state
        state.currentStep = 0;
        state.scores = { chill: 0, creative: 0, outing: 0, trip: 0, symbolic: 0 };
        state.vibe = "";
        state.randomness = 0;
        renderStep();
    });

    app.appendChild(container);
}

function getWinningCategory() {
    // Get highest score
    let maxScore = -1;
    let candidates = [];

    for (const [cat, score] of Object.entries(state.scores)) {
        if (score > maxScore) {
            maxScore = score;
            candidates = [cat];
        } else if (score === maxScore) {
            candidates.push(cat);
        }
    }

    // Pick random from tied candidates
    let winner = candidates[Math.floor(Math.random() * candidates.length)];

    // Apply Randomness Factor (Ch 4)
    // If Randomness is high (0.8), there is a chance to pick a completely random category instead
    if (Math.random() < state.randomness) {
        const allCategories = Object.keys(state.scores);
        winner = allCategories[Math.floor(Math.random() * allCategories.length)];
    }

    return winner;
}

function getGiftFromCategory(category) {
    const pool = GIFT_DATA[category];
    return pool[Math.floor(Math.random() * pool.length)];
}

// Start
init();
