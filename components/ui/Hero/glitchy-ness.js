// The degrade factor is how fast the glitchy-ness cleans itself up, per iteration
// range: 0.0 - 1.0
export const DEGRADE_FACTOR = 0.6182

// The flash impact threshold is the minimum decimal percent of glitch needed to “flash” all characters in the same color
// range: 0.0 - 1.0
export const FLASH_IMPACT_THRESHOLD = 0.7

// The flash threshold is the probability that a flash can be shown when the impact threshold has been met.
// range: 0.0 - 1.0
export const FLASH_THRESHOLD = 0.7

// The glitch bounce maximum is the highest decimal percent of the available field that can be re-glitched.
// range: 0.0 - 1.0
export const GLITCH_BOUNCE_MAXIMUM_IMPACT_THRESHOLD = 0.05

// The glitch bounce threshold is the decimal probability that re-glitching will occur when the glitch has settled.
// range: 0.0 - 1.0
export const GLITCH_BOUNCE_THRESHOLD = 0.05

// The glitch settled threshold is the decimal difference that is allowed to persist always.
// range: 0.0 - 1.0
export const GLITCH_SETTLED_THRESHOLD = 0.03

// The glitch speed is the milliseconds between iterations.
// range: 1 - Infinity
export const GLITCH_SPEED = 100 // ms

// The start differential is what decimal percent of the available field should be glitched upon first render.
// range: 0.0 - 1.0
export const START_DIFFERENTIAL = 0.95
