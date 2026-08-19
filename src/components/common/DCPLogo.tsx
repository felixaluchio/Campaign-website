interface DCPLogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function DCPLogo({ className = '', variant = 'full', size = 'md' }: DCPLogoProps) {
  if (variant === 'symbol') {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 150 160" 
        className={className}
        aria-label="DCP Skiza Wakenya Symbol"
      >
        <g transform="translate(75, 80)" strokeWidth="5" strokeLinecap="round" fill="none">
          {/* Braided Rope Border */}
          <path d="M -60,-20 C -64,-5 -60,15 -52,32" stroke="#005A36" strokeDasharray="7 5" strokeWidth="6"/>
          <path d="M -52,32 C -40,55 -20,70 5,74" stroke="#005A36" strokeDasharray="7 5" strokeWidth="6"/>
          <path d="M 5,74 C 30,76 52,65 65,48" stroke="#005A36" strokeDasharray="7 5" strokeWidth="6"/>
          <path d="M -60,-20 C -56,-45 -40,-65 -15,-72" stroke="#005A36" strokeDasharray="7 5" strokeWidth="6"/>
          <path d="M -15,-72 C 10,-76 38,-65 55,-45" stroke="#005A36" strokeDasharray="7 5" strokeWidth="6"/>
          
          <path d="M -58,-15 C -62,0 -58,20 -50,37" stroke="#9C4B18" strokeDasharray="7 5" strokeWidth="6" strokeDashoffset="6"/>
          <path d="M -50,37 C -38,60 -16,73 10,76" stroke="#9C4B18" strokeDasharray="7 5" strokeWidth="6" strokeDashoffset="6"/>
          <path d="M 10,76 C 35,77 56,64 68,43" stroke="#9C4B18" strokeDasharray="7 5" strokeWidth="6" strokeDashoffset="6"/>
          <path d="M -58,-15 C -54,-40 -38,-60 -10,-68" stroke="#9C4B18" strokeDasharray="7 5" strokeWidth="6" strokeDashoffset="6"/>
          <path d="M -10,-68 C 15,-72 42,-60 58,-40" stroke="#9C4B18" strokeDasharray="7 5" strokeWidth="6" strokeDashoffset="6"/>

          {/* Rope ticks */}
          <g stroke="#9C4B18" strokeWidth="2.5">
            <line x1="-58" y1="-28" x2="-66" y2="-22" />
            <line x1="-63" y1="-10" x2="-70" y2="-4" />
            <line x1="-62" y1="10" x2="-69" y2="16" />
            <line x1="-54" y1="28" x2="-60" y2="35" />
            <line x1="-42" y1="46" x2="-47" y2="54" />
            <line x1="-24" y1="60" x2="-28" y2="68" />
            <line x1="-4" y1="68" x2="-6" y2="77" />
            <line x1="16" y1="69" x2="16" y2="78" />
            <line x1="36" y1="64" x2="38" y2="72" />
            <line x1="52" y1="52" x2="56" y2="59" />
            <line x1="-48" y1="-48" x2="-54" y2="-43" />
            <line x1="-32" y1="-62" x2="-36" y2="-55" />
            <line x1="-12" y1="-70" x2="-14" y2="-62" />
            <line x1="10" y1="-72" x2="10" y2="-63" />
            <line x1="30" y1="-67" x2="28" y2="-58" />
            <line x1="48" y1="-54" x2="44" y2="-46" />
          </g>
          <g stroke="#005A36" strokeWidth="2.5">
            <line x1="-61" y1="-19" x2="-68" y2="-13" />
            <line x1="-63" y1="0" x2="-70" y2="6" />
            <line x1="-58" y1="19" x2="-65" y2="26" />
            <line x1="-48" y1="37" x2="-54" y2="45" />
            <line x1="-33" y1="53" x2="-38" y2="61" />
            <line x1="-14" y1="65" x2="-17" y2="73" />
            <line x1="6" y1="69" x2="5" y2="78" />
            <line x1="26" y1="67" x2="27" y2="75" />
            <line x1="44" y1="59" x2="47" y2="66" />
            <line x1="60" y1="44" x2="64" y2="50" />
            <line x1="-40" y1="-55" x2="-45" y2="-49" />
            <line x1="-22" y1="-67" x2="-25" y2="-59" />
            <line x1="-1" y1="-72" x2="-2" y2="-63" />
            <line x1="20" y1="-70" x2="19" y2="-61" />
            <line x1="39" y1="-61" x2="36" y2="-52" />
          </g>
        </g>

        {/* Hand Cupping Ear Illustration */}
        <g transform="translate(75, 80)" fill="none" stroke="#8B4513" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -18,65 L -16,50 C -16,40 -12,32 -6,26" strokeWidth="2.2" />
          <path d="M 12,65 L 10,54 C 8,42 4,35 0,30" strokeWidth="2.2" />
          <path d="M -15,58 L 9,58 M -14,62 L 10,62 M -12,54 L 7,54 M -10,50 L 5,50" strokeWidth="1.2" stroke="#A0522D" />

          {/* Fingers */}
          <path d="M -22,12 C -26,-2 -26,-20 -20,-38 C -18,-45 -14,-46 -11,-42 C -8,-36 -7,-22 -7,-8" strokeWidth="2.2" fill="#FFFDF8"/>
          <path d="M -20,-15 C -17,-16 -13,-15 -10,-12 M -21,-28 C -18,-29 -14,-28 -12,-25" strokeWidth="1.2" stroke="#A0522D" />
          
          <path d="M -11,-42 C -10,-52 -5,-62 0,-62 C 5,-62 7,-52 6,-38 C 5,-25 4,-12 4,-2" strokeWidth="2.2" fill="#FFFDF8"/>
          <path d="M -5,-35 C -1,-36 3,-36 5,-33 M -6,-48 C -2,-49 3,-49 4,-45" strokeWidth="1.2" stroke="#A0522D" />

          <path d="M 6,-46 C 10,-54 16,-54 18,-46 C 20,-36 18,-20 16,-6" strokeWidth="2.2" fill="#FFFDF8"/>
          <path d="M 9,-30 C 12,-31 15,-30 17,-27 M 10,-42 C 13,-43 16,-41 17,-37" strokeWidth="1.2" stroke="#A0522D" />

          <path d="M 18,-38 C 22,-44 28,-42 28,-34 C 28,-22 25,-10 22,4" strokeWidth="2.2" fill="#FFFDF8"/>
          <path d="M -22,12 C -24,20 -20,32 -16,42" strokeWidth="2.2" />

          {/* Ear */}
          <path d="M 3,-22 C 12,-28 26,-28 35,-18 C 45,-6 46,12 42,26 C 38,40 24,48 12,46 C 2,44 0,34 2,24 C 4,14 10,8 14,8" strokeWidth="2.6" fill="#FFFDF8" />
          <path d="M 30,-8 C 34,2 35,16 30,24 C 25,32 16,34 10,28 C 6,24 8,16 12,14 C 18,12 24,6 22,-2 C 20,-10 14,-14 6,-14" strokeWidth="2" stroke="#8B4513" fill="#FDF6EE" />
          <path d="M 10,18 C 8,20 6,18 7,15" strokeWidth="2" />
          <path d="M 22,34 C 20,40 14,42 8,38" strokeWidth="1.6" />
        </g>
      </svg>
    );
  }

  return (
    <img 
      src="/images/dcp-logo.svg" 
      alt="Phyllis Wangui Campaign Logo" 
      className={`inline-block object-contain ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
