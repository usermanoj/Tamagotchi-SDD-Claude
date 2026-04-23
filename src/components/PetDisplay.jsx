import styles from './PetDisplay.module.css';
import SpeechBubble from './SpeechBubble';

// Palette
const BODY   = '#D4956A';
const EAR    = '#B87040';
const EARINN = '#E8A87C';
const SNOUT  = '#F2D9B0';
const DARK   = '#2D1A0E';
const TONGUE = '#E05070';
const BLUSH  = '#F0A0A0';

// viewBox: 0 0 120 120, face center (60, 60), head r=38
// Left eye  ≈ (47, 56), Right eye ≈ (73, 56)
// Muzzle center (60, 76), Nose (60, 72)

function Eyes({ state }) {
  if (state === 'sick') {
    return (
      <g>
        <circle cx="47" cy="56" r="9"  fill="white" />
        <circle cx="47" cy="58" r="6"  fill={DARK}  />
        <circle cx="49" cy="55" r="2"  fill="white" />
        {/* droopy upper lid */}
        <path d="M 38 56 Q 47 50 56 56 Z" fill={BODY} />

        <circle cx="73" cy="56" r="9"  fill="white" />
        <circle cx="73" cy="58" r="6"  fill={DARK}  />
        <circle cx="75" cy="55" r="2"  fill="white" />
        <path d="M 64 56 Q 73 50 82 56 Z" fill={BODY} />
      </g>
    );
  }

  if (state === 'evolved') {
    return (
      <g>
        <circle cx="47" cy="56" r="10" fill="white" />
        <text x="41" y="62" fontSize="13" fill="#FFD700">★</text>
        <circle cx="73" cy="56" r="10" fill="white" />
        <text x="67" y="62" fontSize="13" fill="#FFD700">★</text>
      </g>
    );
  }

  if (state === 'stare') {
    return (
      <g>
        <circle cx="47" cy="55" r="11" fill="white" />
        <circle cx="47" cy="55" r="8"  fill={DARK}  />
        <circle cx="49.5" cy="52" r="3"   fill="white" />
        <circle cx="52"   cy="55" r="1.2" fill="white" />

        <circle cx="73" cy="55" r="11" fill="white" />
        <circle cx="73" cy="55" r="8"  fill={DARK}  />
        <circle cx="70.5" cy="52" r="3"   fill="white" />
        <circle cx="68"   cy="55" r="1.2" fill="white" />
      </g>
    );
  }

  // Normal — big innocent eyes
  return (
    <g>
      <circle cx="47" cy="56" r="10" fill="white" />
      <circle cx="47" cy="57" r="7"  fill={DARK}  />
      <circle cx="50"   cy="53" r="2.5" fill="white" />
      <circle cx="52.5" cy="57" r="1.2" fill="white" />

      <circle cx="73" cy="56" r="10" fill="white" />
      <circle cx="73" cy="57" r="7"  fill={DARK}  />
      <circle cx="70"   cy="53" r="2.5" fill="white" />
      <circle cx="67.5" cy="57" r="1.2" fill="white" />
    </g>
  );
}

function Mouth({ state }) {
  if (state === 'sick') {
    return (
      <path d="M 53 79 Q 60 75 67 79"
        stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
    );
  }
  if (state === 'stare') {
    return (
      <path d="M 54 78 Q 60 81 66 78"
        stroke={DARK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    );
  }
  const tongueRx = state === 'evolved' ? 8 : 5;
  return (
    <g>
      <path d="M 52 78 Q 60 85 68 78"
        stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="82" rx={tongueRx} ry="4.5" fill={TONGUE} />
      <line x1="60" y1="78" x2="60" y2="86" stroke="#C04060" strokeWidth="1" />
    </g>
  );
}

function Extras({ state }) {
  if (state === 'sick') {
    return (
      <g>
        <polygon points="86,42 90,31 94,42" fill="#88CCEE" opacity="0.85" />
        <ellipse cx="90" cy="44" rx="4" ry="5" fill="#88CCEE" opacity="0.85" />
      </g>
    );
  }
  if (state === 'evolved') {
    return (
      <g>
        <text x="4"  y="30" fontSize="16">✨</text>
        <text x="90" y="24" fontSize="16">✨</text>
        <text x="98" y="65" fontSize="11">⭐</text>
      </g>
    );
  }
  return null;
}

function PuppySVG({ state }) {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96" style={{ display: 'block' }}>
      {/* Floppy ears — hang down from top-sides of head */}
      <path d="M 31 38 C 14 48 8 67 12 87 C 15 99 25 104 33 98 C 40 92 38 74 36 55 C 35 46 33 40 31 38 Z" fill={EAR} />
      <path d="M 31 41 C 17 51 14 68 17 85 C 19 95 27 98 32 94 C 37 89 36 73 34 57 C 33 49 32 43 31 41 Z" fill={EARINN} />
      <path d="M 89 38 C 106 48 112 67 108 87 C 105 99 95 104 87 98 C 80 92 82 74 84 55 C 85 46 87 40 89 38 Z" fill={EAR} />
      <path d="M 89 41 C 103 51 106 68 103 85 C 101 95 93 98 88 94 C 83 89 84 73 86 57 C 87 49 88 43 89 41 Z" fill={EARINN} />

      {/* Head */}
      <circle cx="60" cy="60" r="38" fill={BODY} />

      {/* Muzzle */}
      <ellipse cx="60" cy="76" rx="14" ry="10" fill={SNOUT} />

      <Eyes state={state} />

      {/* Nose */}
      <ellipse cx="60" cy="72"   rx="5.5" ry="4"   fill={DARK}    />
      <ellipse cx="58.5" cy="70.5" rx="2"   ry="1.4" fill="#7B5040" />

      <Mouth state={state} />

      {/* Rosy cheeks */}
      <ellipse cx="36" cy="74" rx="9" ry="6" fill={BLUSH} opacity="0.45" />
      <ellipse cx="84" cy="74" rx="9" ry="6" fill={BLUSH} opacity="0.45" />

      <Extras state={state} />
    </svg>
  );
}

const STATE_LABELS = {
  normal:  'Normal',
  sick:    'Sick!',
  evolved: 'Evolved ✨',
};

export default function PetDisplay({
  petState,
  lifeStage,
  message,
  isStaring,
  isWobbling,
  isParty,
  evolutionProgress,
}) {
  const displayState = isStaring ? 'stare' : petState;
  const stateClass   = styles[petState] || '';
  const wobbleClass  = isWobbling ? styles.wobble : '';
  const partyClass   = isParty ? styles.party : '';

  return (
    <div className={styles.wrapper}>
      <SpeechBubble message={message} />

      <div className={`${styles.petCard} ${stateClass} ${wobbleClass} ${partyClass}`}>
        <div className={styles.sprite}>
          <PuppySVG state={displayState} />
        </div>
        <div className={styles.badge}>{STATE_LABELS[petState]}</div>
        {lifeStage === 'teen' && <div className={styles.lifeStage}>Teen 🌟</div>}
      </div>

      {lifeStage === 'baby' && evolutionProgress > 0 && (
        <div className={styles.evoBarWrapper}>
          <span className={styles.evoLabel}>✨ Evolving…</span>
          <div className={styles.evoTrack}>
            <div className={styles.evoFill} style={{ width: `${evolutionProgress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
