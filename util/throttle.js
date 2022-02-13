// Simple throttle function made by hand
export function throttle(callbackFunc, timeFrame) {
  let lastTime = 0
  return function inner() {
    const now = new Date()
    if (now - lastTime >= timeFrame) {
      callbackFunc()
      lastTime = now
    }
  }
}
