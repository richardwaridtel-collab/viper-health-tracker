/* ==========================================================================
   Beyond Fitness Tracker — Plan Data
   Source: Train With The Viper coaching plan (Coach Tasdid Hasan)
   ========================================================================== */

const PLAN = {
  coach: {
    name: "Tasdid Hasan",
    title: "Certified Physique Transformation Coach · Contest Prep Coach · S.M.A.R.T Certified Trainer",
    email: "tasdid50@gmail.com",
    disclaimer:
      "Please consult your physician before engaging in any dietary or workout regimen. Train With The Viper and its affiliates are not responsible for any pre-existing health condition or the result of a health condition due to the commencement of any dietary or workout regimen. This plan is confidential and made specifically for you — do not share it with anyone.",
  },

  // ------------------------------------------------------------------ DIET
  diet: {
    morningDrink: {
      title: "Early Morning Drink",
      subtitle: "Every day, immediately after waking up",
      items: [
        "500ml water + 1/2 lemon",
        "2 tbsp organic apple cider vinegar",
        "10g glutamine",
        "1 probiotic tablet",
      ],
    },
    note: "1 scoop whey = 8 egg whites (substitution note from coach)",
    // Calories/macros are reasonable estimates for generic ingredients (USDA-style
    // per-100g references), not brand-verified values — actual whey/EAA/carb powder
    // products vary. Good enough for a rough daily macro picture, not a lab report.
    meals: {
      1: {
        name: "Meal 1",
        A: [
          { text: "Whole egg x2", kcal: 144, protein: 12.6, carbs: 0.8, fat: 9.6 },
          { text: "Oats 35g", kcal: 133, protein: 4.7, carbs: 23.5, fat: 2.3 },
          { text: "Whey 1 scoop", kcal: 120, protein: 24, carbs: 3, fat: 1.5, wheyScoop: true },
          { text: "Banana 1", kcal: 105, protein: 1.3, carbs: 27, fat: 0.4 },
        ],
        B: [
          { text: "Whole egg x3", kcal: 216, protein: 18.9, carbs: 1.2, fat: 14.4 },
          { text: "Egg white x5", kcal: 85, protein: 18, carbs: 1.2, fat: 0 },
        ],
      },
      2: {
        name: "Meal 2",
        A: [
          { text: "165g chicken breast / beef / fish (cooked weight)", kcal: 272, protein: 51.2, carbs: 0, fat: 5.9 },
          { text: "120g cooked rice (cooked weight)", kcal: 156, protein: 3.2, carbs: 33.6, fat: 0.4 },
          { text: "1 apple (red or green)", kcal: 95, protein: 0.5, carbs: 25, fat: 0.3 },
          { text: "Whole egg x1", kcal: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
          { text: "Green veg 70g", kcal: 24, protein: 2, carbs: 4.9, fat: 0.3 },
        ],
        B: [
          { text: "160g chicken breast / beef / fish (cooked weight)", kcal: 264, protein: 49.6, carbs: 0, fat: 5.8 },
          { text: "1 apple", kcal: 95, protein: 0.5, carbs: 25, fat: 0.3 },
          { text: "Green veg 70g", kcal: 24, protein: 2, carbs: 4.9, fat: 0.3 },
        ],
      },
      3: {
        name: "Meal 3",
        A: [
          { text: "170g chicken breast (cooked weight)", kcal: 280, protein: 52.7, carbs: 0, fat: 6.1 },
          { text: "Extra virgin olive oil — 1 tbsp", kcal: 124, protein: 0, carbs: 0, fat: 14 },
          { text: "Green veg 70g", kcal: 24, protein: 2, carbs: 4.9, fat: 0.3 },
          { text: "Protein shake (optional)", kcal: 120, protein: 24, carbs: 3, fat: 1.5, wheyScoop: true },
        ],
        B: [
          { text: "180g chicken / fish / beef", kcal: 297, protein: 55.8, carbs: 0, fat: 6.5 },
          { text: "Veg 100g", kcal: 28, protein: 2, carbs: 5.6, fat: 0.2 },
          { text: "1 tbsp olive oil on top", kcal: 124, protein: 0, carbs: 0, fat: 14 },
          { text: "Protein shake (optional)", kcal: 120, protein: 24, carbs: 3, fat: 1.5, wheyScoop: true },
        ],
        note: "You can mash potato with olive oil (not counted in calories above)",
      },
      4: {
        name: "Meal 4",
        subtitle: "Last meal — anytime you want",
        A: [
          { text: "180g chicken / fish / beef", kcal: 297, protein: 55.8, carbs: 0, fat: 6.5 },
          { text: "Olive oil — 5ml", kcal: 40, protein: 0, carbs: 0, fat: 4.5 },
          { text: "Green salad 70-100g", kcal: 13, protein: 1, carbs: 2.5, fat: 0.2 },
        ],
        B: [
          { text: "180g chicken / fish / beef", kcal: 297, protein: 55.8, carbs: 0, fat: 6.5 },
          { text: "Whole egg x2", kcal: 144, protein: 12.6, carbs: 0.8, fat: 9.6 },
          { text: "1 tbsp olive oil on top", kcal: 124, protein: 0, carbs: 0, fat: 14 },
        ],
      },
    },
    training: {
      preWorkout: {
        title: "Pre-Workout",
        subtitle: "45 minutes before workout — training days only",
        items: [
          { text: "1 scoop EAA", kcal: 15, protein: 3, carbs: 0, fat: 0 },
          { text: "15g carb powder (or 40g dates)", kcal: 57, protein: 0, carbs: 15, fat: 0 },
          { text: "Salt 2g", kcal: 0, protein: 0, carbs: 0, fat: 0 },
          { text: "3g L-citrulline", kcal: 0, protein: 0, carbs: 0, fat: 0 },
          { text: "5g L-arginine", kcal: 0, protein: 0, carbs: 0, fat: 0 },
        ],
      },
      intraWorkout: {
        title: "Intra-Workout",
        subtitle: "During workout — training days only",
        items: [
          { text: "1 scoop EAA", kcal: 15, protein: 3, carbs: 0, fat: 0 },
          { text: "20g carb powder (or dextrose)", kcal: 76, protein: 0, carbs: 20, fat: 0 },
          { text: "Salt 3g", kcal: 0, protein: 0, carbs: 0, fat: 0 },
        ],
      },
      postWorkout: {
        title: "Post-Workout Shake",
        subtitle: "Training days only",
        items: [
          { text: "1 scoop whey", kcal: 120, protein: 24, carbs: 3, fat: 1.5, wheyScoop: true },
          { text: "Banana 60g", kcal: 52, protein: 0.65, carbs: 13.5, fat: 0.2 },
        ],
      },
    },
    beforeBed: {
      title: "Before Bed",
      subtitle: "Every day, with night-time supplements",
      items: ["Glutamine — 2 teaspoons"],
    },
    eliminated: {
      title: "Eliminated Completely — Non-Negotiable",
      items: [
        "Fruit juices of any kind",
        "Sauces & dressings",
        "Ghee, butter, margarine",
        "Sugar & soft drinks (exception: 1 diet coke per day allowed)",
        "Chocolates (exception: one small piece of dark chocolate if you crave it)",
        "Candy, oriental sweets, etc.",
      ],
    },
    cookingAllowed: {
      title: "Allowed for Cooking / Marinating",
      items: [
        "Soy sauce and herbs: ginger, garlic, turmeric powder, cinnamon, black pepper",
        "Yoghurt — 50g max",
        "Olive oil or macadamia nut oil — ~20ml for daily cooking",
      ],
    },
  },

  // ------------------------------------------------------------- SUPPLEMENTS
  supplements: [
    {
      name: "Whey Protein",
      dosage: "Post-workout and mid-day, as per plan",
      timing: ["Post-Workout", "Midday"],
      brand: "Any brand of your choice and budget",
    },
    {
      name: "Multivitamin",
      dosage: "1 tab",
      timing: ["AM"],
      brand: "Any brand of your choice and budget",
    },
    {
      name: "Omega 3",
      dosage: "1 tab",
      timing: ["PM"],
      brand: "Any brand of your choice and budget",
    },
    {
      name: "Evening Primrose Oil",
      dosage: "2000mg",
      timing: ["PM"],
      brand: "Any brand",
    },
    {
      name: "Magnesium Glycinate",
      dosage: "400mg",
      timing: ["Before Bed"],
      brand: "Any brand",
    },
    {
      name: "Vitamin D + K2",
      dosage: "5000 IU (D3) + 100–200mcg (K2)",
      timing: ["Before Bed"],
      brand: "Any brand",
    },
    {
      name: "Vitamin C",
      dosage: "2000mg per day",
      timing: ["AM"],
      brand: "Any brand",
    },
    {
      name: "Vitamin E",
      dosage: "400 IU",
      timing: ["AM", "PM"],
      brand: "Any brand",
    },
    {
      name: "Citrus Bergamot",
      dosage: "As directed by coach",
      timing: ["AM", "PM"],
      brand: "Any brand",
      note: "Exact dose was unclear in the source plan — confirm with your coach.",
    },
    {
      name: "NAC",
      dosage: "600mg",
      timing: ["AM", "PM"],
      brand: "Any brand",
    },
    {
      name: "Berberine",
      dosage: "500mg before Meal 1 (morning), 500mg before last meal (night)",
      timing: ["AM", "PM"],
      brand: "Any brand",
    },
    {
      name: "Liver Support",
      dosage: "As directed by coach",
      timing: ["AM", "PM"],
      brand: "Any brand",
      note: "Exact dose was unclear in the source plan — confirm with your coach.",
    },
    {
      name: "Ashwagandha",
      dosage: "As directed by coach",
      timing: ["AM", "PM"],
      brand: "Any brand",
      note: "Exact dose was unclear in the source plan — confirm with your coach.",
    },
    {
      name: "DHEA",
      dosage: "As directed by coach",
      timing: ["AM", "PM"],
      brand: "Any brand",
      note: "Exact dose was unclear in the source plan — confirm with your coach.",
    },
  ],

  // ---------------------------------------------------------------- TRAINING
  split: [
    { day: 1, label: "Torso A", type: "training", workout: "torsoA", cardio: "35 min cardio" },
    { day: 2, label: "Limb A", type: "training", workout: "limbA", cardio: "35 min cardio" },
    { day: 3, label: "Torso B", type: "training", workout: "torsoB", cardio: "35 min cardio" },
    { day: 4, label: "Rest", type: "rest", workout: null, cardio: "45 min cardio + abs" },
    { day: 5, label: "Limb B", type: "training", workout: "limbB", cardio: "50 min cardio" },
    { day: 6, label: "Torso A", type: "training", workout: "torsoA", cardio: "50 min cardio" },
    { day: 7, label: "Rest", type: "rest", workout: null, cardio: "45 min cardio" },
  ],

  workouts: {
    torsoA: {
      name: "Torso A",
      exercises: [
        {
          muscle: "Chest",
          order: "A1",
          exercise: "Pec Dec Fly",
          sets: 3,
          reps: "15-20",
          notes: "Add 1 drop set at your last set (50% drop, hold squeeze position for 15 reps, then 15 reps).",
        },
        {
          muscle: "Chest",
          order: "B1",
          exercise: "Incline Smith Machine Press",
          sets: 3,
          reps: "8-10",
          notes: "Go heavy with good form, 3-4 sec lowering, explosive up. Stop immediately if you feel pain. Last set: triple drop set, 6-8 reps each drop.",
        },
        {
          muscle: "Side Delt / Lat",
          order: "C1",
          exercise: "DB Lateral Raise",
          sets: 5,
          reps: "20-15-12-10-8",
          notes: "Reverse drop set at the end — heavy to low.",
        },
        {
          muscle: "Lat",
          order: "D1",
          exercise: "Reverse Lat Pulldown",
          sets: 3,
          reps: "8-12",
          notes: "Go heavy with good form, 3-4 sec eccentric.",
          video: "https://www.youtube.com/watch?v=SNiwpA13ZLU",
        },
        {
          muscle: "Mid Back / Lat / Rear Delt",
          order: "E1",
          exercise: "Low Machine Row",
          sets: 3,
          reps: "6-10",
          notes: "Go heavy as you can.",
          video: "https://www.youtube.com/shorts/yFo-EFYzf1s",
        },
        {
          muscle: "Mid Back / Lat / Rear Delt",
          order: "F1",
          exercise: "Single Arm Cable Row",
          sets: 3,
          reps: "12-20",
          video: "https://www.youtube.com/watch?v=0pGi67ADMRg",
        },
        {
          muscle: "Mid Back / Lat / Rear Delt",
          order: "G1",
          exercise: "Rear Pec Deck",
          sets: 3,
          reps: "8-12",
          notes: "Add triple drop set, 10 reps each drop.",
        },
      ],
    },
    limbA: {
      name: "Limb A",
      exercises: [
        {
          muscle: "Tricep",
          order: "A1",
          exercise: "Straight Bar Pressdown",
          sets: 3,
          reps: "6-10",
          notes: "Add triple drop set, 10 reps each drop.",
        },
        {
          muscle: "Bicep",
          order: "A2",
          exercise: "DB Preacher Curl",
          sets: 3,
          reps: "8-12",
        },
        {
          muscle: "Tricep",
          order: "B1",
          exercise: "Single Arm Overhead Extension",
          sets: 3,
          reps: "6-10",
          notes: "Cable or DB.",
        },
        {
          muscle: "Bicep",
          order: "B2",
          exercise: "Machine Preacher Curl",
          sets: 3,
          reps: "8-12",
          notes: "1 drop set at the end, to failure.",
        },
        {
          muscle: "Hamstring",
          order: "C1",
          exercise: "Seated Ham Curl",
          sets: 3,
          reps: "8-12",
        },
        {
          muscle: "Quad",
          order: "D1",
          exercise: "Leg Press",
          sets: 3,
          reps: "8-12",
          notes: "Go heavy with good form, 3-4 sec eccentric. Last set: triple drop, 8 reps each drop.",
        },
        {
          muscle: "Adductor",
          order: "E1",
          exercise: "Adductor Machine",
          sets: 3,
          reps: "10-15",
        },
        {
          muscle: "Abs",
          order: "F1",
          exercise: "Rope Crunch",
          sets: 3,
          reps: "15",
        },
      ],
    },
    torsoB: {
      name: "Torso B",
      exercises: [
        {
          muscle: "Chest",
          order: "A1",
          exercise: "Machine Chest Press",
          sets: 3,
          reps: "8-12",
          notes: "Go heavy with good form, 3-4 sec eccentric. Last set: triple drop, 8 reps each drop.",
        },
        {
          muscle: "Chest / Mid Back / Lat",
          order: "B1",
          exercise: "Cable Fly",
          sets: 3,
          reps: "10-15",
          notes: "Align cables with mid line.",
          video: "https://www.youtube.com/shorts/3oDD2JPrpaA",
        },
        {
          muscle: "Chest / Mid Back / Lat",
          order: "C1",
          exercise: "Chest-Supported T-Bar Row",
          sets: 3,
          reps: "8-12",
        },
        {
          muscle: "Chest / Mid Back / Lat",
          order: "D1",
          exercise: "Reverse Pulldown (Back Machine)",
          sets: 3,
          reps: "8-12",
          notes: "Focus on driving elbows straight down.",
          video: "https://www.youtube.com/watch?v=SNiwpA13ZLU",
        },
        {
          muscle: "Side Delt / Rear Delt / Lower Back",
          order: "E1",
          exercise: "Cable Y-Raise",
          sets: 4,
          reps: "10-15",
          video: "https://www.youtube.com/watch?v=R_n-b6XAUSU",
        },
        {
          muscle: "Side Delt / Rear Delt / Lower Back",
          order: "F1",
          exercise: "Cable Face Pulls",
          sets: 3,
          reps: "10-15",
        },
        {
          muscle: "Side Delt / Rear Delt / Lower Back",
          order: "G1",
          exercise: "Hyperextension",
          sets: 3,
          reps: "15",
        },
        {
          muscle: "Abs",
          order: "F1",
          exercise: "Vertical Leg Raises",
          sets: 3,
          reps: "15",
        },
      ],
    },
    limbB: {
      name: "Limb B",
      exercises: [
        {
          muscle: "Bicep",
          order: "A1",
          exercise: "Incline DB Curl",
          sets: 3,
          reps: "8-12",
          notes: "Focus on the stretched position.",
        },
        {
          muscle: "Tricep",
          order: "A2",
          exercise: "Cable Pushdown (Rope)",
          sets: 3,
          reps: "10-15",
          notes: "Lock elbows by sides.",
        },
        {
          muscle: "Bicep",
          order: "B1",
          exercise: "Cable Lat Pull Curl",
          sets: 3,
          reps: "8-12",
        },
        {
          muscle: "Tricep",
          order: "B2",
          exercise: "JM Press or Dip Machine",
          sets: 3,
          reps: "6-10",
          notes: "Heavy load.",
        },
        {
          muscle: "Hamstring / Quad / Calves / Abs",
          order: "C1",
          exercise: "Stiff Leg Deadlift",
          sets: 3,
          reps: "8-10",
          notes: "Barbell, DB, or Smith machine.",
          video: "https://www.youtube.com/shorts/q3mVYFBaLq4",
        },
        {
          muscle: "Hamstring / Quad / Calves / Abs",
          order: "D1",
          exercise: "Squats",
          sets: 3,
          reps: "12-10-8",
          notes: "Wide stance.",
        },
        {
          muscle: "Hamstring / Quad / Calves / Abs",
          order: "E1",
          exercise: "Standing Calf Raise",
          sets: 4,
          reps: "10-15",
          notes: "Pause at the bottom stretch.",
        },
        {
          muscle: "Hamstring / Quad / Calves / Abs",
          order: "F1",
          exercise: "Rope Crunch",
          sets: 3,
          reps: "15",
        },
      ],
    },
  },
};
