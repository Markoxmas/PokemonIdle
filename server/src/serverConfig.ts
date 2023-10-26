export const serverConfig = {
  level_cost_a1: 50,
  level_cost_r: 1.0351,
  level_cp_a1: 10,
  level_cp_r: 1.0248,
  star_cp_a1: 1,
  star_cp_r: 1.8016,
  max_level_3_star: 50,
  max_level_4_star: 80,
  max_level_5_star: 100,
  max_level_6_star: 140,
  max_level_7_star: 180,
  max_level_8_star: 220,
  max_level_9_star: 260,
  max_level_10_star: 300,
  max_star_level: 10,
  sacrifices_3_star: [
    {
      type: "same",
      stars: 3,
      amount: 3,
      slot: 0,
    },
  ],
  sacrifices_4_star: [
    {
      type: "same",
      stars: 4,
      amount: 3,
      slot: 0,
    },
  ],
  sacrifices_5_star: [
    {
      type: "same",
      stars: 5,
      amount: 1,
      slot: 0,
    },
  ],
  sacrifices_6_star: [
    {
      type: "any",
      stars: 6,
      amount: 1,
      slot: 0,
    },
  ],
  sacrifices_7_star: [
    {
      type: "any",
      stars: 5,
      amount: 2,
      slot: 0,
    },
  ],
  sacrifices_8_star: [
    {
      type: "any",
      stars: 8,
      amount: 1,
      slot: 0,
    },
  ],
  sacrifices_9_star: [
    {
      type: "same",
      stars: 5,
      amount: 2,
      slot: 0,
    },
    {
      type: "any",
      stars: 7,
      amount: 1,
      slot: 1,
    },
  ],
  evolution_1st_stage: 6,
  evolution_2nd_stage: 8,
};
