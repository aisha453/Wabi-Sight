// Interactive Sample Nature Presets for instant testing and trail exploration

export interface NaturePreset {
  id: string;
  name: string;
  category: 'Water' | 'Earth' | 'Flora' | 'Cloud';
  description: string;
  icon: string;
  accentColor: string;
  generateImage: () => Promise<File>;
}

const createSvgFile = async (svgString: string, filename: string): Promise<File> => {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  return new Promise((resolve) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve(new File([blob], filename, { type: 'image/jpeg' }));
          } else {
            resolve(new File([svgBlob], filename, { type: 'image/svg+xml' }));
          }
        }, 'image/jpeg', 0.9);
      } else {
        URL.revokeObjectURL(url);
        resolve(new File([svgBlob], filename, { type: 'image/svg+xml' }));
      }
    };
    img.src = url;
  });
};

export const NATURE_PRESETS: NaturePreset[] = [
  {
    id: 'ripples',
    name: 'Rainwater Ripples',
    category: 'Water',
    description: 'Concentric disturbance expanding across a still pool',
    icon: '💧',
    accentColor: '#38bdf8',
    generateImage: async () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#0c2331"/>
              <stop offset="100%" stop-color="#030b10"/>
            </radialGradient>
          </defs>
          <rect width="600" height="600" fill="url(#bg)"/>
          <circle cx="300" cy="300" r="40" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.9"/>
          <circle cx="300" cy="300" r="90" fill="none" stroke="#2dd4bf" stroke-width="2.5" opacity="0.8"/>
          <circle cx="300" cy="300" r="150" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.65"/>
          <circle cx="300" cy="300" r="215" fill="none" stroke="#0ea5e9" stroke-width="1.5" opacity="0.45"/>
          <circle cx="300" cy="300" r="275" fill="none" stroke="#0284c7" stroke-width="1" opacity="0.3"/>
          <circle cx="300" cy="300" r="8" fill="#38bdf8" opacity="0.95"/>
        </svg>
      `;
      return createSvgFile(svg, 'rainwater_ripples.jpg');
    }
  },
  {
    id: 'cedar',
    name: 'Ancient Cedar Rings',
    category: 'Earth',
    description: 'Eccentric wood grain rings recording centuries of rainfall',
    icon: '🪵',
    accentColor: '#f59e0b',
    generateImage: async () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="wood" cx="45%" cy="48%" r="55%">
              <stop offset="0%" stop-color="#451a03"/>
              <stop offset="60%" stop-color="#271003"/>
              <stop offset="100%" stop-color="#120701"/>
            </radialGradient>
          </defs>
          <rect width="600" height="600" fill="url(#wood)"/>
          <ellipse cx="280" cy="290" rx="35" ry="30" fill="none" stroke="#d97706" stroke-width="3" opacity="0.9"/>
          <ellipse cx="285" cy="295" rx="75" ry="65" fill="none" stroke="#b45309" stroke-width="2.5" opacity="0.8"/>
          <ellipse cx="290" cy="300" rx="130" ry="115" fill="none" stroke="#d97706" stroke-width="2.2" opacity="0.7"/>
          <ellipse cx="295" cy="305" rx="190" ry="170" fill="none" stroke="#f59e0b" stroke-width="1.8" opacity="0.55"/>
          <ellipse cx="300" cy="310" rx="250" ry="225" fill="none" stroke="#78350f" stroke-width="1.5" opacity="0.4"/>
        </svg>
      `;
      return createSvgFile(svg, 'cedar_rings.jpg');
    }
  },
  {
    id: 'fern',
    name: 'Fern Vein Lattice',
    category: 'Flora',
    description: 'Fractal branching architecture capturing forest sunlight',
    icon: '🍂',
    accentColor: '#4ade80',
    generateImage: async () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="leaf" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#064e3b"/>
              <stop offset="100%" stop-color="#021c14"/>
            </radialGradient>
          </defs>
          <rect width="600" height="600" fill="url(#leaf)"/>
          <path d="M 300 550 Q 295 300 300 60" fill="none" stroke="#4ade80" stroke-width="5" stroke-linecap="round"/>
          <path d="M 300 480 Q 200 440 120 420" fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round"/>
          <path d="M 300 480 Q 400 440 480 420" fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round"/>
          <path d="M 298 380 Q 210 340 150 320" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 298 380 Q 390 340 450 320" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 299 280 Q 220 250 180 230" fill="none" stroke="#86efac" stroke-width="2" stroke-linecap="round"/>
          <path d="M 299 280 Q 380 250 420 230" fill="none" stroke="#86efac" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      return createSvgFile(svg, 'fern_vein.jpg');
    }
  },
  {
    id: 'clouds',
    name: 'Twilight Cloud Drift',
    category: 'Cloud',
    description: 'Ephemeral vapor wisps dissolving against fading skylight',
    icon: '☁️',
    accentColor: '#a78bfa',
    generateImage: async () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e1b4b"/>
              <stop offset="50%" stop-color="#311042"/>
              <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
          </defs>
          <rect width="600" height="600" fill="url(#sky)"/>
          <ellipse cx="250" cy="240" rx="140" ry="45" fill="#a78bfa" opacity="0.35"/>
          <ellipse cx="320" cy="225" rx="110" ry="55" fill="#c084fc" opacity="0.4"/>
          <ellipse cx="380" cy="250" rx="90" ry="35" fill="#e879f9" opacity="0.3"/>
          <ellipse cx="210" cy="380" rx="130" ry="40" fill="#818cf8" opacity="0.25"/>
          <ellipse cx="310" cy="370" rx="160" ry="50" fill="#a78bfa" opacity="0.3"/>
        </svg>
      `;
      return createSvgFile(svg, 'cloud_drift.jpg');
    }
  }
];
