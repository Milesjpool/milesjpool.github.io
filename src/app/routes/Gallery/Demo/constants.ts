function randomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const colors = [
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#ff9ff3", "#54a0ff",
  "#96ceb4", "#feca57", "#5f27cd", "#00d2d3", "#ff9f43",
  "#a55eea", "#26de81", "#fd79a8", "#fdcb6e", "#6c5ce7"
] as const;

export function randomColour() {
  return randomItem(colors);
}

const aspectRatios = [
  1,        // Square
  4 / 3,    // Landscape
  3 / 4,    // Portrait
  3 / 2,    // Standard landscape
  2 / 3,    // Standard portrait
  16 / 9,   // Wide landscape
  9 / 16,   // Tall portrait
  5 / 4,    // Slightly tall
  4 / 5,    // Slightly wide
] as const;

export function randomAspectRatio() {
  return randomItem(aspectRatios);
}