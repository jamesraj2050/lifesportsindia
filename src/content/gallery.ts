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

function listImages(
  dirFromPublic: string,
  options?: { exclude?: Set<string>; reorder?: (files: string[]) => string[] },
) {
  const dir = path.join(process.cwd(), "public", dirFromPublic);
  const exclude = options?.exclude ?? new Set<string>();
  let files = readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .filter((f) => !exclude.has(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (options?.reorder) files = options.reorder(files);

  return files.map((f) => `/${dirFromPublic}/${encodeURIComponent(f)}`);
}

export const gallery = {
  football: listImages("gallery/football", {
    exclude: FOOTBALL_EXCLUDED,
    reorder: balanceMasonryOrder,
  }),
  basketball: listImages("gallery/basketball"),
  workshops: listImages("gallery/workshops"),
} as const;

