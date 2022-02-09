export function clamp(val, lo, hi) {
  if (val < lo) return lo
  if (val > hi) return hi
  return val
}

function lerp(a, b, t) {
  return (1.0 - t) * a + t * b
}

// https://en.wikipedia.org/wiki/Cubic_Hermite_spline
// https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/smoothstep.xhtml
export function cubicInterpolation(a, b, t) {
  const k = t * t * (3.0 - 2.0 * t)
  return lerp(a, b, k)
}

export function radians(degrees) {
  return (degrees * Math.PI) / 180
}
