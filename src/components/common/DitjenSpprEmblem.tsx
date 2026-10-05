import React from 'react';

interface DitjenSpprEmblemProps {
  className?: string;
  size?: number;
}

export const DitjenSpprEmblem: React.FC<DitjenSpprEmblemProps> = ({
  className = '',
  size = 220
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Watercolor splash background similar to official portal */}
      <svg
        className="absolute inset-0 w-full h-full transform scale-110 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38.5,-52.1C49.9,-43.3,59.2,-32.4,63.6,-19.7C68,-7,67.6,7.5,62.8,20.2C58,32.9,48.8,43.8,37.2,51.8C25.7,59.8,11.8,64.9,-1.9,67.5C-15.6,70.2,-29.4,70.3,-41.8,63.5C-54.2,56.7,-65.2,42.9,-69.5,27.8C-73.8,12.7,-71.4,-3.8,-65.5,-18.4C-59.5,-32.9,-50,-45.5,-37.9,-54.1C-25.7,-62.7,-11,-67.2,1.8,-69.6C14.6,-72,27.1,-60.9,38.5,-52.1Z"
          fill="#fef3c7"
          opacity="0.8"
          transform="translate(100 100)"
        />
        <path
          d="M45.1,-58.4C58.3,-50.2,68.8,-37.1,72.4,-22.3C76,-7.5,72.7,9.1,65.9,24.1C59,39.1,48.7,52.5,35.2,60.8C21.8,69.1,5.2,72.2,-10.8,70.3C-26.8,68.4,-42.2,61.4,-53.4,50.1C-64.6,38.8,-71.6,23.1,-72.7,6.9C-73.8,-9.4,-68.9,-26.1,-59,-38.7C-49.1,-51.3,-34.2,-59.8,-19.4,-63.9C-4.6,-68,10.2,-67.8,24.6,-64.7C39,-61.7,53,-55.8,45.1,-58.4Z"
          fill="#cffafe"
          opacity="0.6"
          transform="translate(100 100)"
        />
        <path
          d="M34.8,-42.6C45.3,-36.8,54.1,-26.6,58.3,-14.7C62.5,-2.8,62.1,10.7,56.7,22.4C51.3,34,40.9,43.7,29,49.8C17.1,55.9,3.7,58.3,-9.6,57.1C-22.9,55.9,-36.1,51.1,-46.7,42.2C-57.3,33.2,-65.4,20.1,-67.2,5.7C-69,-8.8,-64.6,-24.5,-55.3,-34.5C-46.1,-44.6,-32.1,-49,-18.8,-51.7C-5.6,-54.3,6.9,-55.2,18.5,-51.6C30.1,-48,40.9,-39.9,34.8,-42.6Z"
          fill="#e0f2fe"
          opacity="0.75"
          transform="translate(100 100)"
        />
      </svg>

      {/* Official Circular Seal SVG */}
      <svg
        className="w-full h-full relative z-10 drop-shadow-md"
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top text arc */}
          <path
            id="sealTopArc"
            d="M 32 120 A 88 88 0 0 1 208 120"
            fill="none"
          />
          {/* Bottom text arc */}
          <path
            id="sealBottomArc"
            d="M 32 120 A 88 88 0 0 0 208 120"
            fill="none"
          />
          {/* Inner ring top arc */}
          <path
            id="sealInnerTopArc"
            d="M 48 120 A 72 72 0 0 1 192 120"
            fill="none"
          />
          {/* Inner ring bottom arc */}
          <path
            id="sealInnerBottomArc"
            d="M 48 120 A 72 72 0 0 0 192 120"
            fill="none"
          />
          {/* Gradient for gold wreath */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* Outer White Base with delicate dual rings */}
        <circle cx="120" cy="120" r="114" fill="#ffffff" stroke="#0f2e59" strokeWidth="2.5" />
        <circle cx="120" cy="120" r="109" fill="none" stroke="#0f2e59" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="120" cy="120" r="92" fill="#ffffff" stroke="#0f2e59" strokeWidth="1.5" />

        {/* Outer Arc Curved Typography: DIREKTORAT PPDPR */}
        <text
          fill="#0c2340"
          fontSize="11.5"
          fontWeight="900"
          letterSpacing="4"
          fontFamily="Arial, sans-serif"
        >
          <textPath href="#sealTopArc" startOffset="50%" textAnchor="middle">
            DIREKTORAT PPDPR
          </textPath>
        </text>

        {/* Outer Arc Bottom Typography: DITJEN SPPR */}
        <text
          fill="#0c2340"
          fontSize="12"
          fontWeight="900"
          letterSpacing="4"
          fontFamily="Arial, sans-serif"
        >
          <textPath href="#sealBottomArc" startOffset="50%" textAnchor="middle">
            DITJEN SPPR
          </textPath>
        </text>

        {/* Inner Arc Curved Typography: KEMENTERIAN AGRARIA DAN TATA RUANG */}
        <text
          fill="#0c2340"
          fontSize="6.2"
          fontWeight="700"
          letterSpacing="0.8"
          fontFamily="Arial, sans-serif"
        >
          <textPath href="#sealInnerTopArc" startOffset="50%" textAnchor="middle">
            KEMENTERIAN AGRARIA DAN TATA RUANG
          </textPath>
        </text>

        {/* Inner Arc Curved Typography: BADAN PERTANAHAN NASIONAL */}
        <text
          fill="#0c2340"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="1"
          fontFamily="Arial, sans-serif"
        >
          <textPath href="#sealInnerBottomArc" startOffset="50%" textAnchor="middle">
            BADAN PERTANAHAN NASIONAL
          </textPath>
        </text>

        {/* Inner Circle Center Shield Base */}
        <circle cx="120" cy="120" r="54" fill="#0f4c81" stroke="#f59e0b" strokeWidth="2.5" />

        {/* Globe Grid Lines */}
        <g stroke="#ffffff" strokeWidth="0.8" opacity="0.4" fill="none">
          <ellipse cx="120" cy="120" rx="46" ry="18" />
          <ellipse cx="120" cy="120" rx="46" ry="34" />
          <ellipse cx="120" cy="120" rx="18" ry="46" />
          <ellipse cx="120" cy="120" rx="34" ry="46" />
          <line x1="74" y1="120" x2="166" y2="120" />
          <line x1="120" y1="74" x2="120" y2="166" />
        </g>

        {/* Center Golden Cadastral Land & City Silhouette */}
        <g fill="#f59e0b" opacity="0.95">
          {/* Stylized Buildings / Plots */}
          <rect x="104" y="112" width="7" height="15" fill="#fef3c7" />
          <rect x="113" y="106" width="9" height="21" fill="#fde68a" />
          <rect x="124" y="114" width="8" height="13" fill="#fef3c7" />
          <polygon points="113,106 117.5,101 122,106" fill="#fbbf24" />
        </g>

        {/* Golden Wheat/Rice Sheaf and Flame Leaves */}
        <path
          d="M96 142 C 90 128 88 114 94 98 C 98 104 102 110 99 122 C 98 126 96 134 96 142 Z"
          fill="url(#goldGradient)"
        />
        <path
          d="M144 142 C 150 128 152 114 146 98 C 142 104 138 110 141 122 C 142 126 144 134 144 142 Z"
          fill="url(#goldGradient)"
        />

        {/* Golden Rice Stalks Cluster */}
        <g fill="#f59e0b" stroke="#b45309" strokeWidth="0.5">
          <circle cx="92" cy="108" r="3.2" />
          <circle cx="95" cy="116" r="3.2" />
          <circle cx="99" cy="124" r="3.2" />
          <circle cx="104" cy="132" r="3.2" />

          <circle cx="148" cy="108" r="3.2" />
          <circle cx="145" cy="116" r="3.2" />
          <circle cx="141" cy="124" r="3.2" />
          <circle cx="136" cy="132" r="3.2" />
        </g>

        {/* Bottom Banner Ribbon Base */}
        <path
          d="M96 144 Q 120 152 144 144 L 140 148 Q 120 156 100 148 Z"
          fill="#d97706"
        />
      </svg>
    </div>
  );
};
