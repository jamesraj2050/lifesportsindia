import { readdirSync } from "node:fs";
import path from "node:path";

function listImages(dirFromPublic: string) {
  const dir = path.join(process.cwd(), "public", dirFromPublic);
  const files = readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((f) => `/${dirFromPublic}/${encodeURIComponent(f)}`);
}

export const gallery = {
  football: listImages("gallery/football"),
  basketball: listImages("gallery/basketball"),
  women: listImages("gallery/women"),
} as const;

