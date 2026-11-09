/** Runtime-switchable color palettes (CSS variable sets on <html>). */

export interface Palette {
  id: number;
  name: string;
  /** Primary / secondary swatch hexes for the picker UI. */
  swatch: [string, string];
}

export const PALETTES: Palette[] = [
  { id: 1, name: "Acid Lime", swatch: ["#B5F80F", "#FF3E85"] },
  { id: 2, name: "Cobalt Punch", swatch: ["#1B5EFF", "#FF6A00"] },
  { id: 3, name: "Sunset Coral", swatch: ["#FF5A3C", "#FFB800"] },
  { id: 4, name: "Violet Pop", swatch: ["#7C3AED", "#FF4FA3"] },
  { id: 5, name: "Teal Mint", swatch: ["#14D7BD", "#FF7A59"] },
  { id: 6, name: "Tomato Punch", swatch: ["#E5484D", "#0090FF"] },
  { id: 7, name: "Cyan Fizz", swatch: ["#22B8CF", "#F06595"] },
  { id: 8, name: "Grass Plum", swatch: ["#46A758", "#AB4ABA"] },
  { id: 9, name: "Gold Indigo", swatch: ["#FCC419", "#3B5BDB"] },
  { id: 10, name: "Mango Wave", swatch: ["#FD7E14", "#1098AD"] },
];

export const PALETTE_STORAGE_KEY = "palette";

export function getActivePaletteId(): number {
  for (const p of PALETTES) {
    if (document.documentElement.classList.contains(`palette-${p.id}`)) return p.id;
  }
  return 1;
}

export function applyPalette(id: number): void {
  const root = document.documentElement;
  for (const p of PALETTES) root.classList.remove(`palette-${p.id}`);
  root.classList.add(`palette-${id}`);
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, String(id));
  } catch {
    /* localStorage unavailable — the palette still applies for this session. */
  }
}
