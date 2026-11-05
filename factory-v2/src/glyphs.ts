// Hand-drawn glyph library (Rough.js primitives in a 200x200 box). No AI imagery.
export type P =
  | {k: 'rect'; x: number; y: number; w: number; h: number; c?: string; f?: string; fs?: string}
  | {k: 'circle'; x: number; y: number; d: number; c?: string; f?: string; fs?: string}
  | {k: 'ell'; x: number; y: number; w: number; h: number; c?: string; f?: string; fs?: string}
  | {k: 'line'; x1: number; y1: number; x2: number; y2: number; c?: string; sw?: number}
  | {k: 'poly'; pts: number[][]; c?: string; f?: string; fs?: string}
  | {k: 'path'; d: string; c?: string; f?: string; fs?: string}
  | {k: 'text'; x: number; y: number; s: string; size?: number; c?: string; anchor?: string};

export type Opts = Record<string, any>;
const R = (x: number, y: number, w: number, h: number, c = 'w', f?: string, fs?: string): P => ({k: 'rect', x, y, w, h, c, f, fs});
const C = (x: number, y: number, d: number, c = 'w', f?: string, fs?: string): P => ({k: 'circle', x, y, d, c, f, fs});
const E = (x: number, y: number, w: number, h: number, c = 'w', f?: string, fs?: string): P => ({k: 'ell', x, y, w, h, c, f, fs});
const L = (x1: number, y1: number, x2: number, y2: number, c = 'w', sw?: number): P => ({k: 'line', x1, y1, x2, y2, c, sw});
const PO = (pts: number[][], c = 'w', f?: string, fs?: string): P => ({k: 'poly', pts, c, f, fs});
const PA = (d: string, c = 'w', f?: string, fs?: string): P => ({k: 'path', d, c, f, fs});
const T = (x: number, y: number, s: string, size = 40, c = 'w', anchor = 'middle'): P => ({k: 'text', x, y, s, size, c, anchor});

const person = (o: Opts): P[] => {
  const a: P[] = [C(100, 62, 56, 'w', 'c', 'solid'), PA('M40 192 Q40 124 100 124 Q160 124 160 192 Z', 'w', 'c', 'solid')];
  if (o.hat) a.push(L(66, 46, 134, 46), PA('M76 46 Q76 18 100 18 Q124 18 124 46', 'w', 'c', 'solid'));
  if (o.cap) a.push(PA('M70 44 Q100 16 130 44 Z', 'w', 'r', 'solid'), L(100, 44, 146, 44));
  if (o.glasses) a.push(C(88, 62, 16), C(112, 62, 16), L(96, 62, 104, 62));
  if (o.tie) a.push(PO([[100, 128], [110, 150], [100, 184], [90, 150]], 'r', 'r', 'solid'));
  if (o.scarf) a.push(PA('M62 130 Q100 150 138 130 L138 146 Q100 166 62 146 Z', 'r', 'r', 'solid'));
  if (o.hair) a.push(PA('M72 54 Q100 22 128 54', 'w'));
  if (o.mask) a.push(R(76, 60, 48, 14, 'r', 'r', 'solid'));
  if (o.q) a.push(T(100, 70, '?', 44, 'r'));
  return a;
};

const car = (o: Opts): P[] => {
  const a: P[] = [
    PO([[18, 128], [18, 100], [58, 96], [78, 62], [132, 62], [156, 96], [184, 104], [184, 128]], 'w', 'c', 'solid'),
    PO([[82, 68], [128, 68], [146, 94], [66, 94]], 'w', o.frost ? 'w' : undefined, o.frost ? 'hachure' : undefined),
    C(54, 132, 34, 'w', 'k', 'solid'), C(146, 132, 34, 'w', 'k', 'solid'),
  ];
  if (o.frost) a.push(L(88, 76, 96, 84, 'g'), L(112, 74, 120, 84, 'g'), T(100, 56, '❄', 26, 'w'));
  if (o.warm) a.push(PA('M150 84 Q158 72 150 60 Q142 48 150 36', 'r'), PA('M168 90 Q176 78 168 66 Q160 54 168 42', 'r'));
  return a;
};

const house = (o: Opts): P[] => [
  R(40, 92, 120, 88, 'w', 'c', 'solid'), PO([[28, 96], [100, 40], [172, 96]], 'w', 'c', 'solid'),
  R(86, 128, 30, 52), R(54, 108, 22, 22), R(124, 108, 22, 22),
  ...(o.label ? [T(100, 30, o.label, 22, 'r')] : []),
];

const shed = (): P[] => [R(40, 100, 120, 80, 'w', 'c', 'solid'), PO([[30, 104], [100, 60], [170, 104]], 'w'), R(84, 130, 34, 50), L(40, 126, 76, 126, 'g'), L(124, 126, 160, 126, 'g')];

const therm = (o: Opts): P[] => [R(84, 16, 28, 130, 'w', 'c', 'solid'), C(98, 168, 44, 'w', 'r', 'solid'), R(92, 70, 12, 84, 'r', 'r', 'solid'), T(160, 74, o.t || '-6°', 34, 'r', 'start')];

const snow = (): P[] => [L(100, 30, 100, 170), L(40, 65, 160, 135), L(40, 135, 160, 65), L(88, 40, 100, 52), L(112, 40, 100, 52)];

const moon = (o: Opts): P[] => {
  if (o.phase === 'new') return [C(100, 100, 130, 'g', 'k', 'solid'), T(100, 112, 'NEW MOON', 22, 'g')];
  if (o.phase === 'crescent') return [PA('M120 30 A70 70 0 1 0 120 170 A54 54 0 1 1 120 30 Z', 'w', 'w', 'solid')];
  return [C(100, 100, 130, 'w', 'w', 'solid'), C(76, 82, 22, 'g'), C(122, 118, 30, 'g'), C(110, 64, 14, 'g')];
};

const calendar = (o: Opts): P[] => [
  R(30, 28, 140, 150, 'w', 'c', 'solid'), R(30, 28, 140, 34, 'r', 'r', 'solid'),
  T(100, 54, o.month || 'MARCH', 24, 'w'),
  T(100, 134, String(o.day ?? 9), 70, 'w'),
  ...(o.mark ? [E(52, 78, 96, 84, 'r')] : []),
];

const eye = (o: Opts): P[] => [E(24, 66, 152, 68, 'w', 'c', 'solid'), C(100, 100, 50, 'r', 'r', 'solid'), C(100, 100, 20, 'k', 'k', 'solid'), ...(o.cross ? [L(30, 40, 170, 160, 'r', 8), L(170, 40, 30, 160, 'r', 8)] : [])];

const frame = (o: Opts): P[] => [
  R(36, 24, 128, 152, 'w', 'c', 'solid'), R(52, 40, 96, 120, 'g'),
  ...(o.empty ? [L(100, 12, 100, 24, 'r'), C(100, 10, 10, 'r', 'r', 'solid')] : [PO([[56, 150], [86, 96], [104, 124], [122, 100], [146, 150]], 'w'), C(124, 66, 20, 'r', 'r', 'solid')]),
];

const wallDust = (): P[] => {
  const a: P[] = [R(20, 20, 160, 160, 'g', 'c', 'solid')];
  for (let i = 0; i < 46; i++) { const x = 30 + ((i * 53) % 140), y = 30 + ((i * 37) % 140); a.push(C(x, y, 5 + (i % 3) * 2, 'g', 'g', 'solid')); }
  a.push(C(100, 100, 12, 'w', 'w', 'solid'), L(100, 100, 20, 28, 'w', 2), L(100, 100, 180, 30, 'w', 2), L(100, 100, 40, 176, 'w', 2), L(100, 100, 170, 170, 'w', 2));
  a.push(PA('M100 100 Q60 80 28 40', 'w', undefined), PA('M100 100 Q140 80 172 38', 'w'), PA('M100 100 Q70 140 36 168', 'w'), PA('M100 100 Q140 140 166 164', 'w'));
  return a;
};

const cobweb = (): P[] => [L(20,20,180,180,'w',2),L(20,100,180,100,'w',2),L(100,20,100,180,'w',2),L(20,180,180,20,'w',2),C(100,100,50,'w'),C(100,100,100,'w'),C(100,100,150,'g')];
const magnifier = (): P[] => [C(84, 84, 96, 'w'), L(120, 120, 176, 176, 'w', 10), C(84, 84, 70, 'r')];

const door = (o: Opts): P[] => [R(50, 16, 100, 170, 'w', 'c', 'solid'), R(64, 32, 72, 60), R(64, 104, 72, 70), C(128, 110, 12, 'r', 'r', 'solid'), ...(o.lock ? [C(100, 142, 18, 'r'), L(100, 150, 100, 164, 'r')] : [])];

const puddle = (): P[] => [E(24, 110, 152, 52, 'w', 'w', 'hachure'), E(52, 122, 90, 26, 'w'), L(70, 70, 70, 100, 'w'), PA('M70 60 Q60 80 70 90 Q80 80 70 60 Z', 'w', 'w', 'solid')];

const ice = (): P[] => [PO([[40, 80], [120, 60], [170, 96], [170, 156], [90, 176], [40, 140]], 'w', 'w', 'hachure'), L(40, 80, 90, 112, 'w'), L(90, 112, 170, 96, 'w'), L(90, 112, 90, 176, 'w'), T(150, 40, '✦', 30, 'r')];

const dagger = (): P[] => [PO([[100, 14], [122, 120], [78, 120]], 'w', 'w', 'hachure'), R(60, 120, 80, 12, 'w', 'c', 'solid'), R(92, 132, 16, 44, 'w', 'c', 'solid'), PA('M100 190 Q90 178 100 168 Q110 178 100 190 Z', 'r', 'r', 'solid')];

const truck = (): P[] => [R(14, 60, 108, 74, 'w', 'c', 'solid'), PO([[122, 80], [158, 80], [184, 108], [184, 134], [122, 134]], 'w', 'c', 'solid'), C(52, 140, 34, 'w', 'k', 'solid'), C(150, 140, 34, 'w', 'k', 'solid'), PO([[40, 80], [70, 72], [96, 92], [96, 116], [40, 116]], 'w', 'w', 'hachure')];

const bubble = (o: Opts): P[] => [PA('M20 30 H180 V130 H90 L60 168 L64 130 H20 Z', 'w', 'c', 'solid'), T(100, 92, o.t || '...', 50, 'r')];

const barn = (): P[] => [PO([[26, 98], [50, 54], [150, 54], [174, 98], [174, 178], [26, 178]], 'w', 'c', 'solid'), R(76, 116, 48, 62), L(76, 116, 124, 178), L(124, 116, 76, 178)];
const well = (): P[] => [R(52, 104, 96, 72, 'w', 'c', 'solid'), PO([[40, 64], [100, 30], [160, 64]], 'w'), L(58, 64, 58, 104), L(142, 64, 142, 104), L(100, 64, 100, 90), E(60, 98, 80, 16, 'w')];
const attic = (): P[] => [PO([[30, 100], [100, 28], [170, 100]], 'w', 'c', 'solid'), R(40, 100, 120, 76, 'w', 'c', 'solid'), C(100, 76, 26, 'w'), L(100, 63, 100, 89), L(87, 76, 113, 76)];
const library = (): P[] => [R(30, 30, 140, 150, 'w', 'c', 'solid'), L(30, 80, 170, 80), L(30, 130, 170, 130), R(42, 42, 14, 36), R(60, 46, 14, 32), R(78, 40, 14, 38, 'r', 'r', 'solid'), R(44, 92, 16, 36), R(64, 96, 14, 32), R(110, 92, 14, 36), R(42, 142, 14, 36), R(60, 146, 18, 32)];
const garage = (): P[] => [R(24, 74, 152, 106, 'w', 'c', 'solid'), PO([[20, 78], [100, 40], [180, 78]], 'w'), L(40, 100, 160, 100), L(40, 120, 160, 120), L(40, 140, 160, 140), L(40, 160, 160, 160)];
const cellar = (): P[] => [PO([[30, 150], [60, 90], [140, 90], [170, 150]], 'w', 'c', 'solid'), R(66, 96, 68, 54, 'g'), L(66, 123, 134, 123, 'g'), C(100, 110, 8, 'r', 'r', 'solid'), L(20, 170, 180, 170, 'w')];

const phone = (o: Opts): P[] => [R(56, 10, 88, 180, 'w', 'c', 'solid'), R(64, 28, 72, 128, 'g'), C(100, 172, 14), ...(o.msg ? [PA('M68 56 H132 V104 H96 L84 120 L86 104 H68 Z', 'r', 'r', 'hachure')] : [])];
const paper = (o: Opts): P[] => [PO([[44, 20], [150, 20], [160, 30], [160, 182], [44, 182]], 'w', 'c', 'solid'), L(60, 56, 140, 56, 'g'), L(60, 80, 140, 80, 'g'), L(60, 104, 120, 104, 'g'), ...(o.semi ? [T(100, 172, ';', 90, 'r')] : [L(60, 128, 130, 128, 'g')])];
const semicolon = (): P[] => [T(100, 150, ';', 190, 'r')];

const cat = (): P[] => [E(40, 110, 100, 58, 'w', 'c', 'solid'), C(130, 86, 56, 'w', 'c', 'solid'), PO([[110, 66], [112, 36], [128, 56]], 'w', 'c', 'solid'), PO([[136, 56], [152, 34], [156, 66]], 'w', 'c', 'solid'), C(120, 84, 7, 'r', 'r', 'solid'), C(142, 84, 7, 'r', 'r', 'solid'), PA('M40 140 Q8 130 16 90 Q22 70 34 82', 'w'), L(124, 98, 100, 94, 'g'), L(124, 102, 102, 106, 'g')];
const inhaler = (): P[] => [R(58, 24, 62, 100, 'w', 'c', 'solid'), PO([[58, 124], [120, 124], [150, 150], [150, 176], [90, 176], [58, 150]], 'w', 'c', 'solid'), R(70, 44, 38, 22, 'r', 'r', 'solid'), L(70, 84, 108, 84, 'g')];
const sneeze = (): P[] => [T(100, 120, 'ACHOO!', 40, 'r'), L(40, 60, 70, 80, 'w'), L(160, 60, 130, 80, 'w'), L(100, 30, 100, 56, 'w')];

const shower = (): P[] => [PA('M30 40 H110 Q150 40 150 80 V100', 'w'), PA('M110 100 Q150 100 150 100', 'w'), PA('M80 100 L150 100 L168 124 L62 124 Z', 'w', 'c', 'solid'), L(76, 140, 70, 170, 'w'), L(100, 140, 98, 176, 'w'), L(124, 140, 126, 170, 'w'), L(148, 140, 156, 166, 'w'), PA('M40 20 Q30 10 40 0', 'r')];
const mirror = (o: Opts): P[] => [E(34, 14, 132, 172, 'w', o.fog ? 'w' : 'c', o.fog ? 'hachure' : 'solid'), E(48, 28, 104, 144, 'g'), L(70, 60, 90, 44, 'g'), L(74, 82, 108, 52, 'g')];
const steam = (): P[] => [PA('M50 170 Q30 140 50 110 Q70 80 50 50', 'r'), PA('M100 170 Q80 140 100 110 Q120 80 100 50', 'r'), PA('M150 170 Q130 140 150 110 Q170 80 150 50', 'r')];
const drop = (): P[] => [PA('M100 30 Q60 100 100 160 Q140 100 100 30 Z', 'w', 'w', 'hachure')];

const tv = (o: Opts): P[] => [R(18, 34, 164, 122, 'w', 'c', 'solid'), R(32, 48, 112, 94, 'w'), L(70, 156, 56, 180), L(130, 156, 144, 180), ...(o.day ? [C(60, 74, 26, 'r', 'r', 'solid'), L(60, 50, 60, 42, 'r'), L(36, 74, 28, 74, 'r'), L(84, 74, 92, 74, 'r'), PO([[32, 142], [32, 112], [144, 112], [144, 142]], 'g', 'g', 'hachure')] : []), C(162, 74, 10, 'r', 'r', 'solid'), C(162, 100, 10)];
const sun = (): P[] => [C(100, 100, 70, 'r', 'r', 'solid'), ...[0, 45, 90, 135, 180, 225, 270, 315].map((a) => L(100 + 54 * Math.cos((a * Math.PI) / 180), 100 + 54 * Math.sin((a * Math.PI) / 180), 100 + 84 * Math.cos((a * Math.PI) / 180), 100 + 84 * Math.sin((a * Math.PI) / 180), 'r'))];
const clock = (o: Opts): P[] => {
  const h = ((o.h ?? 9) % 12 + (o.m ?? 0) / 60) * 30, m = (o.m ?? 0) * 6, rad = (a: number) => ((a - 90) * Math.PI) / 180;
  return [C(100, 100, 160, 'w', 'c', 'solid'), L(100, 100, 100 + 40 * Math.cos(rad(h)), 100 + 40 * Math.sin(rad(h)), 'w', 8), L(100, 100, 100 + 62 * Math.cos(rad(m)), 100 + 62 * Math.sin(rad(m)), 'r', 5), C(100, 100, 8, 'r', 'r', 'solid'), L(100, 28, 100, 40), L(172, 100, 160, 100), L(100, 172, 100, 160), L(28, 100, 40, 100)];
};
const arrow = (o: Opts): P[] => (o.dir === 'left' ? [L(170, 100, 30, 100, 'r', 7), L(30, 100, 62, 76, 'r', 7), L(30, 100, 62, 124, 'r', 7)] : [L(30, 100, 170, 100, 'r', 7), L(170, 100, 138, 76, 'r', 7), L(170, 100, 138, 124, 'r', 7)]);
const check = (): P[] => [L(34, 104, 80, 152, 'r', 14), L(80, 152, 170, 48, 'r', 14)];
const cross = (): P[] => [L(40, 40, 160, 160, 'r', 14), L(160, 40, 40, 160, 'r', 14)];
const key = (): P[] => [C(54, 100, 56, 'w'), L(82, 100, 176, 100), L(150, 100, 150, 126), L(170, 100, 170, 120)];
const qmark = (): P[] => [T(100, 160, '?', 190, 'r')];
const question = qmark;
const guard = (o: Opts): P[] => person({hat: true, ...o});
const gun = (): P[] => [];
const door2 = (o: Opts): P[] => door(o);
const bank = (): P[] => [PO([[20, 70], [100, 28], [180, 70]], 'w', 'c', 'solid'), R(30, 70, 140, 10), R(40, 84, 16, 70), R(80, 84, 16, 70), R(120, 84, 16, 70), R(150, 84, 16, 70), R(24, 156, 152, 16), T(100, 58, '$', 26, 'r')];
const postoffice = (): P[] => [R(30, 60, 140, 110, 'w', 'c', 'solid'), PO([[20, 64], [100, 30], [180, 64]], 'w'), R(60, 90, 80, 50, 'w'), L(60, 90, 100, 122), L(140, 90, 100, 122), T(100, 163, 'MAIL', 18, 'r')];
const pharmacy = (): P[] => [R(30, 40, 140, 130, 'w', 'c', 'solid'), L(100, 62, 100, 110, 'r', 14), L(76, 86, 124, 86, 'r', 14), R(78, 126, 44, 44), T(100, 30, '', 10)];
const market = (): P[] => [PO([[24, 70], [176, 70], [166, 40], [34, 40]], 'r', 'r', 'hachure'), R(30, 70, 140, 100, 'w', 'c', 'solid'), C(70, 130, 30, 'w'), C(110, 130, 30, 'w'), C(148, 130, 24, 'w')];
const bakery = (): P[] => [E(40, 80, 120, 70, 'w', 'c', 'solid'), L(66, 90, 76, 130, 'g'), L(98, 84, 100, 134, 'g'), L(130, 90, 124, 130, 'g')];
const till = (): P[] => [R(30, 90, 140, 70, 'w', 'c', 'solid'), R(50, 50, 100, 40, 'w'), T(100, 80, '$', 30, 'r'), R(40, 160, 120, 14, 'w'), L(50, 118, 150, 118, 'g')];
const home = (): P[] => house({});
const stage = (): P[] => [R(30, 30, 140, 140, 'w', 'c', 'solid'), R(48, 48, 104, 70, 'g'), T(100, 150, '', 10)];
const vase = (): P[] => [PA('M80 30 H120 Q116 60 140 90 Q156 130 120 176 H80 Q44 130 60 90 Q84 60 80 30 Z', 'w', 'c', 'solid'), PA('M70 120 L96 110 L90 130 L120 124', 'r')];
const necklace = (): P[] => [PA('M30 40 Q100 190 170 40', 'w'), C(100, 146, 26, 'r', 'r', 'solid'), C(52, 104, 10, 'w'), C(76, 130, 10, 'w'), C(148, 104, 10, 'w'), C(124, 130, 10, 'w')];
const jewel = (): P[] => [PO([[60, 60], [140, 60], [170, 94], [100, 170], [30, 94]], 'r', 'r', 'hachure'), L(30, 94, 170, 94), L(60, 60, 78, 94), L(140, 60, 122, 94), L(78, 94, 100, 170), L(122, 94, 100, 170)];
const camera = (): P[] => [R(36, 66, 128, 80, 'w', 'c', 'solid'), C(100, 106, 50, 'w'), C(100, 106, 22, 'r', 'r', 'solid'), R(60, 50, 34, 16)];
const tape = (): P[] => [R(26, 50, 148, 100, 'w', 'c', 'solid'), C(66, 100, 40, 'w'), C(134, 100, 40, 'w'), L(66, 126, 134, 126, 'r', 4), T(100, 176, 'REC', 20, 'r')];
const sky = (): P[] => [C(100, 100, 100, 'g'), T(100, 118, '9 PM', 40, 'g')];
const bag = (): P[] => [PA('M44 70 H156 L170 180 H30 Z', 'w', 'c', 'solid'), PA('M72 70 Q72 30 100 30 Q128 30 128 70', 'w'), T(100, 140, '$', 50, 'r')];
const fishing = (): P[] => [L(20, 170, 180, 30, 'w', 5), L(180, 30, 180, 90, 'g'), C(180, 100, 14, 'r')];
const rooms = (): P[] => [R(20, 40, 70, 130, 'w', 'c', 'solid'), R(110, 40, 70, 130, 'w', 'c', 'solid'), T(55, 118, 'A', 44, 'w'), T(145, 118, 'B', 44, 'w')];
const thief = (): P[] => [C(100, 62, 56, 'w', 'c', 'solid'), PA('M40 192 Q40 124 100 124 Q160 124 160 192 Z', 'w', 'c', 'solid'), R(72, 54, 56, 16, 'r', 'r', 'solid')];
const chalk = (): P[] => [C(100, 40, 36, 'w'), L(100, 58, 100, 120), L(100, 70, 56, 100), L(100, 70, 144, 100), L(100, 120, 66, 176), L(100, 120, 134, 176)];


const cherry = (): P[] => [PA('M100 24 Q84 70 66 120', 'w'), PA('M100 24 Q116 70 134 120', 'w'), C(66, 138, 52, 'r', 'r', 'solid'), C(134, 138, 52, 'r', 'r', 'solid'), PA('M100 24 Q130 16 150 30 Q130 44 100 24 Z', 'w', 'w', 'hachure')];
const tree = (o: Opts): P[] => [R(88, 100, 24, 80, 'w', 'c', 'solid'), ...(o.bare ? [L(100, 100, 58, 48), L(100, 100, 142, 48), L(100, 84, 100, 28), L(58, 48, 34, 40), L(58, 48, 50, 22), L(142, 48, 168, 40), L(142, 48, 150, 22), L(100, 60, 78, 40), L(100, 60, 124, 40)] : [C(100, 70, 120, 'w', 'c', 'hachure'), C(72, 80, 14, 'r', 'r', 'solid'), C(124, 60, 14, 'r', 'r', 'solid'), C(104, 98, 14, 'r', 'r', 'solid')])];
const hand = (o: Opts): P[] => {
  const a: P[] = [PA('M50 180 L50 110 Q46 80 60 80 L60 40 Q60 28 72 28 Q84 28 84 40 L84 30 Q84 18 96 18 Q108 18 108 30 L108 38 Q108 26 120 26 Q132 26 132 38 L132 60 Q146 52 150 70 L150 130 Q150 180 120 180 Z', 'w', 'c', 'solid')];
  if (o.wrinkle) {for (const x of [72, 96, 120]) a.push(PA(`M${x - 8} 36 q8 6 0 12 q-8 6 0 12`, 'r'));} else {for (const x of [72, 96, 120]) a.push(L(x - 6, 40, x + 6, 40, 'g', 2));}
  return a;
};
const pool = (): P[] => [R(20, 60, 160, 110, 'w', 'c', 'solid'), PA('M30 100 q15 -12 30 0 t30 0 t30 0 t30 0', 'w'), PA('M30 130 q15 -12 30 0 t30 0 t30 0 t30 0', 'w'), PA('M30 154 q15 -12 30 0 t30 0 t30 0 t30 0', 'w'), L(150, 60, 150, 20, 'r', 5), L(170, 60, 170, 20, 'r', 5)];
const wax = (): P[] => [R(70, 70, 60, 100, 'w', 'w', 'hachure'), L(100, 70, 100, 50, 'w'), PA('M100 50 Q86 36 100 20 Q114 36 100 50 Z', 'r', 'r', 'solid'), PA('M70 92 q-8 20 0 30', 'w'), PA('M130 100 q8 20 0 34', 'w')];
const mold = (): P[] => [R(30, 70, 140, 70, 'w', 'w', 'hachure'), C(66, 104, 34, 'c', 'c', 'solid'), L(78, 104, 150, 104, 'c', 6), L(138, 104, 138, 124, 'c', 6), L(122, 104, 122, 120, 'c', 6)];
const doors3 = (o: Opts): P[] => {
  const a: P[] = [];
  [0, 1, 2].forEach((i) => {
    const x = 14 + i * 62, n = i + 1;
    if (o.open === n) a.push(R(x, 40, 52, 120, 'g', 'c', 'solid'), T(x + 26, 112, '✕', 40, 'g'));
    else a.push(R(x, 40, 52, 120, o.pick === n ? 'r' : 'w', 'c', 'solid'), C(x + 40, 104, 7, 'r', 'r', 'solid'), T(x + 26, 80, String(n), 34, o.pick === n ? 'r' : 'w'));
  });
  if (o.q) a.push(T(100, 190, o.q, 22, 'r'));
  return a;
};
const bolt = (): P[] => [L(20, 170, 176, 30, 'w', 5), PO([[176, 30], [160, 30], [176, 46]], 'r', 'r', 'solid'), L(20, 170, 8, 160, 'r', 4), L(32, 158, 16, 150, 'r', 4), L(44, 146, 28, 138, 'r', 4)];
const sandprints = (): P[] => [R(14, 50, 172, 130, 'w', 'c', 'hachure'), E(40, 130, 22, 12, 'w'), E(64, 108, 22, 12, 'w'), E(88, 130, 22, 12, 'w'), E(112, 108, 22, 12, 'w'), E(136, 130, 22, 12, 'w'), T(100, 36, 'ONE SET ONLY', 20, 'r')];
const bench = (o: Opts): P[] => [R(24, 90, 152, 20, 'w', o.wet ? 'r' : 'c', o.wet ? 'hachure' : 'solid'), L(44, 110, 44, 170), L(156, 110, 156, 170), L(24, 70, 176, 70), L(24, 70, 24, 90), L(176, 70, 176, 90)];
const spill = (): P[] => [PA('M70 20 H130 Q132 90 100 104 Q68 90 70 20 Z', 'w', 'r', 'hachure'), L(100, 104, 100, 160), L(70, 160, 130, 160), E(40, 168, 120, 22, 'r', 'r', 'solid')];
const word = (o: Opts): P[] => [T(100, o.y || 116, o.s || '', o.size || 64, o.c || 'w'), L(30, (o.y || 116) + 16, 170, (o.y || 116) + 16, 'r', 4)];
const waiter = (): P[] => [...person({}), R(20, 150, 60, 12, 'w', 'c', 'solid'), PO([[40, 150], [60, 150], [56, 122], [44, 122]], 'r', 'r', 'solid')];

export const GLYPHS: Record<string, (o: Opts) => P[]> = {
  person, car, house, shed, therm, snow, moon, calendar, eye, frame, wallDust, cobweb, magnifier, door, puddle, ice, dagger, truck, bubble, barn, well, attic, library, garage, cellar,
  phone, paper, semicolon, cat, inhaler, sneeze, shower, mirror, steam, drop, tv, sun, clock, arrow, check, cross, key, qmark, question, guard, gun, door2, bank, postoffice, pharmacy,
  market, bakery, till, home, stage, vase, necklace, jewel, camera, tape, sky, bag, fishing, rooms, thief, chalk, cherry, tree, hand, pool, wax, mold, doors3, bolt, sandprints, bench, spill, word, waiter,
};
