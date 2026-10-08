export default function DogSvg() {
  return (
    <svg
      className="dog-svg"
      width="170"
      height="190"
      viewBox="0 0 200 220"
      fill="none"
      style={{ animation: 'float 4s ease-in-out infinite' }}
    >
      {/* Fluffy tail */}
      <path d="M152 140 Q185 110 178 80 Q175 65 165 72 Q172 95 158 118 Z" fill="#E8A830"/>
      <path d="M155 138 Q183 112 177 84 Q175 70 167 76 Q173 97 160 120 Z" fill="#F5C043"/>

      {/* Body */}
      <ellipse cx="100" cy="148" rx="58" ry="48" fill="#E8A830"/>
      <ellipse cx="100" cy="155" rx="36" ry="32" fill="#F5C043"/>
      <path d="M55 130 Q50 118 58 112" stroke="#D4922A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M145 130 Q150 118 142 112" stroke="#D4922A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M65 148 Q60 136 66 128" stroke="#D4922A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M135 148 Q140 136 134 128" stroke="#D4922A" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* Head */}
      <circle cx="100" cy="80" r="40" fill="#E8A830"/>
      <ellipse cx="100" cy="62" rx="28" ry="18" fill="#F5C043"/>

      {/* Left ear */}
      <path d="M62 58 Q42 52 36 80 Q32 100 45 112 Q55 118 65 108 Q58 90 62 70 Z" fill="#C47820"/>
      <path d="M62 58 Q44 54 40 78 Q37 96 48 108 Q55 114 63 106 Q57 88 62 68 Z" fill="#D4922A"/>
      {/* Right ear */}
      <path d="M138 58 Q158 52 164 80 Q168 100 155 112 Q145 118 135 108 Q142 90 138 70 Z" fill="#C47820"/>
      <path d="M138 58 Q156 54 160 78 Q163 96 152 108 Q145 114 137 106 Q143 88 138 68 Z" fill="#D4922A"/>

      {/* Eyes */}
      <circle cx="87" cy="74" r="9" fill="white"/>
      <circle cx="113" cy="74" r="9" fill="white"/>
      <circle cx="88" cy="75" r="6" fill="#4A2C0A"/>
      <circle cx="114" cy="75" r="6" fill="#4A2C0A"/>
      <circle cx="90" cy="73" r="2" fill="white"/>
      <circle cx="116" cy="73" r="2" fill="white"/>
      <circle cx="87" cy="78" r="1" fill="white" opacity="0.6"/>
      <circle cx="113" cy="78" r="1" fill="white" opacity="0.6"/>

      {/* Eyebrows */}
      <path d="M81 65 Q87 62 93 65" stroke="#8B5E1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M107 65 Q113 62 119 65" stroke="#8B5E1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* Muzzle */}
      <ellipse cx="100" cy="91" rx="22" ry="16" fill="#F5C043"/>
      <ellipse cx="100" cy="88" rx="18" ry="12" fill="#FADA7A"/>

      {/* Nose */}
      <ellipse cx="100" cy="86" rx="10" ry="7" fill="#1A0A00"/>
      <ellipse cx="97" cy="84" rx="3.5" ry="2.5" fill="#3D2010" opacity="0.7"/>
      <ellipse cx="103" cy="83" rx="2" ry="1.5" fill="white" opacity="0.4"/>

      {/* Smile + tongue */}
      <path d="M86 95 Q100 105 114 95" stroke="#8B3A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="100" cy="106" rx="9" ry="7" fill="#E05A4A"/>
      <ellipse cx="100" cy="107" rx="8.5" ry="6.5" fill="#E8685A"/>
      <path d="M100 101 L100 112" stroke="#C04030" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Legs */}
      <rect x="62" y="175" width="24" height="35" rx="12" fill="#E8A830"/>
      <rect x="114" y="175" width="24" height="35" rx="12" fill="#E8A830"/>
      <rect x="55" y="160" width="22" height="33" rx="11" fill="#D4922A"/>
      <rect x="123" y="160" width="22" height="33" rx="11" fill="#D4922A"/>
      <ellipse cx="66" cy="193" rx="11" ry="6" fill="#C47820"/>
      <ellipse cx="134" cy="193" rx="11" ry="6" fill="#C47820"/>

      {/* Collar */}
      <rect x="70" y="112" width="60" height="11" rx="5.5" fill="#FF7043"/>
      <circle cx="100" cy="123" r="6" fill="#FFD54F"/>
      <text x="100" y="126" textAnchor="middle" fontSize="7" fill="#C47820" fontWeight="bold">B</text>

      {/* Head tuft */}
      <path d="M88 44 Q100 36 112 44 Q106 50 100 48 Q94 50 88 44Z" fill="#F5C043"/>
      <path d="M92 42 Q100 34 108 42 Q104 46 100 45 Q96 46 92 42Z" fill="#FADA7A"/>
    </svg>
  )
}
