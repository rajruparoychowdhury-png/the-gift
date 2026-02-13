const GIFT_DATA = {
    chill: [
        "A soft, weighted blanket",
        "A complete Harry Potter movie marathon",
        "A tea/coffee set",
        "A cozy Hogwarts-themed hoodie",
        "A reading day together",
        "A warm, ambient table lamp",
        "A subscription to any app",
        "A set of bath bombs and salts",
        "A cozy plushie or rug",
        "Noise-canceling headphones",
        "A pair of high-end sneakers / slippers",
        "A 1000-piece puzzle",
        "A gardening starter kit",
        "A chocolate box",
        "A hammock or rocking chair for the balcony",
        "A soft, faux-fur throw blanket / pillow",
        "A movie bucket list",
        "A sunrise alarm clock",
        "An essential oil diffuser",
        "A game night"
    ],
    creative: [
        "A Paint-by-Numbers kit",
        "A beginner's pottery workshop",
        "A digital drawing session",
        "A leather-bound journal",
        "A Harry Potter LEGO set",
        "A mixology kit for cocktails",
        "A musical instrument",
        "A perfume tour / experience",
        "A 'Cook a New Dish' day",
        "A personalized stationery set",
        "A candle making kit"
    ],
    outing: [
        "Dinner at a new restaurant we've wanted to try",
        "Tickets to an upcoming concert or show",
        "A visit to the botanical gardens",
        "A scenic train ride ticket",
        "A day pass to a local museum or exhibit",
        "A reserved spot at a comedy club",
        "A wine/whiskey tasting tour",
        "A sunset boat cruise",
        "A picnic in a hidden park spot",
        "Bowling and arcade night",
        "A visit to an observatory or planetarium",
        "A pottery painting date",
        "An escape room challenge",
        "A jazz club evening",
        "A drive-in movie theater experience",
        "A local food walking tour",
        "An ice cream date",
        "A mini-golf day",
        "A rooftop bar evening"
    ],
    trip: [
        "A weekend cabin getaway",
        "A road trip to the nearest coast",
        "A bike trip to a nearby city",
        "A glamping experience",
        "A staycation at a nice hotel",
        "A hiking trip with a packed lunch",
        "A visit to a national park",
        "A surprise Airbnb booking",
        "A day trip to a vineyard or brewery",
        "A day at a ski resort, waterpark, or amusement park",
        "A historic town walking tour",
        "A bike tour of a new city",
        "A kayaking adventure",
        "A ferry ride to an island",
        "An indoor rock climbing day",
        "A stargazing night"
    ],
    symbolic: [
        "A framed photo of a favorite memory",
        "Custom engraved jewelry",
        "A classic watch",
        "A star map of a special date",
        "A handwritten letter sealed with wax",
        "A personalized playlist on vinyl",
        "A custom illustration of us",
        "A hand-drawn portrait of you",
        "A locket with a secret message",
        "A soundwave art print of your favourite song",
        "A book with marginalia notes from me",
        "A custom puzzle of our photo",
        "A dedicated donation to a cause",
        "A time capsule to open later",
        "A personalized keychain or wallet",
        "Coordinated bracelets",
        "A custom neon sign",
        "A memory jar",
        "Harry Potter memorabilia",
        "A 'Coupon Book' for chores and favors"
    ],
    knowledge: [
        "A MasterClass on a new skill",
        "A beautiful hardcover book",
        "A trivia game (Harry Potter edition)",
        "A guided museum tour with an expert",
        "A subscription to a literary magazine",
        "A beginner's telescope for stargazing",
        "A book club subscription",
        "Learning a language together",
        "A history lesson together",
        "A biography of a role model",
        "A documentary film collection",
        "A rare/antique book",
        "A visit to a science center / library",
        "A globe / sand-clock / compass",
        "A puzzle box",
        "A board game",
        "A local history walking tour"
    ]
};

const STORY = [
    {
        id: "intro",
        type: "intro",
        text: "Hello Sayan, a path has opened before you.<br>It is a story that hasn't been written yet.<br>Every choice you make weaves a new thread.<br>Some strands are woven by your hand.<br>Others by fate.<br>At the end, a gift awaits.",
        cta: "Begin Adventure"
    },
    {
        id: "ch1",
        title: "Chapter I: The Morning Light",
        type: "choice",
        text: "The sun rises over a world of possibilities. How do you wish to greet the day?",
        choices: [
            { text: "Wrapped in silence and warmth.", score: { chill: 2 } },
            { text: "With a spark of imagination.", score: { creative: 2 } },
            { text: "Stepping out into the unknown.", score: { outing: 2 } },
            { text: "Traveling to a new destination.", score: { trip: 2 } },
            { text: "Looking at a photo that makes me smile.", score: { symbolic: 2 } },
            { text: "Reading a book I can't put down.", score: { knowledge: 2 } }
        ]
    },
    {
        id: "ch2",
        title: "Chapter II: The Forest Path",
        type: "choice",
        text: "The path diverges. Which way calls to your heart?",
        choices: [
            { text: "The quiet, mossy trail.", score: { chill: 2 } },
            { text: "The path of blooming wildflowers.", score: { creative: 2 } },
            { text: "The path leading to the village.", score: { outing: 2 } },
            { text: "The steep climb to the peaks.", score: { trip: 2 } },
            { text: "The path lined with magical stones.", score: { symbolic: 2 } },
            { text: "The path toward the hidden ruins.", score: { knowledge: 2 } }
        ]
    },
    {
        id: "fate1",
        title: "The Three Mystery Boxes",
        type: "fate",
        text: "Three chests appear from the shadows. Open one to hear its secret.",
        fateType: "boxes",
        // Options will be shuffled by script
        options: [
            { id: "b1", text: "You found a spark of Creation.", score: { creative: 2 } },
            { id: "b2", text: "You found a ticket to Adventure.", score: { trip: 2 } },
            { id: "b3", text: "You found a memory of Love.", score: { symbolic: 2 } },
            { id: "b4", text: "You found a quiet Moment.", score: { chill: 2 } },
            { id: "b5", text: "You found a gem of Wisdom.", score: { knowledge: 2 } },
            { id: "b6", text: "You found a journey Outward.", score: { outing: 2 } }
        ]
    },
    {
        id: "ch3",
        title: "Chapter III: The Evening Star",
        type: "choice",
        text: "Night falls. What light guides you home?",
        choices: [
            { text: "The soft glow of a candle.", score: { chill: 2 } },
            { text: "The vibrant colors of a firework.", score: { creative: 2 } },
            { text: "The city lights in the distance.", score: { outing: 2 } },
            { text: "The stars of a foreign sky.", score: { trip: 2 } },
            { text: "The reflection in a locket.", score: { symbolic: 2 } },
            { text: "The lamp of a scholar.", score: { knowledge: 2 } }
        ]
    },
    {
        id: "fate2",
        title: "The Wheel of Fortune",
        type: "fate",
        text: "A celestial wheel turns in the sky. Spin it to claim your blessing.",
        fateType: "wheel",
        options: [
            { text: "Memory", revealText: "The wheel stops on Memory.", score: { symbolic: 2 } },
            { text: "Creation", revealText: "The wheel stops on Creation.", score: { creative: 2 } },
            { text: "Journey", revealText: "The wheel stops on Journey.", score: { trip: 2 } },
            { text: "Quiet", revealText: "The wheel stops on Quiet.", score: { chill: 2 } },
            { text: "Wisdom", revealText: "The wheel stops on Wisdom.", score: { knowledge: 2 } },
            { text: "Adventure", revealText: "The wheel stops on Adventure.", score: { outing: 2 } }
        ]
    },
    {
        id: "ch4",
        title: "Chapter IV: The Crossroads",
        type: "choice",
        text: "The magic here is unpredictable. How much do you trust the chaos?",
        choices: [
            { text: "I trust the map I know.", randomness: 0.1, score: { knowledge: 1, symbolic: 1 } },
            { text: "I'll take the scenic detour.", randomness: 0.4, score: { outing: 1, chill: 1 } },
            { text: "I surrender to the wild unknown.", randomness: 0.9, score: { trip: 1, creative: 1 } }
        ]
    },
    {
        id: "fate3",
        title: "The Deck of Destiny",
        type: "fate",
        text: "Cards float before you. Pick one to reveal the final truth.",
        fateType: "cards",
        options: [
            { id: "c1", category: "Chill", revealText: "The Card of Peace.", score: { chill: 3 } },
            { id: "c2", category: "Outing", revealText: "The Card of Celebration.", score: { outing: 3 } },
            { id: "c3", category: "Trip", revealText: "The Card of Horizons.", score: { trip: 3 } },
            { id: "c4", category: "Creative", revealText: "The Card of Inspiration.", score: { creative: 3 } },
            { id: "c5", category: "Symbolic", revealText: "The Card of Meaning.", score: { symbolic: 3 } },
            { id: "c6", category: "Knowledge", revealText: "The Card of Truth.", score: { knowledge: 3 } }
        ]
    },
    {
        id: "ch5",
        title: "Chapter V: The Enchanted Door",
        type: "choice",
        text: "A door of woven vines stands before you. Use your intent to open it.",
        choices: [
            { text: "With gentle Force.", vibe: "power", score: { trip: 1 , outing: 1} },
            { text: "With a hidden Key.", vibe: "mystery", score: { knowledge: 1 } },
            { text: "With a soft Whisper.", vibe: "intimacy", score: { symbolic: 1 , chill: 1} },
            { text: "By channeling pure Energy.", vibe: "magic", score: { creative: 1 } }
        ]
    }
];
