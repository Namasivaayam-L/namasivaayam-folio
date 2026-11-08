import { useEffect, useState } from "react";
import { Check, Palette as PaletteIcon } from "lucide-react";
import { PALETTES, applyPalette, getActivePaletteId } from "@/lib/palettes";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function Swatch({ colors }: { colors: [string, string] }) {
  return (
    <span className="flex h-4 w-8 shrink-0 overflow-hidden rounded-full border border-foreground/30">
      <span className="h-full w-1/2" style={{ backgroundColor: colors[0] }} />
      <span className="h-full w-1/2" style={{ backgroundColor: colors[1] }} />
    </span>
  );
}

/** Compact palette picker for the navbar: bordered icon button + popover. */
export function PaletteButton() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    setActive(getActivePaletteId());
  }, []);

  const select = (id: number) => {
    applyPalette(id);
    setActive(id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground bg-card transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
          aria-label="Choose color palette"
          title="Color palette"
        >
          <PaletteIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 rounded-xl border-2 border-foreground bg-card p-2 shadow-brutal">
        <p className="px-2 pb-2 pt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Color palette
        </p>
        <ul className="space-y-1">
          {PALETTES.map((palette) => (
            <li key={palette.id}>
              <button
                type="button"
                onClick={() => select(palette.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md border-2 px-2 py-1.5 text-left text-sm font-bold transition-colors",
                  active === palette.id
                    ? "border-foreground bg-primary/30"
                    : "border-transparent hover:border-foreground/30 hover:bg-muted"
                )}
                aria-pressed={active === palette.id}
              >
                <Swatch colors={palette.swatch} />
                <span className="flex-1">{palette.name}</span>
                {active === palette.id && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

/** Labeled row of palette dots for the footer. */
export function PaletteRow() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    setActive(getActivePaletteId());
  }, []);

  const select = (id: number) => {
    applyPalette(id);
    setActive(id);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/60">Palette</span>
      <div className="flex items-center gap-2" role="group" aria-label="Color palette">
        {PALETTES.map((palette) => (
          <button
            key={palette.id}
            type="button"
            onClick={() => select(palette.id)}
            title={palette.name}
            aria-label={`${palette.name} palette`}
            aria-pressed={active === palette.id}
            className={cn(
              "h-5 w-5 rounded-full border-2 transition-transform hover:scale-110",
              active === palette.id ? "border-background scale-110" : "border-background/40"
            )}
            style={{
              background: `linear-gradient(135deg, ${palette.swatch[0]} 50%, ${palette.swatch[1]} 50%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
