export const SAMPLE_RECIPES = [
  {
    id: 'marinara-1978',
    title: "Grandpa Arthur's Slow-Simmered Sunday Marinara",
    recordedBy: "Grandpa Arthur Pendelton",
    year: "1978",
    originCity: "Brooklyn, New York",
    image: "/marinara.jpg",
    prepTime: "25 mins",
    cookTime: "3 hrs 30 mins",
    servings: 6,
    tags: ["Gluten-Free Option", "Dairy-Free", "Heritage Classic", "Slow Cook"],
    quote: "Don't rush the garlic! Let it soften slow until it smells like Sunday morning when your mom was setting the tablecloth.",
    audioTranscript: "Alright kiddo, listen up. You take whole San Marzano tomatoes—don't buy the crushed stuff, you crush them with your hands, feel the texture. Heat a quarter cup of good cold-pressed olive oil in a heavy Dutch oven. Toss in five cloves of thinly sliced garlic and a small pinched stem of fresh basil. When the garlic gets translucent—never burnt!—pour in the tomatoes. Add half a teaspoon of crushed red pepper and here's my secret: a quarter teaspoon of ground cinnamon and a knob of butter right at the end. Simmer on ultra low heat for at least three hours until dark red as mahogany.",
    gemmaDebug: {
      model: "Gemma 4-bit Open-Weight (Local Inference)",
      latency: "142ms",
      promptTokens: 384,
      vagueTermsResolved: [
        { term: "a small pinched stem", resolvedTo: "10g fresh basil stem" },
        { term: "my secret knob of butter", resolvedTo: "15g (1 tbsp) unsalted butter" },
        { term: "until dark red as mahogany", resolvedTo: "Simmer 3.5 hrs on Low (180°F)" }
      ]
    },
    nutrition: {
      calories: 320,
      carbs: 45,
      protein: 8,
      fat: 14,
      fiber: 6
    },
    flavorProfile: [
      { aspect: 'Umami', score: 95 },
      { aspect: 'Sweetness', score: 40 },
      { aspect: 'Acidity', score: 75 },
      { aspect: 'Aroma', score: 90 },
      { aspect: 'Spice', score: 30 }
    ],
    ingredients: [
      { name: "San Marzano Whole Peeled Tomatoes", metric: "1400g", us: "2 cans (28 oz each)", category: "Produce/Canned" },
      { name: "Extra Virgin Olive Oil", metric: "60ml", us: "1/4 cup", category: "Pantry" },
      { name: "Fresh Garlic (thinly sliced)", metric: "5 cloves", us: "5 cloves", category: "Produce" },
      { name: "Fresh Basil (stem + leaves)", metric: "15g", us: "1 small bunch", category: "Produce" },
      { name: "Crushed Red Pepper Flakes", metric: "2g", us: "1/2 tsp", category: "Spices" },
      { name: "Grandpa's Secret: Ground Cinnamon", metric: "1g", us: "1/4 tsp", category: "Spices" },
      { name: "Unsalted Butter (Finish)", metric: "15g", us: "1 tbsp", category: "Dairy" },
      { name: "Sea Salt & Fresh Black Pepper", metric: "To taste", us: "To taste", category: "Spices" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Hand-Crush the Tomatoes",
        instruction: "Pour the canned San Marzano tomatoes into a large bowl. Using clean hands, crush the whole tomatoes into rustic chunks, retaining all natural juices.",
        audioPrompt: "First, crush your San Marzano tomatoes by hand in a large bowl. Don't use a machine; keep rustic chunks."
      },
      {
        stepNumber: 2,
        title: "Gentle Aromatic Infusion",
        instruction: "Heat olive oil in a heavy Dutch oven over medium-low heat. Add thinly sliced garlic and the fresh basil stem. Sauté gently for 3-4 minutes until garlic is fragrant and translucent, never browned.",
        audioPrompt: "Heat 1/4 cup olive oil on medium-low. Add sliced garlic and basil stem. Sauté gently for 3 minutes until translucent."
      },
      {
        stepNumber: 3,
        title: "Combine & Add Secret Spice",
        instruction: "Carefully pour in hand-crushed tomatoes. Add red pepper flakes, sea salt, and Grandpa's secret touch: 1/4 tsp ground cinnamon. Stir with a wooden spoon.",
        audioPrompt: "Pour in tomatoes. Stir in red pepper flakes, salt, and Grandpa's secret touch: 1/4 teaspoon ground cinnamon."
      },
      {
        stepNumber: 4,
        title: "Slow Mahogany Simmer",
        instruction: "Reduce heat to the lowest setting. Cover partially with a lid and let simmer gently for 3 to 3.5 hours, stirring every 20 minutes, until the sauce thickens into a deep mahogany red.",
        audioPrompt: "Reduce heat to low. Simmer partially covered for 3 to 3.5 hours, stirring occasionally until rich and deep red."
      },
      {
        stepNumber: 5,
        title: "Velvety Butter Finish",
        instruction: "Remove from heat. Stir in 1 tablespoon of cold butter and torn fresh basil leaves until melted and smooth. Serve over fresh fettuccine.",
        audioPrompt: "Stir in 1 tablespoon butter and fresh basil leaves until silky. Serve hot!"
      }
    ]
  },
  {
    id: 'kulfi-1985',
    title: "Grandma Rose's Saffron & Cardamom Pistachio Kulfi",
    recordedBy: "Grandma Rose Sharma",
    year: "1985",
    originCity: "Delhi, India",
    image: "/kulfi.jpg",
    prepTime: "20 mins",
    cookTime: "45 mins (+ 6 hrs freeze)",
    servings: 8,
    tags: ["Gluten-Free", "Vegetarian", "Traditional Dessert", "Make Ahead"],
    quote: "Kulfi cannot be rushed by gelatin or starch. Stir the milk with patience until it sings in golden bubbles.",
    audioTranscript: "Listen dear, authentic Indian kulfi is slow-reduced whole milk, not store-bought ice cream mix! Take two liters of full-cream milk in a heavy-bottomed kadai. Bring to a boil then simmer, stirring continuously so it doesn't scorch the bottom. Crushed cardamom pods—green ones only—and a generous pinch of Kashmiri saffron steeped in warm milk. Reduce the milk to one-third its original volume until thick as heavy cream. Stir in half a cup of raw sugar and finely chopped green pistachios. Pour into molds and freeze overnight.",
    gemmaDebug: {
      model: "Gemma 4-bit Open-Weight (Local Inference)",
      latency: "128ms",
      promptTokens: 412,
      vagueTermsResolved: [
        { term: "generous pinch of Kashmiri saffron", resolvedTo: "0.5g saffron threads" },
        { term: "reduce to one-third volume", resolvedTo: "Reduce 2L milk to 650ml" },
        { term: "sing in golden bubbles", resolvedTo: "Simmer at 195°F until coating wooden spoon" }
      ]
    },
    nutrition: {
      calories: 280,
      carbs: 32,
      protein: 7,
      fat: 15,
      fiber: 2
    },
    flavorProfile: [
      { aspect: 'Umami', score: 20 },
      { aspect: 'Sweetness', score: 88 },
      { aspect: 'Acidity', score: 10 },
      { aspect: 'Aroma', score: 98 },
      { aspect: 'Spice', score: 45 }
    ],
    ingredients: [
      { name: "Full Cream Whole Milk", metric: "2000ml", us: "8.5 cups", category: "Dairy" },
      { name: "Green Cardamom Pods (freshly crushed)", metric: "8 pods", us: "8 pods", category: "Spices" },
      { name: "Saffron Threads (steeped)", metric: "0.5g", us: "1 pinch", category: "Spices" },
      { name: "Unrefined Cane Sugar (Gur/Khandsari)", metric: "120g", us: "1/2 cup", category: "Pantry" },
      { name: "Raw Green Pistachios (chopped)", metric: "60g", us: "1/2 cup", category: "Nuts" },
      { name: "Blanched Almonds (slivers)", metric: "30g", us: "1/4 cup", category: "Nuts" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Infuse Saffron & Cardamom",
        instruction: "Steep saffron threads in 3 tablespoons of warm milk for 15 minutes. Crush green cardamom seeds finely using a mortar and pestle.",
        audioPrompt: "Steep saffron in warm milk for 15 minutes. Crush cardamom seeds."
      },
      {
        stepNumber: 2,
        title: "Slow Milk Reduction",
        instruction: "In a heavy wide pan, bring milk to a boil. Reduce heat to medium and simmer, stirring continuously and scraping the sides, until reduced to 1/3 volume (approx 40-45 mins).",
        audioPrompt: "Boil milk, then simmer stirring constantly until reduced to one-third volume."
      },
      {
        stepNumber: 3,
        title: "Add Aromatics & Nuts",
        instruction: "Stir in steeped saffron milk, crushed cardamom, sugar, chopped pistachios, and almonds. Cook for 5 more minutes until sugar dissolves.",
        audioPrompt: "Stir in saffron, cardamom, sugar, pistachios, and almonds. Cook 5 minutes."
      },
      {
        stepNumber: 4,
        title: "Mold & Deep Freeze",
        instruction: "Cool mixture to room temperature. Pour into traditional aluminum kulfi molds or Popsicle molds. Insert wooden sticks and freeze for at least 6 hours.",
        audioPrompt: "Cool mixture, pour into molds with sticks, and freeze for 6 hours."
      }
    ]
  },
  {
    id: 'ribs-1992',
    title: "Uncle Marco's Smoked Paprika Braised Short Ribs",
    recordedBy: "Uncle Marco Rossi",
    year: "1992",
    originCity: "Chicago, Illinois",
    image: "/ribs.jpg",
    prepTime: "30 mins",
    cookTime: "3 hrs 15 mins",
    servings: 4,
    tags: ["Dairy-Free Option", "High-Protein", "Comfort Food", "Cast Iron"],
    quote: "The crust is where the soul lives. Searing is non-negotiable before the red wine braise!",
    audioTranscript: "Hey nephew! Don't let anyone tell you short ribs need a fancy smoker. You just need a screaming hot cast iron pan and Spanish smoked paprika. Season bone-in beef short ribs with sea salt, coarse black pepper, and two tablespoons of sweet smoked paprika. Sear every single side until deeply browned—at least three minutes per side. Remove ribs, toss in chopped shallots, carrots, celery, and garlic. Deglaze with a full bottle of dry Cabernet Sauvignon. Put the ribs back, add beef stock and rosemary, cover tightly, and bake at 325°F for three hours until fork tender.",
    gemmaDebug: {
      model: "Gemma 4-bit Open-Weight (Local Inference)",
      latency: "156ms",
      promptTokens: 420,
      vagueTermsResolved: [
        { term: "screaming hot cast iron", resolvedTo: "Preheat pan to 425°F" },
        { term: "a full bottle of red wine", resolvedTo: "750ml dry Cabernet" },
        { term: "fork tender", resolvedTo: "Internal Temp 205°F" }
      ]
    },
    nutrition: {
      calories: 680,
      carbs: 12,
      protein: 52,
      fat: 42,
      fiber: 3
    },
    flavorProfile: [
      { aspect: 'Umami', score: 98 },
      { aspect: 'Sweetness', score: 25 },
      { aspect: 'Acidity', score: 60 },
      { aspect: 'Aroma', score: 92 },
      { aspect: 'Spice', score: 55 }
    ],
    ingredients: [
      { name: "Beef Short Ribs (Bone-In)", metric: "1400g", us: "3 lbs", category: "Meat" },
      { name: "Spanish Smoked Paprika (Pimentón)", metric: "20g", us: "2 tbsp", category: "Spices" },
      { name: "Dry Cabernet Sauvignon Wine", metric: "750ml", us: "1 bottle", category: "Pantry" },
      { name: "Rich Beef Bone Broth", metric: "500ml", us: "2 cups", category: "Pantry" },
      { name: "Whole Garlic Head (halved)", metric: "1 head", us: "1 head", category: "Produce" },
      { name: "Carrots & Celery (diced)", metric: "300g", us: "2 cups", category: "Produce" },
      { name: "Fresh Rosemary & Thyme", metric: "4 sprigs", us: "4 sprigs", category: "Produce" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Paprika Dry Rub & Sear",
        instruction: "Pat ribs completely dry. Rub generously with salt, coarse pepper, and smoked paprika. Sear in hot heavy cast iron for 3-4 mins per side until mahogany crust forms.",
        audioPrompt: "Pat ribs dry, rub with smoked paprika, salt, pepper. Sear on hot cast iron pan 3 minutes each side."
      },
      {
        stepNumber: 2,
        title: "Aromatics & Red Wine Deglaze",
        instruction: "Remove ribs. Sauté carrots, celery, and garlic head cut-side down. Pour in Cabernet Sauvignon, scraping up browned bits from the pan bottom. Reduce wine by half.",
        audioPrompt: "Sauté vegetables and garlic. Pour in red wine, scrape pan bottom, reduce wine by half."
      },
      {
        stepNumber: 3,
        title: "Low Oven Braise",
        instruction: "Return short ribs to pan. Add beef broth and rosemary. Cover tightly with lid or foil. Bake in oven at 325°F (165°C) for 3 hours until meat slips off the bone.",
        audioPrompt: "Add beef broth, return ribs, cover tightly and bake at 325°F for 3 hours."
      }
    ]
  }
];
