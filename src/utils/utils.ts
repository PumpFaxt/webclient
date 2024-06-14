export function generateRandomString(length: number, seed?: string) {
  let result = "";
  const characters =
    seed ||
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function clampValue(
  value: number,
  { min, max }: { min?: number; max?: number }
) {
  let ans = value;
  if (max && min && max < min) {
    return value;
  }
  if (min && ans < min) {
    ans = min;
  }
  if (max && ans > max) {
    ans = max;
  }
  return ans;
}

export function linearMap(
  value: number,
  mapFrom: { from: number; to: number },
  mapTo: { from: number; to: number },
  clamp = true
) {
  const slope = (mapTo.to - mapTo.from) / (mapFrom.to - mapFrom.from);
  const ans = slope * (value - mapFrom.from) + mapTo.from;
  return clamp
    ? clampValue(ans, {
        min: Math.min(mapTo.from, mapTo.to),
        max: Math.max(mapTo.from, mapTo.to),
      })
    : ans;
}

export function convertColorToRGBVec(color: string): [number, number, number] {
  let rgb: [number, number, number] = [0, 0, 0];

  if (color.startsWith("#")) {
    color = color.slice(1);

    if (color.length === 3) {
      color = color
        .split("")
        .map((char) => char + char)
        .join("");
    }

    rgb = [
      parseInt(color.substr(0, 2), 16) / 255,
      parseInt(color.substr(2, 2), 16) / 255,
      parseInt(color.substr(4, 2), 16) / 255,
    ];
  } else if (color.startsWith("rgb(")) {
    const values = color
      .substring(4, color.length - 1)
      .split(",")
      .map((value) => parseInt(value.trim(), 10));

    rgb = values.map((value) => value / 255) as [number, number, number];
  }

  return rgb;
}

export function getCoords(elem: HTMLElement) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

export function mapValueToColor(
  value: number,
  ranges: number[],
  colors: number[][]
) {
  value = Math.min(Math.max(value, ranges[0]), ranges[ranges.length - 1]);
  let index = 0;
  while (value > ranges[index + 1]) {
    index++;
  }

  const rangeStart = ranges[index];
  const rangeEnd = ranges[index + 1];
  const colorStart = colors[index];
  const colorEnd = colors[index + 1];

  const t = (value - rangeStart) / (rangeEnd - rangeStart);

  const r = Math.round(colorStart[0] + (colorEnd[0] - colorStart[0]) * t)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(colorStart[1] + (colorEnd[1] - colorStart[1]) * t)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(colorStart[2] + (colorEnd[2] - colorStart[2]) * t)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
}

export function isEmail(script: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(script);
}

export function getObjectKeys<T extends object>(obj: T) {
  if (typeof obj !== "object")
    throw new Error("Not a valid object to get keys");

  return Object.keys(obj) as Array<keyof T>;
}

export function getRandomFromArray<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getImageDominantRgb(
  src: string
): Promise<Uint8ClampedArray> {
  return new Promise((resolve) => {
    let context = document.createElement("canvas").getContext("2d");
    context!.imageSmoothingEnabled = true;

    let img = new Image();
    img.src = src;
    img.crossOrigin = "";

    img.onload = () => {
      context!.drawImage(img, 0, 0, 1, 1);
      resolve(context!.getImageData(0, 0, 1, 1).data.slice(0, 3));
    };
  });
}

export function getLuminicanceFromRgb(rgb: number[]) {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

export function format18DecimalsToken(num: number | BigInt) {
  return Number(num) / Math.pow(10, 18);
}

export function formatAddress(address: string) {
  return (
    address.slice(0, 5 + 2) +
    "..." +
    address.slice(address.length - 5, address.length)
  );
}

export function generateColorFromAddress(address: string): string {
  const hash = fnv1aHash(address);

  const color = `#${hash.substring(0, 6)}`;
  const rgb = convertColorToRGBVec(color);

  rgb[0] *= 255;
  rgb[1] *= 255;
  rgb[2] *= 255;

  while (getLuminicanceFromRgb(rgb) < 128) {
    rgb[0] += 1;
    rgb[1] += 1;
    rgb[2] += 1;
  }
  const clr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

  return clr;
}

export function fnv1aHash(str: string): string {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16);
}
