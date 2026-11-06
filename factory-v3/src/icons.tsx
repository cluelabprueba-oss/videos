import {Op, R, C, E, L, P, PA, CV, INK, RED, CHAR, BLACK} from './sketch';

const hatch = (c = INK, g = 9) => ({fill: c, fillStyle: 'hachure', hachureGap: g, fillWeight: 2.5});
const solid = (c: string) => ({fill: c, fillStyle: 'solid'});
const red = {stroke: RED};

// All icons drawn in a 200x200 box.
const sun = (x: number, y: number, r = 22): Op[] => [
  C(x, y, r * 2, {...red, ...hatch(RED, 6)}),
  ...[0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
    L(x + Math.cos((a * Math.PI) / 180) * (r + 8), y + Math.sin((a * Math.PI) / 180) * (r + 8),
      x + Math.cos((a * Math.PI) / 180) * (r + 20), y + Math.sin((a * Math.PI) / 180) * (r + 20), {...red, strokeWidth: 4})),
];
const person = (x: number, y: number, h = 90, o: any = {}): Op[] => [
  C(x, y - h * 0.5, h * 0.22, o),
  L(x, y - h * 0.38, x, y + h * 0.1, o),
  L(x - h * 0.22, y - h * 0.22, x + h * 0.22, y - h * 0.22, o),
  L(x, y + h * 0.1, x - h * 0.16, y + h * 0.5, o),
  L(x, y + h * 0.1, x + h * 0.16, y + h * 0.5, o),
];
const hand = (smudge = false, tips = false, label = ''): Op[] => [
  PA('M60 170 L55 90 Q54 78 66 78 Q76 78 76 90 L78 40 Q79 28 90 29 Q100 30 100 42 L100 30 Q101 18 112 19 Q122 20 122 32 L122 40 Q124 28 134 30 Q144 32 143 44 L145 100 Q148 130 130 150 L128 170 Z'),
  ...(smudge ? [PA('M60 172 L55 92 L66 92 L70 170 Z', {...hatch(INK, 5), stroke: 'none'}), L(52, 95, 52, 165, {strokeWidth: 9, stroke: INK})] : []),
  ...(tips ? [C(90, 36, 14, {...red, ...solid(RED)}), C(112, 28, 14, {...red, ...solid(RED)}), C(134, 38, 14, {...red, ...solid(RED)}), C(67, 82, 14, {...red, ...solid(RED)})] : []),
];
const door = (): Op[] => [R(55, 30, 90, 140), R(65, 42, 70, 118), C(126, 100, 8, solid(INK))];
const sleeve = (paint: string | null): Op[] => [
  PA('M50 40 L100 22 L150 40 L180 140 L145 150 L135 90 L135 175 L65 175 L65 90 L55 150 L20 140 Z'),
  ...(paint === 'white' ? [PA('M110 120 Q125 100 150 125 Q145 150 118 148 Z', {...solid(INK), stroke: INK})] : []),
  ...(paint === 'gray' ? [PA('M110 120 Q125 100 150 125 Q145 150 118 148 Z', {...hatch(INK, 5), stroke: INK})] : []),
];

export const ICONS: Record<string, () => Op[]> = {
  calendar: () => [R(30, 40, 140, 130), R(30, 40, 140, 30, {...hatch(RED, 6), stroke: RED}),
    L(65, 28, 65, 52), L(135, 28, 135, 52),
    ...[0, 1, 2, 3, 4].map((i) => L(45 + i * 28, 95, 45 + i * 28, 160, {strokeWidth: 2.5})),
    L(40, 120, 160, 120, {strokeWidth: 2.5}), L(40, 145, 160, 145, {strokeWidth: 2.5}),
    C(100, 108, 34, {...red, strokeWidth: 6})],
  train: () => [R(25, 60, 150, 80, {...hatch(INK, 12)}), R(40, 75, 30, 28), R(85, 75, 30, 28), R(130, 75, 30, 28),
    C(55, 152, 24), C(145, 152, 24), L(10, 176, 190, 176), L(30, 50, 170, 50, red)],
  nurse: () => [C(100, 70, 60), P([[60, 50], [100, 30], [140, 50]], red), R(92, 36, 16, 6, solid(RED)),
    PA('M45 180 Q45 125 100 125 Q155 125 155 180', {}), R(94, 142, 12, 30, {...solid(RED), stroke: RED}), R(85, 151, 30, 12, {...solid(RED), stroke: RED})],
  shadowshort: () => [...sun(100, 35), ...person(100, 115, 100), E(100, 170, 44, 10, {...hatch(INK, 4)}), L(20, 176, 180, 176, {strokeWidth: 3})],
  shadowlong: () => [...sun(40, 55, 18), ...person(70, 115, 100), P([[70, 168], [190, 176], [190, 168]], {...hatch(INK, 4), stroke: INK, strokeWidth: 3}), L(10, 170, 190, 170, {strokeWidth: 3})],
  ice: () => [P([[45, 40], [155, 40], [135, 175], [65, 175]]), R(68, 70, 34, 34, {...red, rotation: 0}), R(100, 95, 34, 34, red), L(60, 150, 140, 150, {strokeWidth: 3}),
    PA('M70 25 Q75 10 80 25', {strokeWidth: 3})],
  heir: () => [P([[30, 150], [30, 70], [65, 105], [100, 50], [135, 105], [170, 70], [170, 150]], {...hatch(RED, 7), stroke: RED}), L(30, 165, 170, 165), C(100, 50, 14, solid(INK))],
  inktips: () => hand(false, true),
  cleanhands: () => [...hand(false, false), ...[[160, 60], [168, 90], [152, 40]].map(([x, y]) => L(x - 8, y, x + 8, y, {strokeWidth: 3})), L(155, 50, 155, 70, {strokeWidth: 3})],
  handedge: () => hand(true, false),
  shouting: () => [P([[20, 70], [60, 55], [75, 25], [100, 50], [135, 30], [140, 60], [180, 70], [150, 95], [175, 125], [130, 120], [115, 160], [95, 125], [55, 150], [60, 110]], {...hatch(INK, 10), stroke: INK}), PA('M85 85 L115 85', {strokeWidth: 6, stroke: RED})],
  nokinfe: () => [P([[40, 150], [140, 40], [150, 60], [75, 160]]), R(30, 148, 24, 30, {...hatch(INK, 6)}), C(100, 100, 150, {...red, strokeWidth: 8}), L(36, 164, 164, 36, {...red, strokeWidth: 8})],
  body: () => [C(50, 100, 30, {strokeDasharray: [6, 6]} as any), PA('M68 100 L150 100 M150 100 L180 78 M150 100 L180 125 M100 100 L98 62 M115 100 L125 138', {strokeWidth: 6}), PA('M20 170 L180 170', {strokeWidth: 3})],
  leaving: () => [...door(), L(100, 100, 190, 100, red), L(170, 82, 190, 100, red), L(170, 118, 190, 100, red)],
  arriving: () => [...door(), L(10, 100, 70, 100, red), L(50, 82, 70, 100, red), L(50, 118, 70, 100, red)],
  arrive8: () => [...door(), L(10, 100, 70, 100, red), L(50, 82, 70, 100, red), L(50, 118, 70, 100, red),
    PA('M150 20 Q155 5 160 20 M165 22 Q170 8 175 22 M135 18 Q140 4 145 18', {...red, strokeWidth: 4})],
  leave730: () => [C(100, 100, 150), L(100, 100, 100, 45, {strokeWidth: 6}), L(100, 100, 135, 120, {strokeWidth: 6, stroke: RED}), C(100, 100, 8, solid(INK))],
  hedge: () => [PA('M30 150 Q10 120 40 105 Q30 70 70 70 Q80 35 115 55 Q150 40 155 85 Q190 100 165 140 Q175 160 150 165 L50 165 Q35 165 30 150 Z', {...hatch(INK, 8)}),
    L(80, 20, 110, 60, red), L(120, 20, 90, 60, red)],
  walksand: () => [PA('M60 40 Q50 60 60 80 Q68 70 66 50 Z M90 90 Q80 110 90 130 Q98 120 96 100 Z M130 60 Q120 80 130 100 Q138 90 136 70 Z', {...hatch(INK, 6)}), PA('M10 180 Q50 165 100 178 T190 175', {strokeWidth: 3}),
    PA('M10 30 Q40 15 70 28 T130 25', {...red, strokeWidth: 4})],
  receipt: () => [PA('M45 20 L155 20 L155 175 L140 165 L125 175 L110 165 L95 175 L80 165 L65 175 L50 165 L45 175 Z'), L(65, 55, 135, 55, {strokeWidth: 3}), L(65, 80, 135, 80, {strokeWidth: 3}), L(65, 105, 115, 105, {strokeWidth: 3}), R(70, 125, 60, 22, red)],
  gps: () => [PA('M100 185 Q50 120 50 80 Q50 30 100 30 Q150 30 150 80 Q150 120 100 185 Z', {...hatch(RED, 6), stroke: RED}), C(100, 80, 34), PA('M10 190 Q50 175 100 190 T190 188', {strokeWidth: 3})],
  bowl: () => [PA('M25 95 Q30 170 100 170 Q170 170 175 95 Z', {...hatch(INK, 9)}), E(100, 95, 150, 26), PA('M80 70 Q70 50 82 30 M110 72 Q100 50 112 28 M138 70 Q128 52 140 34', {...red, strokeWidth: 4})],
  steady: () => [PA('M15 100 L60 100 L75 60 L95 140 L115 80 L130 100 L185 100', {...red, strokeWidth: 6}), L(15, 150, 185, 150, {strokeWidth: 3})],
  lost: () => [PA('M40 150 Q20 60 90 60 Q160 60 140 120 Q120 170 70 130 Q40 100 100 100 Q130 105 120 90', {strokeWidth: 5}), L(150, 30, 175, 55, red), L(175, 30, 150, 55, red)],
  extra: () => [PA('M25 40 L175 40 L175 130 L95 130 L55 170 L60 130 L25 130 Z'), L(100, 62, 100, 108, {...red, strokeWidth: 7}), L(77, 85, 123, 85, {...red, strokeWidth: 7})],
  cleansleeve: () => sleeve(null),
  whitesleeve: () => sleeve('white'),
  greyhands: () => [...hand(false, false), C(100, 125, 70, {...hatch(INK, 5), stroke: 'none'})],
  gun: () => [P([[20, 70], [140, 70], [140, 100], [95, 100], [90, 150], [60, 150], [62, 100], [20, 100]], {...hatch(INK, 8)}), C(100, 100, 3)],
  shop: () => [P([[20, 70], [40, 30], [160, 30], [180, 70]], {...hatch(RED, 7), stroke: RED}), R(30, 70, 140, 100), R(55, 100, 45, 70), R(115, 95, 40, 40, red)],
  glasses: () => [C(55, 100, 70), C(145, 100, 70), PA('M90 95 Q100 82 110 95', {}), L(20, 90, 5, 75), L(180, 90, 195, 75), L(35, 130, 75, 70, {...red, strokeWidth: 3})],
  rain: () => [PA('M40 90 Q20 90 25 65 Q30 40 60 45 Q70 20 105 28 Q140 25 150 55 Q180 55 175 85 Q172 92 160 90 Z', hatch(INK, 9)),
    ...[50, 80, 110, 140].map((x, i) => L(x, 115 + (i % 2) * 14, x - 12, 150 + (i % 2) * 14, {...red, strokeWidth: 5})), L(60, 175, 150, 175, {strokeWidth: 3})],
  wave: () => [PA('M10 100 Q35 60 60 100 T110 100 T160 100 T200 90', {strokeWidth: 6}), PA('M10 135 Q35 95 60 135 T110 135 T160 135 T200 125', {...red, strokeWidth: 6}), PA('M10 170 Q35 130 60 170 T110 170 T160 170 T200 160', {strokeWidth: 6}), C(150, 45, 36, {...red, ...hatch(RED, 6)})],
  door: () => [R(55, 25, 90, 150), R(66, 38, 68, 124), C(122, 100, 8, solid(INK)), L(30, 178, 170, 178, {strokeWidth: 3})],
  firework: () => [...[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => L(100 + Math.cos(a * Math.PI / 180) * 22, 70 + Math.sin(a * Math.PI / 180) * 22, 100 + Math.cos(a * Math.PI / 180) * 62, 70 + Math.sin(a * Math.PI / 180) * 62, {...red, strokeWidth: 6})),
    C(100, 70, 14, {...red, ...solid(RED)}), L(100, 100, 100, 175, {strokeWidth: 5}), PA('M10 185 L190 185', {strokeWidth: 3})],
  keyx: () => [C(60, 80, 56), L(88, 100, 170, 150), L(140, 134, 130, 155), L(158, 143, 148, 165), L(30, 30, 170, 170, {...red, strokeWidth: 8}), L(170, 30, 30, 170, {...red, strokeWidth: 8})],
  bar: () => [P([[30, 150], [60, 80], [150, 80], [180, 150]], {...hatch(RED, 7), stroke: RED}), P([[30, 150], [180, 150], [180, 170], [30, 170]], {...hatch(INK, 8)}), L(70, 112, 140, 112, {strokeWidth: 3})],
  faceeyes: () => [C(100, 100, 150), C(70, 85, 34), C(130, 85, 34), C(70, 85, 10, solid(INK)), C(130, 85, 10, solid(INK)), PA('M60 135 Q100 160 140 140', {strokeWidth: 5}), L(48, 55, 90, 62, {strokeWidth: 4}), L(152, 55, 110, 62, {strokeWidth: 4})],
  facemouth: () => [C(100, 100, 150), C(70, 80, 26, {}), C(130, 80, 26, {}), E(100, 138, 50, 56, {...red, ...hatch(RED, 6)}), L(24, 150, 8, 100, {strokeWidth: 4}), L(176, 150, 192, 100, {strokeWidth: 4})],
  facepale: () => [C(100, 100, 150, hatch(INK, 14)), L(60, 80, 84, 80, {strokeWidth: 5}), L(116, 80, 140, 80, {strokeWidth: 5}), PA('M70 140 Q100 125 130 140', {strokeWidth: 5}), PA('M150 50 Q158 66 150 74', {...red, strokeWidth: 4})],
  facelines: () => [C(100, 100, 150), L(52, 80, 80, 80, {strokeWidth: 5}), L(120, 80, 148, 80, {strokeWidth: 5}), PA('M70 135 Q100 150 130 135', {strokeWidth: 5}), L(138, 95, 170, 90, {...red, strokeWidth: 6}), L(140, 108, 172, 104, {...red, strokeWidth: 6}), L(138, 121, 168, 118, {...red, strokeWidth: 6})],
  facesmooth: () => [C(100, 100, 150), L(52, 80, 80, 80, {strokeWidth: 5}), L(120, 80, 148, 80, {strokeWidth: 5}), E(100, 140, 40, 26, {}), PA('M150 90 Q165 100 150 112', {strokeWidth: 3})],
  chain: () => [...[0, 1, 2, 3].map((i) => E(35 + i * 42, 100, 56, 34, {rotation: 0})), L(10, 60, 10, 140, {stroke: INK}), L(110, 60, 120, 140, {...red, strokeWidth: 3}), L(122, 60, 112, 140, {...red, strokeWidth: 3})],
  bus: () => [R(20, 55, 160, 90, {...hatch(RED, 10), stroke: RED}), R(35, 70, 36, 30), R(82, 70, 36, 30), R(129, 70, 36, 30), C(55, 152, 26), C(145, 152, 26), L(10, 178, 190, 178)],
  bottle: () => [P([[85, 20], [115, 20], [115, 70], [140, 100], [140, 180], [60, 180], [60, 100], [85, 70]], {...hatch(INK, 10)}), R(85, 10, 30, 22, red), C(100, 14, 5, solid(RED))],
  candle: () => [R(75, 80, 50, 100, {...hatch(RED, 7), stroke: RED}), PA('M100 80 L100 62', {strokeWidth: 4}), PA('M100 20 Q125 48 100 64 Q75 48 100 20', {...hatch(INK, 5)}), PA('M75 100 Q70 125 78 135', {...red, strokeWidth: 4})],
  keyboard: () => [R(10, 50, 180, 100), ...[0, 1, 2, 3, 4, 5, 6].map((i) => R(22 + i * 24, 62, 18, 18, {strokeWidth: 3})), ...[0, 1, 2, 3, 4, 5].map((i) => R(30 + i * 24, 88, 18, 18, {strokeWidth: 3})), R(34, 114, 130, 22, {strokeWidth: 3}), R(70 + 24, 88, 18, 18, {...red, ...solid(RED)})],
  boot: () => [PA('M60 20 L60 120 Q60 140 30 150 L30 180 L160 180 L160 150 Q130 150 110 120 L110 20 Z', {...hatch(INK, 9)}), L(30, 170, 160, 170, {strokeWidth: 3}), ...[0, 1, 2, 3].map((i) => L(45 + i * 28, 172, 45 + i * 28, 182, {...red, strokeWidth: 5}))],
  eyes: () => [E(55, 100, 70, 34, {}), E(145, 100, 70, 34, {}), C(55, 100, 22, solid(INK)), C(145, 100, 22, solid(INK)), L(25, 70, 85, 76, {strokeWidth: 4}), L(175, 70, 115, 76, {strokeWidth: 4})],
  redeyes: () => [E(55, 100, 70, 44, {}), E(145, 100, 70, 44, {}), C(55, 100, 34, {...red, ...solid(RED)}), C(145, 100, 34, {...red, ...solid(RED)}), C(55, 100, 10, solid(BLACK)), C(145, 100, 10, solid(BLACK)), L(15, 40, 40, 56, {...red, strokeWidth: 5}), L(185, 40, 160, 56, {...red, strokeWidth: 5})],
  sun: () => [...sun(100, 100, 40)],
  road: () => [P([[70, 20], [130, 20], [190, 180], [10, 180]], {...hatch(INK, 12)}), L(100, 30, 100, 60, {strokeWidth: 5}), L(100, 80, 100, 115, {strokeWidth: 5}), L(100, 135, 100, 175, {strokeWidth: 5}), L(110, 150, 170, 150, {...red, strokeWidth: 6}), L(150, 135, 170, 150, {...red, strokeWidth: 6}), L(150, 165, 170, 150, {...red, strokeWidth: 6})],
  question: () => [PA('M65 70 Q65 25 105 25 Q145 25 145 65 Q145 95 105 110 L105 135', {...red, strokeWidth: 12}), C(105, 168, 14, {...solid(RED), stroke: RED})],
  clock: () => [C(100, 100, 150), L(100, 100, 100, 50, {strokeWidth: 6}), L(100, 100, 135, 110, {strokeWidth: 6, stroke: RED})],
};

export const portrait = (idx: number): Op[] => {
  const body: Op[] = [
    PA('M20 190 Q20 125 100 120 Q180 125 180 190 Z', {...hatch(INK, 9), stroke: INK}),
    C(100, 78, 58, {...solid(CHAR), stroke: INK, strokeWidth: 5}),
  ];
  if (idx % 3 === 0) { // fedora
    body.push(E(100, 52, 110, 18, {...solid(INK), stroke: INK}), PA('M62 52 Q64 18 100 16 Q136 18 138 52', {...solid(INK)}), L(66, 42, 134, 42, {stroke: RED, strokeWidth: 6}));
  } else if (idx % 3 === 1) { // bob hair
    body.push(PA('M42 85 Q40 30 100 28 Q160 30 158 85 Q150 60 100 55 Q50 60 42 85', {...hatch(INK, 4), stroke: INK}));
  } else { // cap
    body.push(PA('M44 62 Q50 22 100 22 Q150 22 156 62 Z', {...solid(INK)}), L(60, 62, 175, 62, {stroke: INK, strokeWidth: 8}));
  }
  return body;
};
