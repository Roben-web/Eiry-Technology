export function generateProfileImage(name) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
    <rect width='100%' height='100%' fill='#0f172a'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
      font-family='Arial' font-size='72' fill='#f97316'>
      ${initials}
    </text>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
