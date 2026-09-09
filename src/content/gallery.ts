import { readdirSync } from "node:fs";
import path from "node:path";

const FOOTBALL_EXCLUDED = new Set([
  "PXL_20260516_110128535.MP.jpg", // tall bleachers shot — removed to reduce footer gap
]);

function isPortraitFilename(filename: string) {
  return filename.startsWith("PXL_");
}

function balanceMasonryOrder(filenames: string[]) {
  const landscapes: string[] = [];
  const portraits: string[] = [];

  for (const name of filenames) {
    if (isPortraitFilename(name)) portraits.push(name);
    else landscapes.push(name);
  }

  const ordered: string[] = [];
  const max = Math.max(landscapes.length, portraits.length);

  for (let i = 0; i < max; i++) {
    if (i < landscapes.length) ordered.push(landscapes[i]!);
    if (i < portraits.length) ordered.push(portraits[i]!);
  }

  // End on a landscape frame so the masonry footer sits more evenly.
  if (ordered.length > 1 && isPortraitFilename(ordered.at(-1)!)) {
    for (let i = ordered.length - 1; i >= 0; i--) {
      const name = ordered[i]!;
      if (!isPortraitFilename(name)) {
        ordered.splice(i, 1);
        ordered.push(name);
        break;
      }
    }
  }

  return ordered;
}

function imageSortKey(filename: string) {
  const numbered = filename.match(/^(\d+)(.*)$/);
  if (numbered) {
    return { num: Number(numbered[1]), rest: numbered[2]! };
  }
  const workshop = filename.match(/^workshop-(\d+)(.*)$/i);
  if (workshop) {
    return { num: Number(workshop[1]), rest: workshop[2]! };
  }
  return null;
}

function compareImageFilenames(a: string, b: string) {
  const keyA = imageSortKey(a);
  const keyB = imageSortKey(b);
  if (keyA && keyB) {
    if (keyA.num !== keyB.num) return keyA.num - keyB.num;
    // Prefer `11.jpg` before `11 (2).jpg`
    if (keyA.rest.startsWith(".") && !keyB.rest.startsWith(".")) return -1;
    if (keyB.rest.startsWith(".") && !keyA.rest.startsWith(".")) return 1;
    return keyA.rest.localeCompare(keyB.rest, undefined, { numeric: true });
  }
  return a.localeCompare(b, undefined, { numeric: true });
}

function listImages(
  dirFromPublic: string,
  options?: { exclude?: Set<string>; reorder?: (files: string[]) => string[] },
) {
  const dir = path.join(process.cwd(), "public", dirFromPublic);
  const exclude = options?.exclude ?? new Set<string>();
  let files = readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .filter((f) => !exclude.has(f))
    .sort(compareImageFilenames);

  if (options?.reorder) files = options.reorder(files);

  return files.map((f) => `/${dirFromPublic}/${encodeURIComponent(f)}`);
}

export const gallery = {
  football: listImages("gallery/football", {
    exclude: FOOTBALL_EXCLUDED,
    reorder: balanceMasonryOrder,
  }),
  basketball: listImages("gallery/basketball"),
  wrestling: listImages("gallery/Wrestling"),
  workshops: listImages("gallery/workshops"),
} as const;

