const state = {
    scores: {
        chill: 0,
        creative: 0,
        outing: 0,
        trip: 0,
        symbolic: 0,
        knowledge: 0
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
        <h1 style="font-style: italic;">The Gift Of Love</h1>
        <p class="scene-text" style="font-style: italic;">${data.text}</p>
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
        <div class="fate-interaction-area"></div>
    `;

    const area = container.querySelector('.fate-interaction-area');

    // Shuffle options to ensure "luck"
    const shuffledOptions = shuffleArray([...data.options]);

    if (data.fateType === 'boxes') {
        const boxContainer = document.createElement('div');
        boxContainer.className = 'boxes-container';

        // Take 3 random options for the 3 boxes
        const currentOptions = shuffledOptions.slice(0, 3);

        currentOptions.forEach(opt => {
            const box = document.createElement('div');
            box.className = 'mystery-box';
            box.addEventListener('click', () => {
                // Animate open
                box.style.transform = 'scale(1.2) rotate(0deg)';
                box.style.filter = 'drop-shadow(0 0 30px var(--accent-color))';

                // Show reveal after animation
                setTimeout(() => {
                    showRevealPopup(opt.text || "You found a hidden path.", () => handleChoice(opt));
                }, 800);
            });
            boxContainer.appendChild(box);
        });
        area.appendChild(boxContainer);

    } else if (data.fateType === 'wheel') {
        const wheelWrapper = document.createElement('div');
        wheelWrapper.className = 'wheel-container';

        // Wheel visual
        const wheel = document.createElement('div');
        wheel.className = 'wheel';
        wheelWrapper.appendChild(wheel);

        // Arrow
        const arrow = document.createElement('div');
        arrow.className = 'wheel-arrow';
        wheelWrapper.appendChild(arrow);

        area.appendChild(wheelWrapper);

        // Spin Button
        const spinBtn = document.createElement('button');
        spinBtn.className = 'cta-btn spin-btn';
        spinBtn.textContent = "Spin Fate";

        spinBtn.addEventListener('click', () => {
            spinBtn.disabled = true;
            spinBtn.style.opacity = '0.5';

            // Random rotations + random landing
            const rotations = 3 + Math.random() * 5;
            const degrees = rotations * 360;
            const duration = 4; // seconds

            wheel.style.transition = `transform ${duration}s cubic-bezier(0.1, 0.7, 0.1, 1)`;
            wheel.style.transform = `rotate(${degrees}deg)`;

            // Pick a random option to apply
            const randomOption = shuffledOptions[Math.floor(Math.random() * shuffledOptions.length)];

            setTimeout(() => {
                showRevealPopup(randomOption.revealText || randomOption.text, () => handleChoice(randomOption));
            }, duration * 1000 + 500);
        });

        container.appendChild(spinBtn);

    } else if (data.fateType === 'cards') {
        const cardFan = document.createElement('div');
        cardFan.className = 'card-fan';

        // Use up to 6 cards
        const currentOptions = shuffledOptions.slice(0, 6);

        currentOptions.forEach((opt, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');

            card.addEventListener('click', () => {
                card.style.transform = 'translateY(-100px) scale(1.5) rotate(0deg)';
                card.style.zIndex = '100';
                card.style.boxShadow = '0 0 50px var(--secondary-accent)';

                // Dim others
                document.querySelectorAll('.card').forEach(c => {
                    if (c !== card) c.style.opacity = '0';
                });

                setTimeout(() => {
                    showRevealPopup(opt.revealText || opt.text || "Destiny revealed.", () => handleChoice(opt));
                }, 1000);
            });
            cardFan.appendChild(card);
        });
        area.appendChild(cardFan);
    }

    app.appendChild(container);

    // Add particle effects if possible
    createParticles();
}

function showRevealPopup(text, callback) {
    const popup = document.createElement('div');
    popup.className = 'reveal-popup fade-in';
    popup.innerHTML = `
        <div class="popup-content">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Fate Revealed</h3>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">${text}</p>
            <button class="cta-btn accept-destiny-btn">Accept Destiny</button>
        </div>
    `;

    popup.querySelector('button').addEventListener('click', () => {
        popup.remove();
        callback();
    });

    document.body.appendChild(popup);
}

function createParticles() {
    const particleContainer = document.getElementById('particles') || document.body;
    // Simple check to avoid too many
    if (document.querySelectorAll('.particle').length > 10) return;

    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.width = Math.random() * 5 + 'px';
        p.style.height = p.style.width;
        p.style.animationDuration = (10 + Math.random() * 20) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        particleContainer.appendChild(p);
    }
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
        <p class="scene-text">
            Your choices have settled.<br>Luck has had its say.<br>I’m just following through.
            <br><br>
            <span style="color: var(--accent-color); font-style: italic;">Happy Valentines Day, Love! ❤️</span>
        </p>
        <div class="reveal-box fade-in" style="margin-top: 3rem; padding: 2rem; border: 1px solid var(--accent-color);">
            <h2 style="color: var(--accent-color);">${finalGift}</h2>
        </div>
        <button class="cta-btn" style="margin-top: 3rem;">Start Over</button>
    `;

    container.querySelector('button').addEventListener('click', () => {
        // Reset state
        state.currentStep = 0;
        state.scores = { chill: 0, creative: 0, outing: 0, trip: 0, symbolic: 0, knowledge: 0 };
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start
init();
