/** Highlights "SPOT Award" in experience bullet text */
export function highlightSpotAward(text, isDark) {
  const parts = text.split(/(SPOT Award)/gi);
  return parts.map((part, index) => {
    if (/^SPOT Award$/i.test(part)) {
      return (
        <span
          key={`spot-${index}`}
          className={`font-bold rounded px-1 py-0.5 ${
            isDark
              ? 'text-amber-300 bg-amber-400/15 ring-1 ring-amber-400/35'
              : 'text-amber-800 bg-amber-100 ring-1 ring-amber-400/40'
          }`}
        >
          SPOT Award
        </span>
      );
    }
    return part;
  });
}
