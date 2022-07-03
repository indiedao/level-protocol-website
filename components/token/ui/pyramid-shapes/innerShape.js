export const innerShapeVs = `
  uniform mat4  reflectionMatrix;
  uniform int cullFrontReflections;
  uniform float height;
  uniform float percent;
  varying vec3 worldPos; // no reflection applied

  void main() {
    vec3 pos = position;
    if (position.y > 0.0) {
      vec3 endPos = vec3(0, height, 0);
      vec3 beginPos = vec3(position.x, 0, position.z);
      // Non zero min because 0 percent looks bad (Z-fighting). Always show a little to avoid that.
      float t = clamp(percent / 100.0, 0.005, 1.0);
      pos = mix(beginPos, endPos, t);
    }

    worldPos = (modelMatrix * vec4(pos, 1)).xyz;

    // HACK to cull reflections on front faces because couldn't get clip planes working in threejs
    vec4 reflectedWorldPos = modelMatrix * reflectionMatrix * vec4(pos, 1);
    if (cullFrontReflections != 0 && reflectedWorldPos.z > 0.0)
      reflectedWorldPos.z = 1000.0;

    gl_Position = projectionMatrix * viewMatrix * reflectedWorldPos;
  }
`

export const innerShapeFs = `
  uniform vec3 whiteLightPosition;
  uniform float whiteLightAmount;
  uniform float discoTime;
  uniform float alpha;
  varying vec3 worldPos; // no reflection applied

  // Same as from outerShape fragment shader
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
    vec3 dwdx = dFdx(worldPos);
    vec3 dwdy = dFdy(worldPos);
    vec3 N = normalize(cross(dwdx, dwdy));
    vec3 L = normalize(whiteLightPosition - worldPos);

    vec3 light = max(0.0, dot(N, L)) * vec3(whiteLightAmount);

    vec3 disco = radialRainbow(worldPos.xz, discoTime) * .85; // darken disco a little to better show 3D shape with light
    vec3 color = disco + light;
    gl_FragColor = vec4(color*alpha, alpha);
  }
`
