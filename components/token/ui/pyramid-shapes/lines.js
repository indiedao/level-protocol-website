export const linesVs = `
  varying vec3 worldPos;

  void main() {
    worldPos = (modelMatrix * vec4(position, 1)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
  }
`

export const linesFs = `
  uniform float discoTime;
  varying vec3 worldPos;

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
    vec3 disco = radialRainbow(worldPos.xz, discoTime);
    vec3 color = mix(disco, vec3(1), 0.5);
    gl_FragColor = vec4(color * 1.0, 1.0);
  }
`
