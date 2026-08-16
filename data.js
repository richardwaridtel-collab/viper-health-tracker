/* ==========================================================================
   Beyond Fitness Tracker — Plan Data
   Source: Train With The Viper coaching plan (Coach Tasdid Hasan)
   Diet updated Aug 16, 2026 (post-workout shake, pre-workout EAA dose,
   morning drink, and Omega 3 / Multivitamin dosing). Workout split
   unchanged. PED protocol (added Aug 3, 2026) untouched.
   ========================================================================== */

const PLAN = {
  coach: {
    name: "Tasdid Hasan",
    title: "Certified Physique Transformation Coach · Contest Prep Coach · S.M.A.R.T Certified Trainer",
    email: "tasdid50@gmail.com",
    disclaimer:
      "Please consult your physician before engaging in any dietary or workout regimen, and especially before using any performance-enhancing substances — a fitness coach is not a substitute for medical supervision (bloodwork, monitoring) on the PED protocol below. Train With The Viper and its affiliates are not responsible for any pre-existing health condition or the result of a health condition due to the commencement of any dietary, workout, or supplement/PED regimen. This plan is confidential and made specifically for you — do not share it with anyone.",
  },

  // ------------------------------------------------------------------ DIET
  // Calories/macros are reasonable estimates for generic ingredients (USDA-style
  // per-100g references), not brand-verified values — actual products vary.
  // Good enough for a rough daily macro picture, not a lab report.
  diet: {
    morningDrink: {
      title: "Early Morning Drink",
      subtitle: "Every day, immediately after waking up",
      items: [
        "500ml water + 1/2 lemon",
        "2 tbsp organic apple cider vinegar",
        "10g glutamine",
        "1 probiotic tablet",
        "Isabgol (psyllium husk) — 2 teaspoons",
      ],
    },
    note: "Each meal below has two interchangeable options — pick whichever you're eating that day.",
    meals: {
      1: {
        name: "Meal 1",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "Whole eggs x2", kcal: 144, protein: 12.6, carbs: 0.8, fat: 9.6 },
              { text: "Whey 1 scoop", kcal: 120, protein: 24, carbs: 3, fat: 1.5, wheyScoop: true },
              { text: "Oats 50g", kcal: 190, protein: 6.8, carbs: 33.5, fat: 3.3 },
              { text: "Apple 1", kcal: 95, protein: 0.5, carbs: 25, fat: 0.3 },
              "Take AM Multivitamin + Omega 3 (tracked in Supplements tab)",
            ],
          },
          {
            label: "Option 2",
            items: [
              { text: "Whole eggs x3", kcal: 216, protein: 18.9, carbs: 1.2, fat: 14.4 },
              { text: "White bread — 2 slices", kcal: 133, protein: 4.5, carbs: 24.5, fat: 1.6 },
              { text: "Apple 1", kcal: 95, protein: 0.5, carbs: 25, fat: 0.3 },
            ],
          },
        ],
      },
      2: {
        name: "Meal 2",
        note: "No carrots / no capsicum / no tomato",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "150g chicken / fish (cooked weight)", kcal: 248, protein: 46.5, carbs: 0, fat: 5.4 },
              { text: "130g cooked white rice", kcal: 169, protein: 3.5, carbs: 36.4, fat: 0.4 },
              { text: "Cooked seasonal vegetables (deshi veg)", kcal: 24, protein: 2, carbs: 4.9, fat: 0.3 },
            ],
          },
          {
            label: "Option 2",
            items: [
              { text: "150g lean beef", kcal: 281, protein: 39, carbs: 0, fat: 12 },
              { text: "200g potato, cooked", kcal: 174, protein: 4, carbs: 40, fat: 0.2 },
              { text: "Cooked vegetables of choice", kcal: 24, protein: 2, carbs: 4.9, fat: 0.3 },
            ],
          },
        ],
      },
      3: {
        name: "Meal 3",
        note: "No carrots / no capsicum / no tomato",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "Chicken sandwich — 150g chicken breast + 2 toast + mustard & herbs", kcal: 380, protein: 51, carbs: 24.5, fat: 7 },
              { text: "Cucumber", kcal: 15, protein: 0.6, carbs: 3.6, fat: 0.1 },
            ],
          },
          {
            label: "Option 2",
            items: [
              { text: "150g chicken breast (cooked weight)", kcal: 248, protein: 46.5, carbs: 0, fat: 5.4 },
              { text: "130g cooked white rice", kcal: 169, protein: 3.5, carbs: 36.4, fat: 0.4 },
              { text: "2 cucumbers (salt + lemon)", kcal: 30, protein: 1.2, carbs: 7.2, fat: 0.2 },
            ],
          },
        ],
      },
      4: {
        name: "Meal 4",
        subtitle: "Last meal — anytime you want",
        note: "No carrots / no capsicum / no tomato",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "160g chicken breast", kcal: 264, protein: 49.6, carbs: 0, fat: 5.8 },
              { text: "Salad — lettuce, parsley, onion, cucumber", kcal: 20, protein: 1.5, carbs: 4, fat: 0.2 },
              { text: "Salt + 1 tbsp vinegar + 1 tsp olive oil", kcal: 43, protein: 0, carbs: 0, fat: 4.5 },
            ],
          },
          {
            label: "Option 2",
            items: [
              { text: "1 can tuna", kcal: 162, protein: 36.4, carbs: 0, fat: 1.4 },
              { text: "150g air-fried potatoes", kcal: 180, protein: 3, carbs: 39, fat: 0.3 },
              { text: "Salad + salt + 1 tbsp vinegar + 1 tsp olive oil", kcal: 60, protein: 1.5, carbs: 4, fat: 4.7 },
            ],
          },
        ],
      },
    },
    comfortFood: {
      title: "Comfort Food Allowance",
      subtitle: "Through the day, to suppress appetite if you need to",
      items: [
        { text: "Dark chocolate (Lindt, 75% cocoa) — 2 squares", kcal: 119, protein: 1.6, carbs: 9.2, fat: 26.5 },
      ],
    },
    training: {
      preWorkout: {
        title: "Pre-Workout",
        subtitle: "45 minutes before workout — training days only",
        items: [
          { text: "1/2 scoop EAA", kcal: 8, protein: 1.5, carbs: 0, fat: 0 },
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
          { text: "1 scoop whey isolate", kcal: 120, protein: 24, carbs: 3, fat: 1.5, wheyScoop: true },
          { text: "45g oats", kcal: 171, protein: 6.1, carbs: 30.2, fat: 3 },
          { text: "2 tbsp honey", kcal: 128, protein: 0, carbs: 34.6, fat: 0 },
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
        "Chocolates (exception: comfort-food dark chocolate allowance above)",
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
      timing: ["AM", "PM"],
      brand: "Any brand of your choice and budget",
    },
    {
      name: "Omega 3",
      dosage: "2 tabs with breakfast, 1 tab with dinner",
      timing: ["AM", "PM"],
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

  // -------------------------------------------------------------------- PED
  // Tracking only — not medical advice. See disclaimer above: get bloodwork
  // and medical monitoring for anything in this section.
  peds: {
    title: "PED Protocol",
    subtitle: "4-week cycle, starting Aug 3, 2026 — adherence tracking only",
    items: [
      { name: "Testosterone", dosage: "250mg, 2x per week" },
      { name: "Primobolan", dosage: "100mg, 2x per week" },
      { name: "Anavar (Oxandrolone)", dosage: "30mg — training days only, 4 weeks only" },
    ],
  },

  // ---------------------------------------------------------------- TRAINING
  split: [
    { day: 1, label: "Legs", type: "training", workout: "legs", cardio: "30 min low-intensity treadmill walk" },
    { day: 2, label: "Chest & Tricep", type: "training", workout: "chestTricep", cardio: "30 min low-intensity treadmill walk" },
    { day: 3, label: "Side Delt, Abs & Cardio", type: "training", workout: "sideDeltAbs", cardio: "30 min low-intensity treadmill walk" },
    { day: 4, label: "Back & Bicep", type: "training", workout: "backBicep", cardio: "30 min low-intensity treadmill walk" },
    { day: 5, label: "Shoulder & Tricep", type: "training", workout: "shoulderTricep", cardio: "30 min low-intensity treadmill walk" },
    { day: 6, label: "Arms", type: "training", workout: "arms", cardio: "30 min low-intensity treadmill walk" },
    { day: 7, label: "Rest", type: "rest", workout: null, cardio: "30 min low-intensity treadmill walk" },
  ],

  workouts: {
    legs: {
      name: "Legs",
      exercises: [
        { muscle: "Quad", order: "1", exercise: "Leg Extensions", sets: 4, reps: "12-15" },
        {
          muscle: "Quad", order: "2", exercise: "Hack Squat", sets: 4, reps: "15-12-10-8",
          notes: "Last set: triple drop set, 8 reps each drop.",
        },
        {
          muscle: "Quad", order: "3", exercise: "Leg Press", sets: 4, reps: "30 (15 wide stance + 15 close stance)",
          notes: "Lighter weight for high reps.",
        },
        { muscle: "Adductor", order: "4", exercise: "Adductor Inner Thigh Machine", sets: 3, reps: "15-20" },
        { muscle: "Hamstring", order: "5", exercise: "Leg Curls", sets: 3, reps: "12-15" },
        {
          muscle: "Hamstring", order: "6", exercise: "Seated Leg Curls", sets: 3, reps: "12-15",
          notes: "Each rep: hold 3 sec in the controlled position.",
        },
        { muscle: "Calves", order: "7", exercise: "Standing Calf Raises", sets: 4, reps: "15-20" },
      ],
    },
    chestTricep: {
      name: "Chest & Tricep",
      exercises: [
        {
          muscle: "Chest", order: "1", exercise: "Smith Machine Incline Chest Press", sets: 4, reps: "Warm-up 15, Working 8-10",
          notes: "2 warm-up sets, 2 heavy working sets.",
        },
        {
          muscle: "Chest", order: "2", exercise: "Incline Dumbbell Flies + Pec Dec Flies", sets: 3, reps: "15-12-10",
          notes: "This is a superset.",
        },
        {
          muscle: "Chest", order: "3", exercise: "Incline Dumbbell Press", sets: 3, reps: "12-10-8",
          notes: "If you fail before reaching 8 reps, drop the weight and continue at a lower weight to complete the 8 reps from where you left off.",
        },
        { muscle: "Chest", order: "4", exercise: "Cable Cross + Push Up", sets: 2, reps: "15-12" },
        {
          muscle: "Tricep", order: "5", exercise: "Triceps Rope Pressdown", sets: 4, reps: "See video for rep guidance",
          notes: "Watch the video (\"Tricep Growth Secrets\").",
        },
        { muscle: "Tricep", order: "6", exercise: "Overhead Rope Extensions", sets: 3, reps: "10-12" },
        {
          muscle: "Tricep", order: "7", exercise: "1-Arm Reverse Pressdown", sets: 3, reps: "10-12",
          video: "https://www.youtube.com/shorts/qmsLLmtk47A",
        },
      ],
    },
    sideDeltAbs: {
      name: "Side Delt + Abs + Cardio",
      exercises: [
        {
          muscle: "Side Delt", order: "1", exercise: "Seated Dumbbell Side Raises", sets: 3, reps: "20-15-12",
          notes: "After completing 12 reps, rest 1 minute, then perform a reverse drop set: 12, 15, then 20 reps.",
        },
        {
          muscle: "Side Delt", order: "2", exercise: "Cable Side Raises", sets: 3, reps: "15-12-10",
          notes: "Last set: triple drop set, 8 reps each drop.",
        },
        {
          muscle: "Side Delt", order: "3", exercise: "1-Arm Dumbbell Side Raises", sets: 2, reps: "30 each arm",
          notes: "Lighter weight for high reps.",
        },
        { muscle: "Abs", order: "4", exercise: "Rope Crunches", sets: 3, reps: "20", notes: "Squeeze properly." },
        { muscle: "Abs", order: "5", exercise: "Vertical Knee Raises", sets: 3, reps: "15", notes: "Bend your knees slightly." },
        {
          muscle: "Abs", order: "6", exercise: "Plank", sets: 3, reps: "1 min",
          notes: "Hold in a controlled position.",
        },
      ],
    },
    backBicep: {
      name: "Back & Bicep",
      exercises: [
        {
          muscle: "Back", order: "1", exercise: "Lat Pulldown", sets: 4, reps: "Warm-up 15, Working 10-12",
          notes: "2 warm-up sets, 2 working sets.",
        },
        {
          muscle: "Back", order: "2", exercise: "Seated Cable Row", sets: 3, reps: "Pyramid 8-12",
          notes: "Last set: triple drop set, 8 reps each drop.",
        },
        {
          muscle: "Back", order: "3", exercise: "Chest-Supported Dumbbell Rows", sets: 3, reps: "15-10",
          video: "https://www.youtube.com/watch?v=vO5wdWUUPek&list=PLWKDvn-ycDHEtaCQbgEkpasXEhnlH1EJT",
        },
        {
          muscle: "Back", order: "4", exercise: "1-Arm Lat Pulldowns", sets: 3, reps: "20",
          notes: "Full stretch, full squeeze.",
        },
        { muscle: "Back", order: "5", exercise: "V-Grip Pulldowns", sets: 3, reps: "10-12" },
        { muscle: "Back", order: "6", exercise: "Shrugs with Dumbbell", sets: 3, reps: "12-15" },
        {
          muscle: "Bicep", order: "7", exercise: "Cable EZ Curls", sets: 3, reps: "10-12",
          notes: "Last set: triple drop set, 8 reps each drop.",
        },
        { muscle: "Bicep", order: "8", exercise: "Seated Dumbbell Alternating Curls", sets: 3, reps: "10-12 per arm" },
        {
          muscle: "Bicep", order: "9", exercise: "ISO Hold Hammer Curl", sets: 3, reps: "—",
          video: "https://www.youtube.com/watch?v=c8fEgTPIXAU&list=PLWKDvn-ycDHEtaCQbgEkpasXEhnlH1EJT&index=2",
        },
      ],
    },
    shoulderTricep: {
      name: "Shoulder & Tricep",
      exercises: [
        { muscle: "Shoulder", order: "1", exercise: "Reverse Pec Dec Fly", sets: 4, reps: "15-15-12-10" },
        {
          muscle: "Shoulder", order: "2", exercise: "Machine Side Laterals (or DB Lateral Raises)", sets: 4, reps: "12-15, 15-12-10",
          notes: "Increase weight each set.",
        },
        {
          muscle: "Shoulder", order: "3", exercise: "Dumbbell Shoulder Press", sets: 3, reps: "15-12-10",
          notes: "Last set: 2 drop sets — watch the video.",
          video: "https://www.youtube.com/watch?v=22NUu_moSMo",
        },
        { muscle: "Shoulder", order: "4", exercise: "Front Shoulder Raises with Bar", sets: 3, reps: "12-15, 10-12" },
        { muscle: "Tricep", order: "5", exercise: "Triceps Rope Extension", sets: 3, reps: "10-12" },
        { muscle: "Tricep", order: "6", exercise: "Straight Bar Push Down", sets: 3, reps: "10-12" },
        { muscle: "Tricep", order: "7", exercise: "Single Arm Overhead Dumbbell Extension", sets: 3, reps: "10-12 per arm" },
      ],
    },
    arms: {
      name: "Arms",
      exercises: [
        {
          muscle: "Bicep / Tricep", order: "1", exercise: "EZ Bar Cable Curl + Tricep Bar Pressdown", sets: 4, reps: "15-15-12-10",
          notes: "Superset.",
        },
        {
          muscle: "Bicep / Tricep", order: "2", exercise: "45° Incline Bench Hammer Curl + Skull Crusher", sets: 4, reps: "12-15",
          notes: "Superset.",
        },
        {
          muscle: "Bicep / Tricep", order: "3", exercise: "Machine Preacher Curl + Machine Dips", sets: 3, reps: "12-15 / 10-12",
          notes: "Superset.",
        },
        {
          muscle: "Bicep / Tricep", order: "4", exercise: "Single Arm Overhead Dumbbell Extension + Concentration Curl", sets: 3, reps: "10-12 per arm",
          notes: "Superset.",
        },
        { muscle: "Forearm", order: "5", exercise: "Cable Wrist Curl", sets: 3, reps: "20" },
      ],
    },
  },
};
