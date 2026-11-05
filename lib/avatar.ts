// The original GitHub avatar: ten isometric cubes, arranged 3 / 4 / 3.
const unit = 24;
const dx = Math.sqrt(3) * unit;
const edges = new Map<string, [[number, number], [number, number]]>();
export const cubeCentres = [
  ...[-2, 0, 2].map((x) => ({ x: 200 + x * dx, y: 128 })),
  ...[-3, -1, 1, 3].map((x) => ({ x: 200 + x * dx, y: 200 })),
  ...[-2, 0, 2].map((x) => ({ x: 200 + x * dx, y: 272 })),
];
for (const c of cubeCentres) {
  const corners: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ] = [
    [c.x, c.y - 2 * unit],
    [c.x + dx, c.y - unit],
    [c.x + dx, c.y + unit],
    [c.x, c.y + 2 * unit],
    [c.x - dx, c.y + unit],
    [c.x - dx, c.y - unit],
  ];
  const segments = [
    ...corners.map((p, i) => [p, corners[(i + 1) % 6]]),
    ...[0, 2, 4].map((i) => [[c.x, c.y], corners[i]]),
  ] as [[number, number], [number, number]][];
  for (const [a, b] of segments) {
    const points = [a, b]
      .map((p) => p.map((n) => n.toFixed(3)).join(","))
      .sort();
    edges.set(points.join("|"), [a, b]);
  }
}
export const avatarPath = [...edges.values()]
  .map(
    ([a, b]) =>
      `M${a[0].toFixed(3)} ${a[1].toFixed(3)}L${b[0].toFixed(3)} ${b[1].toFixed(3)}`,
  )
  .join("");
export const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="Ronny Haberer — isometric cube avatar"><circle cx="200" cy="200" r="197" fill="white"/><path d="${avatarPath}" fill="none" stroke="#181818" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
