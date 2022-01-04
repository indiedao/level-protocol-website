// The de-glitch factor is how fast the glitchy-ness cleans itself up, per iteration.
// range: 0.0 - 1.0
export const DE_GLITCH_FACTOR = 0.6182

// The flash minimum threshold is the decimal percent of field that must be available to glitch such that all characters may be “flashed” in the same color.
// range: 0.0 - 1.0
export const FLASH_MINIMUM_THRESHOLD = 0.7

// The flash probability is the decimal percentage chance that a flash can be shown when the minimum threshold has been met.
// range: 0.0 - 1.0
export const FLASH_PROBABILITY = 0.3

// The glitch bounce maximum is the highest decimal percent of the available field that can be re-glitched.
// range: 0.0 - 1.0
export const GLITCH_BOUNCE_MAXIMUM = 0.05

// The glitch bounce probability is the decimal percent chance that re-glitching will occur when the glitch has settled.
// range: 0.0 - 1.0
export const GLITCH_BOUNCE_PROBABILITY = 0.05

// The glitch settled threshold is the decimal glitchy-ness that is allowed to persist always.
// range: 0.0 - 1.0
export const GLITCH_SETTLED_THRESHOLD = 0.03

// The glitch speed is the milliseconds between iterations.
// range: 1 - Infinity
export const GLITCH_SPEED = 100 // ms

// The initial glitchy-ness is what decimal percent of the available field should be glitched upon first render.
// range: 0.0 - 1.0
export const INITIAL_GLITCHY_NESS = 0.95
