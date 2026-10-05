import React from 'react';

interface AtrBpnLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
  useImage?: boolean;
}

export const AtrBpnLogo: React.FC<AtrBpnLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'dark',
  useImage = false
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Official Emblem Container */}
      <div className={`relative ${sizeMap[size]} shrink-0 flex items-center justify-center rounded-full shadow-sm overflow-hidden bg-[#152e4d]`}>
        {useImage ? (
          <img
            src="/src/assets/images/atrbpn_logo_emblem_1791167198723.jpg"
            alt="Logo Kementerian ATR/BPN"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High-Fidelity Vector SVG of Official Kementerian ATR/BPN Emblem */
          <svg
            viewBox="0 0 220 220"
            className="w-full h-full drop-shadow-xs"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dark Navy Background Base */}
            <circle cx="110" cy="110" r="108" fill="#142c4b" />
            <circle cx="110" cy="110" r="104" fill="none" stroke="#254770" strokeWidth="1.5" />

            {/* Definitions for Curved Text Paths */}
            <defs>
              <path
                id="atrbpnTopArc"
                d="M 28 112 A 82 82 0 0 1 192 112"
                fill="none"
              />
              <path
                id="atrbpnBottomArc"
                d="M 32 116 A 82 82 0 0 0 188 116"
                fill="none"
              />
              {/* Linear gradient for golden flame leaves */}
              <linearGradient id="flameGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cf6d0d" />
                <stop offset="50%" stopColor="#e88918" />
                <stop offset="100%" stopColor="#f7ab23" />
              </linearGradient>
            </defs>

            {/* Arched Text: KEMENTERIAN AGRARIA DAN TATA RUANG */}
            <text
              fill="#ffffff"
              fontSize="10.8"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="0.8"
            >
              <textPath href="#atrbpnTopArc" startOffset="50%" textAnchor="middle">
                KEMENTERIAN AGRARIA DAN TATA RUANG
              </textPath>
            </text>

            {/* Arched Text: BADAN PERTANAHAN NASIONAL */}
            <text
              fill="#ffffff"
              fontSize="11.5"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="1.2"
            >
              <textPath href="#atrbpnBottomArc" startOffset="50%" textAnchor="middle">
                BADAN PERTANAHAN NASIONAL
              </textPath>
            </text>

            {/* --- CENTRAL GLOBE (BOLA DUNIA) --- */}
            <g transform="translate(14, 2)">
              {/* Globe Sphere Base & Yellow Ring */}
              <circle cx="102" cy="108" r="54" fill="#0f2540" stroke="#f5b324" strokeWidth="4.2" />

              {/* Top Pole Cap / Pivot */}
              <ellipse cx="102" cy="54" rx="14" ry="5.5" fill="#f5b324" />

              {/* Longitude (Meridian) Curves */}
              <ellipse cx="102" cy="108" rx="27" ry="54" fill="none" stroke="#f5b324" strokeWidth="2.8" />
              <line x1="102" y1="54" x2="102" y2="162" stroke="#f5b324" strokeWidth="3.2" />

              {/* Latitude Curves */}
              <path
                d="M 52 88 Q 102 100 152 88"
                fill="none"
                stroke="#f5b324"
                strokeWidth="2.8"
              />
              <path
                d="M 54 130 Q 102 142 150 130"
                fill="none"
                stroke="#f5b324"
                strokeWidth="2.8"
              />

              {/* Globe Clip Path for Land, Buildings, Tree & Sea Waves */}
              <clipPath id="globeInnerClip">
                <circle cx="102" cy="108" r="51.5" />
              </clipPath>

              {/* Inner City, Houses, Tree & Land */}
              <g clipPath="url(#globeInnerClip)">
                {/* Green Tree Foliage */}
                <circle cx="78" cy="115" r="9" fill="#58ab33" />
                <circle cx="73" cy="118" r="7" fill="#4d992c" />
                <circle cx="83" cy="118" r="7" fill="#4d992c" />
                <rect x="76" y="122" width="3.5" height="9" fill="#3b7a21" />

                {/* Left House */}
                <path d="M 82 120 L 93 111 L 104 120 L 104 134 L 82 134 Z" fill="#ffffff" stroke="#0f2540" strokeWidth="1.2" />
                {/* Roof Ridge */}
                <polygon points="82,120 93,111 104,120" fill="#f8fafc" />
                {/* Windows on Left House */}
                <rect x="86" y="123" width="3" height="3" fill="#1b3f6b" />
                <rect x="91" y="123" width="3" height="3" fill="#1b3f6b" />

                {/* Center / Tall Office Building */}
                <rect x="99" y="99" width="16" height="35" fill="#ffffff" stroke="#0f2540" strokeWidth="1.2" rx="1" />
                {/* Tall Building Windows */}
                <rect x="103" y="103" width="2.5" height="2.5" fill="#1b3f6b" />
                <rect x="108" y="103" width="2.5" height="2.5" fill="#1b3f6b" />
                <rect x="103" y="108" width="2.5" height="2.5" fill="#1b3f6b" />
                <rect x="108" y="108" width="2.5" height="2.5" fill="#1b3f6b" />
                <rect x="103" y="113" width="2.5" height="2.5" fill="#1b3f6b" />
                <rect x="108" y="113" width="2.5" height="2.5" fill="#1b3f6b" />

                {/* Middle Right Secondary Building */}
                <rect x="119" y="110" width="13" height="24" fill="#ffffff" stroke="#0f2540" strokeWidth="1.2" rx="1" />
                <rect x="123" y="114" width="2.5" height="2.5" fill="#1b3f6b" />
                <rect x="123" y="119" width="2.5" height="2.5" fill="#1b3f6b" />

                {/* Rightmost Small House */}
                <path d="M 128 122 L 137 114 L 146 122 L 146 134 L 128 134 Z" fill="#ffffff" stroke="#0f2540" strokeWidth="1.2" />
                <rect x="133" y="125" width="3" height="3" fill="#1b3f6b" />

                {/* Green Undulating Land (Daratan) */}
                <path
                  d="M 45 133 Q 75 128 105 133 T 160 133 L 160 146 L 45 146 Z"
                  fill="#61bd39"
                />

                {/* Blue Undulating Wave (Perairan / Ruang Laut) */}
                <path
                  d="M 45 140 Q 75 136 105 141 T 160 140 L 160 165 L 45 165 Z"
                  fill="#2098d6"
                />
              </g>
            </g>

            {/* --- GOLDEN FLAME / PADI WHEAT MOTIF ON THE LEFT --- */}
            {/* Motif Daun Padi Emas / Sayap Lambang ATR/BPN */}
            <g transform="translate(6, 4)">
              {/* Bottom Small Petal */}
              <path
                d="M 44 148 C 30 144 26 130 38 120 C 44 115 54 116 57 125 C 60 135 54 145 44 148 Z"
                fill="url(#flameGrad)"
                stroke="#f5b324"
                strokeWidth="2.5"
              />
              <path
                d="M 40 134 Q 48 130 52 124"
                fill="none"
                stroke="#f7ca55"
                strokeWidth="1.5"
              />

              {/* Middle Lower Petal */}
              <path
                d="M 36 126 C 20 120 18 102 32 89 C 40 82 52 86 54 98 C 56 108 48 121 36 126 Z"
                fill="url(#flameGrad)"
                stroke="#f5b324"
                strokeWidth="2.8"
              />
              <path
                d="M 32 108 Q 42 100 48 93"
                fill="none"
                stroke="#f7ca55"
                strokeWidth="1.8"
              />

              {/* Middle Upper Petal */}
              <path
                d="M 46 95 C 30 84 28 65 44 50 C 53 42 66 48 68 62 C 70 74 60 88 46 95 Z"
                fill="url(#flameGrad)"
                stroke="#f5b324"
                strokeWidth="2.8"
              />
              <path
                d="M 44 73 Q 54 64 62 56"
                fill="none"
                stroke="#f7ca55"
                strokeWidth="1.8"
              />

              {/* Top Largest Flame / Shoot */}
              <path
                d="M 58 64 C 44 50 46 28 62 14 C 72 5 83 14 83 28 C 83 42 72 58 58 64 Z"
                fill="url(#flameGrad)"
                stroke="#f5b324"
                strokeWidth="2.8"
              />
              <path
                d="M 60 38 Q 70 28 76 20"
                fill="none"
                stroke="#f7ca55"
                strokeWidth="1.8"
              />
            </g>
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-sm ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}>
              APLIKASI MITRA
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">
              SPPR
            </span>
          </div>
          <span className={`text-[11px] font-medium tracking-tight truncate ${variant === 'light' ? 'text-slate-300' : 'text-slate-500'}`}>
            Kementerian ATR/BPN
          </span>
        </div>
      )}
    </div>
  );
};
