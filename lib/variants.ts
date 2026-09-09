export type Metal = { light: string; mid: string; dark: string };

export type Variant = {
  key: "nocturne" | "ivoire" | "celeste";
  name: string;
  line: string;
  dial: [string, string]; // center, edge
  dialText: string;
  hands: Metal;
  metal: Metal;
  strap: { base: string; edge: string; stitch: string };
  moon?: boolean;
};

export const GOLD: Metal = { light: "#f6dfab", mid: "#d3a05a", dark: "#7d5019" };
export const ROSE: Metal = { light: "#f7d9c2", mid: "#d49a72", dark: "#7e4a2c" };
export const STEEL: Metal = { light: "#f4f4f2", mid: "#b9bcbf", dark: "#5a5e63" };

export const VARIANTS: Record<Variant["key"], Variant> = {
  nocturne: {
    key: "nocturne",
    name: "Nocturne",
    line: "Bordeaux sunburst · rose gold",
    dial: ["#8a1c2c", "#2a0509"],
    dialText: "#f1d7a8",
    hands: ROSE,
    metal: ROSE,
    strap: { base: "#3a1017", edge: "#5a1e27", stitch: "#c9a071" },
  },
  ivoire: {
    key: "ivoire",
    name: "Ivoire",
    line: "Grained ivory · steel",
    dial: ["#f6efe0", "#c8bda6"],
    dialText: "#2a2622",
    hands: { light: "#4a4a4c", mid: "#232326", dark: "#0b0b0c" },
    metal: STEEL,
    strap: { base: "#26262a", edge: "#3c3c42", stitch: "#c8c2b4" },
  },
  celeste: {
    key: "celeste",
    name: "Céleste",
    line: "Midnight aventurine · rose gold · moonphase",
    dial: ["#25366e", "#070c22"],
    dialText: "#e9d6ac",
    hands: GOLD,
    metal: ROSE,
    strap: { base: "#111a33", edge: "#20304f", stitch: "#c9a071" },
    moon: true,
  },
};

export const LAYERS = [
  { key: "strap", label: "Strap", spec: "Hand-stitched alligator, tapered 20 → 16 mm. Pin buckle in the case metal." },
  { key: "case", label: "Case", spec: "38.5 mm, 8.9 mm thin. Polished and brushed, water-resistant to 50 m." },
  { key: "movement", label: "Movement", spec: "Hand-wound calibre O·01. 21 jewels, 42-hour reserve, skeletonised bridges." },
  { key: "dial", label: "Dial", spec: "Fourteen coats of lacquer, sunburst-brushed. Applied indices, small seconds at six." },
  { key: "bezel", label: "Bezel & crystal", spec: "Box sapphire, double anti-reflective. The bezel is one piece with the case ring." },
] as const;
