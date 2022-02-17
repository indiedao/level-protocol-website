export const outerShapeVs = `
  varying vec3 bary;
  varying vec3 worldPos;

  void main() {
    bary = vec3(uv, 1.0 - uv.x - uv.y);
    worldPos = (modelMatrix * vec4(position, 1)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
  }
`

export const outerShapeFs = `
  uniform sampler2D frontView;
  uniform vec2 resolution;
  uniform float discoTime;
  uniform float edgeRefractThreshold;
  uniform float refractionFactor;
  varying vec3 bary;
  varying vec3 worldPos;

  // Adapted from https://tympanus.net/codrops/2019/12/20/how-to-create-the-apple-fifth-avenue-cube-in-webgl/
  vec3 radialRainbow(vec2 pos, float time) {
    float t = (atan(pos.y, pos.x) + radians(180.0)) / radians(360.0);
    t = mod(t + cos(time), 1.0);

    vec3 a = vec3(0.15, 0.58, 0.96);
    vec3 b = vec3(0.29, 1.00, 0.55);
    vec3 c = vec3(1.00, 0.0, 0.85);
    vec3 d = vec3(0.92, 0.20, 0.14);
    vec3 e = vec3(1.00, 0.96, 0.32);

    const float step = 1.0 / 5.0;

    vec3 color = a;
    color = mix(color, b, smoothstep(step * 0.0, step * 1.0, t));
    color = mix(color, c, smoothstep(step * 1.0, step * 2.0, t));
    color = mix(color, d, smoothstep(step * 2.0, step * 3.0, t));
    color = mix(color, e, smoothstep(step * 3.0, step * 4.0, t));
    color = mix(color, a, smoothstep(step * 4.0, step * 5.0, t));

    return color;
  }

  void main() {
    vec2 st = gl_FragCoord.xy;

    vec3 dbdx = dFdx(bary);
    vec3 dbdy = dFdy(bary);

    float T = edgeRefractThreshold;
    if (bary.x < T || bary.y < T) {
      vec3 v = bary - vec3(1.0/3.0); // vec from center
      vec2 warp = vec2(0,0);

      if (dbdx.x != 0.0) warp.x += (v.x / dbdx.x);
      if (dbdx.y != 0.0) warp.x += (v.y / dbdx.y);
      if (dbdx.z != 0.0) warp.x += (v.z / dbdx.z);

      if (dbdy.x != 0.0) warp.y += (v.x / dbdy.x);
      if (dbdy.y != 0.0) warp.y += (v.y / dbdy.y);
      if (dbdy.z != 0.0) warp.y += (v.z / dbdy.z);

      if (T < bary.z && bary.z < 1.0 - T){ // Suppress warp near top or bottom to avoid black seeping in.
        warp = (refractionFactor / T) * normalize(warp);
        if (bary.x < T) st += (warp * (T - bary.x));
        if (bary.y < T) st += (warp * (T - bary.y));
      }
    }
    st = clamp(st/resolution, vec2(0), vec2(1));
    vec4 B = texture2D(frontView, st);
    vec4 A = vec4(0);

    vec3 dwdx = dFdx(worldPos);
    vec3 dwdy = dFdy(worldPos);
    vec3 n = normalize(cross(dwdx, dwdy));

    T *= 1.25;
    if ((bary.x < T || bary.y < T || bary.z < T) && abs(n.y) < .9) {
      float borderFactor = 1.0 - smoothstep(0.0, T * T * T, bary.x * bary.y * bary.z);

      vec3 disco = radialRainbow(worldPos.xz, discoTime);
      vec3 color = disco;
      A = vec4(color * borderFactor, borderFactor);
    }

    gl_FragColor = A + (1.0 - A.a) * B;
  }
`
