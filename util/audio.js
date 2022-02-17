export const playSound = name => {
  const audio = new Audio(`/audio/${name}`)
  audio.play()
}

const d = {}
export default d
