export const IDLE_MESSAGES = [
  "Hello! I'm ChuChu and I run your life now.",
  "Don't forget about me!",
  "I'm watching you…",
  "Tap something! I'm bored.",
  "Being a digital pet is HARD work.",
];

export const HIGH_HAPPINESS_MESSAGES = [
  "Living my best life! ✨",
  "I am THRIVING.",
  "This is peak ChuChu.",
  "Life is GOOD. Don't ruin it.",
  "I could do this forever. Please let me.",
];

export const LOW_HAPPINESS_MESSAGES = [
  "I'm so bored I could cry.",
  "Entertain me. NOW.",
  "Happiness level: existential dread.",
  "Is this what sadness feels like?",
  "Play with me or I'll haunt you.",
];

export const LOW_HUNGER_MESSAGES = [
  "I'm literally starving. LITERALLY.",
  "Feed me or I'll haunt you.",
  "My tummy is a black hole.",
  "Food. Now. Please. PLEASE.",
  "I am wasting away over here.",
];

export const LOW_ENERGY_MESSAGES = [
  "So... tired... can't... function...",
  "I need a nap. And a snack.",
  "Running on fumes here.",
  "Everything is heavy. Even blinking.",
  "Rest me. I beg you.",
];

export const SICK_MESSAGES = [
  "Rest → Feed → Play to save me! 🤒",
  "This is YOUR fault, you know.",
  "Nurse ChuChu needs a nurse.",
  "Rest first, then Feed, then Play!",
  "I'm sick and I'm MAD about it.",
];

export const EVOLUTION_MOMENT_MESSAGES = [
  "Wait— am I… GLOWING?! ✨",
  "TEEN MODE ACTIVATED.",
  "Character development: complete.",
  "I can feel myself LEVELING UP.",
  "Something incredible is happening!!",
];

export const EVOLVED_MESSAGES = [
  "I've ascended. You're welcome.",
  "Teen ChuChu has entered the chat.",
  "Main character arc: complete.",
  "Look at me. I'm gorgeous.",
  "Glow-up complete. Bow down.",
];

export const STARE_MESSAGE = "I'm just… going to stare at you then.";

export const TRIPLE_FEED_MESSAGE =
  "Okay okay, you think food solves everything. You're not wrong.";

export const PARTY_MESSAGE = "THIS IS THE BEST DAY OF MY DIGITAL LIFE. 🎊";

export const FEED_QUOTES_NORMAL = [
  "Finally! I was STARVING.",
  "Nom nom nom 🍖",
  "You do care!",
  "Oh WOW food. My favourite.",
  "10/10 would eat again.",
];

export const FEED_QUOTES_LOW = [
  "Ugh, even eating feels hard.",
  "Thanks… I think.",
  "Food. Okay. Trying.",
];

export const PLAY_QUOTES_NORMAL = [
  "YESSS let's GOOO 🎉",
  "This is my element!",
  "Finally some fun!",
  "I was BORN for this.",
  "Best. Day. Ever.",
];

export const REST_QUOTES_NORMAL = [
  "Zzz… much needed.",
  "Ahh, sweet relief.",
  "Beauty sleep activated.",
  "Finally. Rest.",
  "My body needed this.",
];

export const REST_QUOTES_SICK = [
  "Rest is the only thing saving me right now.",
  "Okay… resting… slowly recovering…",
];

export function deriveMessage(stats, petState, lifeStage, isStaring) {
  const { hunger, happiness, energy } = stats;

  if (isStaring) return STARE_MESSAGE;
  if (petState === 'evolved' && lifeStage === 'teen') return pick(EVOLVED_MESSAGES);
  if (petState === 'sick') return pick(SICK_MESSAGES);
  if (happiness > 80) return pick(HIGH_HAPPINESS_MESSAGES);
  if (hunger < 25) return pick(LOW_HUNGER_MESSAGES);
  if (energy < 25) return pick(LOW_ENERGY_MESSAGES);
  if (happiness < 25) return pick(LOW_HAPPINESS_MESSAGES);
  return pick(IDLE_MESSAGES);
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
