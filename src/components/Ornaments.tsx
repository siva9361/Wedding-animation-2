import type { CSSProperties, ReactNode } from "react";

/* South Indian wedding ornaments with photographic brass and botanical accents. */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

interface MandalaProps {
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  spin?: boolean;
}

export function Mandala({ size = 320, className = "", style, children, spin }: MandalaProps) {
  return (
    <div
      className={`mandala ${spin ? "mandala--spin" : ""} ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden={children ? undefined : true}
    >
      <svg viewBox="-100 -100 200 200" className="mandala__svg">
        <defs>
          <linearGradient id="mGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff1b8" />
            <stop offset=".45" stopColor="#e2b44a" />
            <stop offset="1" stopColor="#9a6a12" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#mGold)" strokeWidth=".9">
          <circle r="97" />
          <circle r="93" strokeDasharray="1.5 3" />
          {range(24).map((i) => (
            <path
              key={`o${i}`}
              transform={`rotate(${i * 15})`}
              d="M0,-91 C9,-80 9,-68 0,-58 C-9,-68 -9,-80 0,-91Z"
            />
          ))}
          {range(24).map((i) => (
            <circle key={`d${i}`} transform={`rotate(${i * 15 + 7.5})`} cy="-84" r="1.6" fill="url(#mGold)" />
          ))}
          <circle r="57" />
          {range(16).map((i) => (
            <path
              key={`m${i}`}
              transform={`rotate(${i * 22.5})`}
              d="M0,-56 C15,-44 13,-30 0,-24 C-13,-30 -15,-44 0,-56Z M0,-50 C7,-42 6,-33 0,-29 C-6,-33 -7,-42 0,-50Z"
            />
          ))}
          <circle r="23" />
          <circle r="20" strokeDasharray="2 2" />
          {range(8).map((i) => (
            <path key={`i${i}`} transform={`rotate(${i * 45})`} d="M0,-20 C5,-14 5,-8 0,-4 C-5,-8 -5,-14 0,-20Z" />
          ))}
        </g>
      </svg>
      {children && <div className="mandala__center">{children}</div>}
    </div>
  );
}

/** Individually animated realistic mango leaves tied to a gently draped cord. */
export function Thoranam({ className = "", id = "th" }: { className?: string; id?: string }) {
  return (
    <div className={`thoranam ${className}`} id={id} aria-hidden="true">
      <div className="thoranam__strand">
        <svg className="thoranam__cord" viewBox="0 0 1000 35" preserveAspectRatio="none"><path d="M-5 4 Q500 48 1005 4" /></svg>
        <div className="thoranam__leaves">
          {range(36).map((i) => (
            <span key={i} className="thoranam__leaf" style={{
              "--drop": `${(1 - Math.pow((i / 35) * 2 - 1, 2)) * 22}px`,
              "--mobile-drop": `${(1 - Math.pow((i / 15) * 2 - 1, 2)) * 8}px`,
              "--lean": `${[8, -7, 3, -5, 9, -3][i % 6]}deg`,
              "--length": [1, .92, 1.07, .96, 1.03][i % 5],
              "--delay": `${-i * .37}s`,
              "--duration": `${3.1 + (i % 5) * .24}s`,
            } as CSSProperties}>
              <span className="thoranam__leaf-motion"><img src="/images/mango-leaf.webp" alt="" width="320" height="640" decoding="async" draggable={false} /></span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Photographic brass lamp with independently animated cotton-wick flames. */
export function Kuthuvilakku({ className = "" }: { className?: string }) {
  return (
    <div className={`lamp ${className}`} aria-hidden="true">
      <img className="lamp__photo" src="/images/brass-kuthuvilakku.webp" alt="" width="1024" height="1536" />
      {["left", "center", "right"].map((position) => (
        <span key={position} className={`lamp__wick lamp__wick--${position}`}>
          <span className="lamp__aura" />
          <span className="lamp__fire"><span className="lamp__fire-core" /></span>
          <span className="lamp__ember" />
        </span>
      ))}
    </div>
  );
}

/** Betel leaf (வெற்றிலை) — echoes the leaf frames on the printed card. */
export function BetelLeaf({ className = "", children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={`betel ${className}`}>
      <svg viewBox="0 0 100 120" aria-hidden="true">
        <defs>
          <linearGradient id="betelG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a9c94a" />
            <stop offset="1" stopColor="#4d7a12" />
          </linearGradient>
        </defs>
        <path d="M50,116 C34,96 6,80 6,50 C6,24 26,8 50,22 C74,8 94,24 94,50 C94,80 66,96 50,116Z" fill="url(#betelG)" />
        <g stroke="#e9f5c4" strokeWidth="1.1" fill="none" opacity=".75">
          <path d="M50,22 L50,112" />
          <path d="M50,44 C38,40 26,36 16,42 M50,44 C62,40 74,36 84,42" />
          <path d="M50,66 C38,62 24,60 14,66 M50,66 C62,62 76,60 86,66" />
          <path d="M50,88 C42,84 32,82 26,86 M50,88 C58,84 68,82 74,86" />
        </g>
      </svg>
      {children && <div className="betel__icon">{children}</div>}
    </div>
  );
}

/** Small gold divider with a central lotus bud. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 300 30" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M10,15 H120 M180,15 H290" />
        <path d="M120,15 C130,5 140,5 150,15 C160,5 170,5 180,15" />
        <path d="M120,15 C130,25 140,25 150,15 C160,25 170,25 180,15" />
      </g>
      <path d="M150,3 C157,10 157,20 150,27 C143,20 143,10 150,3Z" fill="currentColor" />
      <circle cx="10" cy="15" r="2.5" fill="currentColor" />
      <circle cx="290" cy="15" r="2.5" fill="currentColor" />
    </svg>
  );
}

/** Ornate gold corner for framed cards; rotate via CSS for each corner. */
export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg className={`corner ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4,76 V4 H76" />
        <path d="M12,76 V12 H76" strokeWidth=".8" />
        <path d="M12,12 C30,12 40,22 40,40 C22,40 12,30 12,12Z" />
        <path d="M40,40 C46,28 56,22 70,22" />
        <path d="M40,40 C28,46 22,56 22,70" />
      </g>
      <circle cx="40" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

/** Hanging string of jasmine buds ending in a rose. */
export function JasmineString({ className = "", length = 14 }: { className?: string; length?: number }) {
  const h = length * 16 + 40;
  return (
    <svg className={`jasmine ${className}`} viewBox={`0 0 30 ${h}`} style={{ height: h }} aria-hidden="true">
      <line x1="15" y1="0" x2="15" y2={h - 30} stroke="#c9a24a" strokeWidth="1" />
      {range(length).map((i) => (
        <g key={i} transform={`translate(15 ${10 + i * 16})`}>
          <ellipse rx="5" ry="7" fill="#fffdf4" stroke="#e8dfc4" strokeWidth=".6" />
          <ellipse rx="2" ry="3" cy="-1" fill="#f6ecd0" />
        </g>
      ))}
      <g transform={`translate(15 ${h - 18})`}>
        <circle r="11" fill="#b3123b" />
        <path d="M-6,-2 C-2,-9 6,-7 6,0 C6,6 -2,8 -5,3" fill="none" stroke="#7d0a27" strokeWidth="1.5" />
        <circle r="3" fill="#7d0a27" />
      </g>
    </svg>
  );
}
