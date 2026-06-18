import type { Avatar } from "@/lib/storage";

export function AvatarBadge({
  avatar,
  size = 40,
}: {
  avatar: Avatar;
  size?: number;
}) {
  const s = size;
  // Simple SVG avatar generated from preferences
  const accessory = avatar.accessory;
  const hair = avatar.hair;
  const expression = avatar.expression;

  // mouth path by expression
  const mouth =
    expression === "feliz"
      ? "M40 65 Q50 75 60 65"
      : expression === "neutro"
      ? "M40 68 L60 68"
      : expression === "serio"
      ? "M40 70 Q50 64 60 70"
      : "M50 67 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0";

  return (
    <svg
      viewBox="0 0 100 100"
      width={s}
      height={s}
      className="block rounded-full ring-2 ring-white/40"
      aria-hidden
    >
      <defs>
        <radialGradient id="bg" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0%" stopColor={avatar.background} stopOpacity="1" />
          <stop offset="100%" stopColor={avatar.background} stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#bg)" rx="50" />

      {/* Head */}
      <circle cx="50" cy="52" r="26" fill={avatar.skin} />

      {/* Hair */}
      {hair === "curto" && (
        <path
          d="M24 48 Q26 26 50 24 Q74 26 76 48 L74 42 Q60 32 50 32 Q40 32 26 42 Z"
          fill="#2a2118"
        />
      )}
      {hair === "ondulado" && (
        <path
          d="M22 50 Q22 24 50 22 Q78 24 78 50 Q72 42 65 44 Q60 36 50 36 Q40 36 35 44 Q28 42 22 50 Z"
          fill="#2a2118"
        />
      )}
      {hair === "longo" && (
        <>
          <path d="M22 60 Q20 26 50 22 Q80 26 78 60 L74 70 L70 50 Q60 38 50 38 Q40 38 30 50 L26 70 Z" fill="#3a2a20" />
        </>
      )}
      {hair === "moicano" && (
        <path
          d="M44 18 Q50 8 56 18 L56 38 L44 38 Z"
          fill={avatar.accent}
        />
      )}
      {hair === "careca" && null}

      {/* Eyes */}
      <circle cx="42" cy="52" r="2.6" fill="#1a1a1a" />
      <circle cx="58" cy="52" r="2.6" fill="#1a1a1a" />

      {/* Mouth */}
      <path d={mouth} stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Accessory */}
      {accessory === "oculos" && (
        <>
          <circle cx="42" cy="52" r="6" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <circle cx="58" cy="52" r="6" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <line x1="48" y1="52" x2="52" y2="52" stroke="#1a1a1a" strokeWidth="2" />
        </>
      )}
      {accessory === "chapeu" && (
        <g>
          <rect x="22" y="32" width="56" height="4" fill={avatar.accent} />
          <rect x="32" y="20" width="36" height="14" rx="2" fill={avatar.accent} />
        </g>
      )}
      {accessory === "fone" && (
        <g fill="none" stroke={avatar.accent} strokeWidth="4" strokeLinecap="round">
          <path d="M24 50 Q24 26 50 26 Q76 26 76 50" />
          <rect x="20" y="48" width="8" height="14" rx="2" fill={avatar.accent} stroke="none" />
          <rect x="72" y="48" width="8" height="14" rx="2" fill={avatar.accent} stroke="none" />
        </g>
      )}
    </svg>
  );
}
