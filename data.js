/* ==========================================================================
   Beyond Fitness Tracker — Plan Data
   Source: Train With The Viper coaching plan (Coach Tasdid Hasan)
   Supplements/PED protocol: Aug 3, 2026.
   Diet (No-Carb Plan B), 5-day training split and daily cardio: Nov 8, 2026.
   ========================================================================== */

const DAILY_CARDIO = "45 min treadmill walk · 3–5% incline · 4.5–5.5 km/h";

const PLAN = {
  // Bump this when the plan changes shape: today's log is rebuilt once to match.
  version: "2026-11-08",
  coach: {
    name: "Tasdid Hasan",
    title: "Certified Physique Transformation Coach · Contest Prep Coach · S.M.A.R.T Certified Trainer",
    email: "tasdid50@gmail.com",
    disclaimer:
      "Please consult your physician before engaging in any dietary or workout regimen, and especially before using any performance-enhancing substances — a fitness coach is not a substitute for medical supervision (bloodwork, monitoring) on the PED protocol below. Train With The Viper and its affiliates are not responsible for any pre-existing health condition or the result of a health condition due to the commencement of any dietary, workout, or supplement/PED regimen. This plan is confidential and made specifically for you — do not share it with anyone.",
  },

  // ------------------------------------------------------------------ DIET
  // No-Carb Diet — Plan B (Nov 8, 2026). Calories/macros are reasonable estimates
  // for generic ingredients (USDA-style per-100g references), not brand-verified
  // values — actual products vary. Good enough for a rough daily macro picture,
  // not a lab report.
  diet: {
    title: "No-Carb Diet — Plan B",
    note: "Highly bioavailable protein, essential fats, and micronutrient-dense volume foods.",
    proteinTarget: { min: 185, max: 195 },
    meals: {
      1: {
        name: "Meal 1",
        subtitle: "Breakfast",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "Whole eggs x2", kcal: 144, protein: 12.6, carbs: 0.8, fat: 9.6 },
              { text: "Egg whites x4", kcal: 68, protein: 14.4, carbs: 1, fat: 0 },
              { text: "1 large cucumber", kcal: 45, protein: 2, carbs: 10.9, fat: 0.3 },
              "Take Multivitamin + Omega 3 (tracked in Supplements tab)",
            ],
          },
        ],
      },
      2: {
        name: "Meal 2",
        subtitle: "Mid-morning",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "160g chicken breast (cooked weight)", kcal: 264, protein: 49.6, carbs: 0, fat: 5.8 },
              { text: "1–2 cups cooked deshi seasonal vegetables", kcal: 56, protein: 2.7, carbs: 11, fat: 0.4 },
              { text: "Extra virgin olive oil — 1 tbsp", kcal: 124, protein: 0, carbs: 0, fat: 14 },
            ],
          },
        ],
      },
      3: {
        name: "Meal 3",
        subtitle: "Pre-workout meal — 60–90 min before training",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "160g chicken breast", kcal: 264, protein: 49.6, carbs: 0, fat: 5.8 },
              { text: "2 cucumbers, sliced, with fresh lemon juice + pink/sea salt", kcal: 60, protein: 2.6, carbs: 14.4, fat: 0.4 },
            ],
          },
        ],
      },
      4: {
        name: "Meal 4",
        subtitle: "Dinner / post-workout solid meal",
        options: [
          {
            label: "Option 1",
            items: [
              { text: "160g lean beef", kcal: 250, protein: 36, carbs: 0, fat: 10 },
              { text: "1 large cucumber", kcal: 45, protein: 2, carbs: 10.9, fat: 0.3 },
            ],
          },
        ],
      },
    },
    training: {
      preWorkout: {
        title: "Pre-Workout Hydration",
        subtitle: "15–30 min before training — training days only",
        items: [
          { text: "Electrolyte drink: 1/4 tsp salt dissolved in 500ml water", kcal: 0, protein: 0, carbs: 0, fat: 0 },
        ],
      },
      postWorkout: {
        title: "Post-Workout Shake",
        subtitle: "Training days only",
        items: [
          { text: "1 scoop whey isolate (mixed with water)", kcal: 120, protein: 24, carbs: 3, fat: 1.5, wheyScoop: true },
          { text: "Almonds or walnuts 15g", kcal: 87, protein: 3.2, carbs: 3.3, fat: 7.5 },
        ],
      },
    },
    hydration: {
      title: "Hydration & Sodium",
      subtitle: "Every day",
      items: [
        "3.5–4.5 liters of total fluid today",
        "Meals salted generously with sea / pink salt",
      ],
    },
    rules: {
      title: "Dietary Rules & Adjustments",
      sections: [
        {
          heading: "Scale weight tracking & adjustments",
          items: [
            "Record body weight once per week under morning fasting conditions (immediately after waking and using the bathroom).",
            "If weight drops below 80 kg: add 1 tsp of extra virgin olive oil or 10g of almonds to the daily intake to increase calories without spiking insulin.",
            "If weight rises above 81 kg without fat loss: remove 1 tsp of extra virgin olive oil from Meal 2.",
          ],
        },
        {
          heading: "Sodium & hydration protocol",
          items: [
            "Target 3.5–4.5 liters of total fluid intake daily.",
            "Salt meals generously with quality sea salt or pink salt. High sodium retention is critical under low-carb conditions to preserve extracellular fluid volume, maintain blood volume, and ensure muscular performance.",
          ],
        },
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
  // 5-Day Body Recomposition Split (Nov 8, 2026) followed by 2 rest days.
  // Daily 45-min treadmill walk is tracked every day, rest days included.
  split: [
    { day: 1, label: "Chest & Triceps", type: "training", workout: "chestTriceps", cardio: DAILY_CARDIO },
    { day: 2, label: "Back & Biceps", type: "training", workout: "backBiceps", cardio: DAILY_CARDIO },
    { day: 3, label: "Legs & Core", type: "training", workout: "legsCore", cardio: DAILY_CARDIO },
    { day: 4, label: "Shoulders & Traps", type: "training", workout: "shouldersTraps", cardio: DAILY_CARDIO },
    { day: 5, label: "Posterior Chain", type: "training", workout: "posteriorChain", cardio: DAILY_CARDIO },
    { day: 6, label: "Rest", type: "rest", workout: null, cardio: DAILY_CARDIO },
    { day: 7, label: "Rest", type: "rest", workout: null, cardio: DAILY_CARDIO },
  ],

  guidelines: {
    tempo: "Tempo = Eccentric – Pause at Stretch – Concentric – Pause at Contraction, in seconds (e.g. 3-1-1-0).",
    progression: [
      "Double progression: reach the top of the rep range on every working set before increasing the load.",
      "Once the top rep count is hit cleanly on all sets, increase the working weight by 2.5%–5% next session.",
      "Target RPE 8–9 on primary compounds (1–2 reps in reserve). Technical failure only on isolation movements.",
    ],
    cardio: [
      "45 minutes of treadmill walking every day.",
      "Incline 3–5% at a moderate pace (about 4.5–5.5 km/h).",
      "Purpose: sustained fatty-acid mobilization and oxidation while avoiding neurological fatigue, preserving recovery for heavy lifting.",
    ],
  },

  workouts: {
    chestTriceps: {
      name: "Chest & Triceps",
      exercises: [
        { muscle: "Chest", order: "1", exercise: "Barbell Bench Press", sets: 4, reps: "6–8", rest: "2.5–3 min", restSec: 165, tempo: "3-1-1-0" },
        { muscle: "Chest", order: "2", exercise: "Incline Dumbbell Press", sets: 3, reps: "8–10", rest: "2 min", restSec: 120, tempo: "2-0-1-1" },
        { muscle: "Chest", order: "3", exercise: "Weighted Dips or Machine Chest Press", sets: 3, reps: "8–12", rest: "90 sec", restSec: 90, tempo: "2-0-1-0" },
        { muscle: "Chest", order: "4", exercise: "Cable Crossovers (Mid-Chest)", sets: 3, reps: "12–15", rest: "60 sec", restSec: 60, tempo: "2-1-1-1" },
        { muscle: "Tricep", order: "5", exercise: "Overhead Cable Triceps Extension", sets: 3, reps: "10–12", rest: "60 sec", restSec: 60, tempo: "2-0-1-1" },
        { muscle: "Tricep", order: "6", exercise: "Triceps Rope Pushdowns", sets: 3, reps: "12–15", rest: "45 sec", restSec: 45, tempo: "2-0-1-2" },
      ],
    },
    backBiceps: {
      name: "Back & Biceps",
      exercises: [
        { muscle: "Back", order: "1", exercise: "Weighted Pull-Ups or Lat Pulldowns", sets: 4, reps: "6–8", rest: "2.5 min", restSec: 150, tempo: "3-0-1-0" },
        { muscle: "Back", order: "2", exercise: "Bent-Over Barbell Rows", sets: 4, reps: "8–10", rest: "2 min", restSec: 120, tempo: "2-1-1-0" },
        { muscle: "Back", order: "3", exercise: "Seated Cable Rows (Neutral Grip)", sets: 3, reps: "10–12", rest: "90 sec", restSec: 90, tempo: "2-1-1-1" },
        { muscle: "Back", order: "4", exercise: "Single-Arm Dumbbell Row", sets: 3, reps: "10–12", rest: "90 sec", restSec: 90, tempo: "2-0-1-1" },
        { muscle: "Bicep", order: "5", exercise: "Barbell Bicep Curls", sets: 3, reps: "8–10", rest: "60 sec", restSec: 60, tempo: "2-0-1-1" },
        { muscle: "Bicep", order: "6", exercise: "Incline Dumbbell Hammer Curls", sets: 3, reps: "12–15", rest: "45 sec", restSec: 45, tempo: "2-0-1-1" },
      ],
    },
    legsCore: {
      name: "Legs (Quad-Dominant) & Core",
      exercises: [
        { muscle: "Quad", order: "1", exercise: "Barbell Back Squats or Leg Press", sets: 4, reps: "6–8", rest: "3 min", restSec: 180, tempo: "3-0-1-0" },
        { muscle: "Quad", order: "2", exercise: "Bulgarian Split Squats (per leg)", sets: 3, reps: "10–12", rest: "90 sec", restSec: 90, tempo: "2-1-1-0" },
        { muscle: "Quad", order: "3", exercise: "Leg Extensions", sets: 3, reps: "12–15", rest: "60 sec", restSec: 60, tempo: "2-0-1-2" },
        { muscle: "Calves", order: "4", exercise: "Standing Calf Raises", sets: 4, reps: "12–15", rest: "60 sec", restSec: 60, tempo: "2-1-1-2" },
        { muscle: "Core", order: "5", exercise: "Weighted Cable Crunches", sets: 3, reps: "15–20", rest: "45 sec", restSec: 45, tempo: "2-1-1-1" },
        { muscle: "Core", order: "6", exercise: "Plank Hold (Weighted)", sets: 3, reps: "45–60 sec", rest: "45 sec", restSec: 45, tempo: "Isometric" },
      ],
    },
    shouldersTraps: {
      name: "Shoulders & Traps",
      exercises: [
        { muscle: "Shoulder", order: "1", exercise: "Seated Dumbbell Overhead Press", sets: 4, reps: "6–8", rest: "2.5 min", restSec: 150, tempo: "2-0-1-0" },
        { muscle: "Shoulder", order: "2", exercise: "Cable Lateral Raises", sets: 4, reps: "12–15", rest: "60 sec", restSec: 60, tempo: "2-0-1-1" },
        { muscle: "Shoulder", order: "3", exercise: "Dumbbell Front Raises", sets: 3, reps: "10–12", rest: "60 sec", restSec: 60, tempo: "2-0-1-1" },
        { muscle: "Rear Delt", order: "4", exercise: "Reverse Pec Deck Flyes (Rear Delts)", sets: 4, reps: "12–15", rest: "60 sec", restSec: 60, tempo: "2-1-1-1" },
        { muscle: "Traps", order: "5", exercise: "Barbell or Dumbbell Shrugs", sets: 3, reps: "10–12", rest: "60 sec", restSec: 60, tempo: "2-1-1-1" },
      ],
    },
    posteriorChain: {
      name: "Posterior Chain",
      exercises: [
        { muscle: "Hamstring / Lower Back", order: "1", exercise: "Romanian Deadlifts (RDLs)", sets: 4, reps: "8–10", rest: "2.5 min", restSec: 150, tempo: "3-1-1-0" },
        { muscle: "Hamstring", order: "2", exercise: "Seated Leg Curls", sets: 3, reps: "10–12", rest: "90 sec", restSec: 90, tempo: "2-0-1-1" },
        { muscle: "Glutes", order: "3", exercise: "Barbell Hip Thrusts", sets: 3, reps: "10–12", rest: "90 sec", restSec: 90, tempo: "2-1-1-1" },
        { muscle: "Lower Back", order: "4", exercise: "Back Extensions (Hyperextensions)", sets: 3, reps: "12–15", rest: "60 sec", restSec: 60, tempo: "2-1-1-1" },
        { muscle: "Calves", order: "5", exercise: "Seated Calf Raises", sets: 4, reps: "15–20", rest: "45 sec", restSec: 45, tempo: "2-1-1-2" },
      ],
    },
  },
};
