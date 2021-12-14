import * as THREE from 'three'

const PYRAMID_ROTATION_OFFSET = (Math.PI * 2) / 10 // Half side turn

const createAvatar = () => {
  const geometry = new THREE.CylinderGeometry(
    1, // Top slice
    1, // Width
    0.1, // Height
    10, // Number of sides
  )
  const material = new THREE.MeshBasicMaterial({
    color: 0x0099ff,
    wireframe: true,
  })
  const avatar = new THREE.Mesh(geometry, material)
  // Flip upward on it's side:
  avatar.rotation.x = Math.PI / 2
  // Offset up from center:
  avatar.position.y = 1
  return avatar
}

const createPyramid = () => {
  const geometry = new THREE.CylinderGeometry(
    0, // Top slice
    1, // Width
    1.25, // Height
    5, // Number of sides
  )
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  })
  const pyramid = new THREE.Mesh(geometry, material)
  // Offset down from center:
  pyramid.position.y = -1
  // Half turn:
  pyramid.rotation.y = PYRAMID_ROTATION_OFFSET
  return pyramid
}

class Animation {
  constructor() {
    // Setup scene:
    this.scene = new THREE.Scene()

    // Setup camera:
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      2,
      1000,
    )
    this.camera.position.z = 5

    // Setup renderer:
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // Shapes:
    this.pyramid = createPyramid()
    this.scene.add(this.pyramid)
    this.avatar = createAvatar()
    this.scene.add(this.avatar)

    // Begin animation:
    this.tick()

    // Adjustable settings:
    this.pyramidSide = 0
    this.pyramidPosition = PYRAMID_ROTATION_OFFSET
  }

  #tick() {
    // Rotate pyramid:
    if (
      this.pyramidPosition <
      (this.pyramidSide * Math.PI * 2) / 5 + PYRAMID_ROTATION_OFFSET
    ) {
      this.pyramidPosition += 0.04
      this.pyramid.rotation.y = this.pyramidPosition
    }

    // Rotate avatar:
    this.avatar.rotation.z += 0.01

    // Render:
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.tick.bind(this))
  }

  rotatePyramid = () => {
    this.pyramidSide += 1
  }
}

export default Animation
