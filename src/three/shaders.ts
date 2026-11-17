// GLSL shader sources for the fluid WebGL scene.

// Ashima / IQ 3D simplex noise — public domain.
export const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

export const BLOB_VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vPos;
varying float vDisp;

${NOISE_GLSL}

void main() {
  vec3 p = position;
  float n1 = snoise(p * 0.85 + vec3(0.0, uTime * 0.30, uTime * 0.18));
  float n2 = snoise(p * 1.9  - vec3(uTime * 0.42, 0.0, uTime * 0.25));
  float n3 = snoise(p * 3.4  + vec3(uTime * 0.55, uTime * 0.4, 0.0));
  float disp = (n1 * 0.55 + n2 * 0.30 + n3 * 0.15) * uAmp;
  vec3 np = p + normal * disp;
  vDisp = disp;
  vNormal = normalize(normalMatrix * normal);
  vPos = np;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(np, 1.0);
}
`

export const BLOB_FRAG = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uScroll;
varying vec3 vNormal;
varying vec3 vPos;
varying float vDisp;

${NOISE_GLSL}

void main() {
  vec3 n = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vPos);
  float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.4);

  // iridescent swirl driven by noise + displacement
  float ir = snoise(vPos * 1.4 + vec3(uTime * 0.18, 0.0, uTime * 0.12)) * 0.5 + 0.5;
  ir = mix(ir, 0.65 + 0.35 * sin(vDisp * 4.0 + uTime * 0.6), 0.4);

  vec3 col = mix(uColorA, uColorB, ir);
  col = mix(col, uColorC, fresnel);

  // subtle inner core glow
  col += vec3(0.12, 0.16, 0.22) * (1.0 - fresnel) * 0.6;

  // energetic rim that will bloom
  col += fresnel * vec3(1.2, 1.0, 1.4) * (0.9 + 0.5 * sin(uTime * 1.3));

  gl_FragColor = vec4(col, 1.0);
}
`

export const STAR_VERT = /* glsl */ `
attribute float aSize;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;

void main() {
  vColor = aColor;
  vec3 p = position;
  p.y += sin(uTime * 0.08 + position.x * 0.6) * 1.2;
  p.x += cos(uTime * 0.06 + position.z * 0.5) * 1.0;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * uPixelRatio * (240.0 / max(1.0, -mv.z));
  gl_Position = projectionMatrix * mv;
}
`

export const STAR_FRAG = /* glsl */ `
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.02, d);
  a *= a;
  gl_FragColor = vec4(vColor, a);
}
`
