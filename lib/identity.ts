// Four shell panels: a spherical identity shared by the icon and the 3D study.
export const shellSeams = [
  "M69 7C84 28 58 46 45 53C27 73 21 84 29 92",
  "M10 31C5 44 24 52 45 53",
  "M36 65C59 50 87 54 91 71",
];
export const symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Sectioned sphere"><defs><mask id="shell"><circle cx="50" cy="50" r="44" fill="white"/>${shellSeams.map((d) => `<path d="${d}" fill="none" stroke="black" stroke-width="4.4" stroke-linecap="round"/>`).join("")}</mask></defs><circle cx="50" cy="50" r="44" fill="#30251f" mask="url(#shell)"/></svg>`;
