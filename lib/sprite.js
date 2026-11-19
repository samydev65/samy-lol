// The pixel-art character, shared by the live site (components/Sprite.js) and
// scripts/draw-sprite.mjs (which makes public/me.png and the browser icon).
// Each string is one row of pixels; each letter is a color from PALETTE.

export const PALETTE = {
  ".": "#9fb7cf", // backdrop
  K: "#1c1a24",   // outline
  H: "#8a5a2b",   // hair
  h: "#5e3a1a",   // hair shadow
  L: "#c08a4a",   // hair highlight
  S: "#f2c6a8",   // skin
  s: "#d79f80",   // skin shadow
  W: "#ffffff",   // eye white
  E: "#3f6fb5",   // iris
  P: "#1c1a24",   // pupil
  M: "#b5605a",   // mouth
  N: "#2f3e5c",   // crewneck sweatshirt
  n: "#232f47",   // sweatshirt shadow
  R: "#3d5078",   // ribbed collar
  T: "#f4f4f4",   // white tee
  t: "#cfd3da",   // white tee shadow
};

// 32 x 40
export const SPRITE = [
  "................................",
  "..........KK...KKK..KK..........",
  "........KKLHK.KLHHKKLHK.........",
  "......KKHLHHHKHLHHHHLHHHKK......",
  ".....KHLHHhHHHLHHHhHHLLHHHK.....",
  "....KHLHHhHHLLHHHHhHLHHHhHHK....",
  "...KHLHHhHHLHHHhHHLHHHhHHLHHK...",
  "..KHHLHhHHLHHhHHLHhHHHLHhHHLHK..",
  "..KHLHhHHHhHHLHHHhHHHLHHhHHHLK..",
  ".KHHhHHhHHHhHHhHHHHhHHhHHHhHHHK.",
  ".KHLhHHhHHHhHHHhHHHhHHHhHHLhHHK.",
  "..KHhHHHhHHhSHHHhHHSHhHHhHHhHK..",
  "..KHhHHhHShHhSShHhSShHSHhHHhHK..",
  "..KHHhHhSShSShSSShSShSSShHhHHK..",
  "...KHHHShhhhSSSSSSSShhhhSHHHK...",
  "...KHHHSSKKKKSSSSSSKKKKSSHHHK...",
  "...KHHHSSWEPWSSSSSSWPEWSSHHHK...",
  "...KHHHSSsEEsSSSSSSsEEsSSHHHK...",
  "...KHKSSSSSSSSsSSSSSSSSSSSKHK...",
  "...KHKSSSSSSSSsSSSSSSSSSSSKHK...",
  "...KHKsSSSSSSsssSSSSSSSSSSKHK...",
  "....KHhSSSSSSSSSSSSSSSSSShHK....",
  ".....KKSSSSSSMMMMMMSSSSSSKK.....",
  "......KsSSSSSSssssSSSSSSsK......",
  "......KssSSSSSSSSSSSSSSssK......",
  ".......KssSSSSSSSSSSSSssK.......",
  "........KssSSSSSSSSSSssK........",
  ".........KKssssssssssKK.........",
  "...........KsSSSSSSsK...........",
  "...........KsSSSSSSsK...........",
  "....KKKKKKKKTTTTTTTTKKKKKKKK....",
  "...KNNNNNNNRtTTTTTTtRNNNNNNNK...",
  "..KNNNNNNNNRRttttttRRNNNNNNNNK..",
  ".KNNNNNNNNNNRRRRRRRRNNNNNNNNNNK.",
  ".KNNNNNNNNNNNNNNNNNNNNNNNNNNNNK.",
  ".KNNnNNNNNNNNNNNNNNNNNNNNNNnNNK.",
  ".KNnNNNNNNNNNNNNNNNNNNNNNNNNnNK.",
  ".KNnNNNNNNNNNNNNNNNNNNNNNNNNnNK.",
  ".KnNNNNNNNNNNNNNNNNNNNNNNNNNNnK.",
  ".KnNNNNNNNNNNNNNNNNNNNNNNNNNNnK.",
];

// Eye pixels that get covered during a blink: [row, firstCol, lastCol]
export const EYES = [[9, 12], [19, 22]];
export const EYE_ROWS = [15, 16, 17];
