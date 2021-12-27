import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const PYRAMID_ROTATION_OFFSET = (Math.PI * 2) / 10 // Half side turn

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

    // Galaxy Lights:
    const LIGHT_COLORS = [0xff0000, 0x0000ff, 0xffffff, 0x39ff14]
    const MAX_LIGHT_DISTANCE = 5
    const MIN_LIGHT_DISTANCE = 1
    this.lights = []
    for (var i = 0; i < 50; i++) {
      const light = this._createLight({
        color: LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)],
      })
      this.lights.push({
        obj: light,
        axisOffset: Math.random(),
        cycleOffset: Math.random(),
        quadrantOffset: Math.random() > 0.5 ? Math.PI : 0,
        distance: Math.random() * (MAX_LIGHT_DISTANCE - 1) + MIN_LIGHT_DISTANCE,
        speed: Math.random() / 10,
      })
      this.scene.add(light)
    }

    // Inner Light:
    const light = new THREE.PointLight(0xffffff, 100, 10)
    const sphere = new THREE.SphereGeometry(0.1, 16, 8)
    const mesh = new THREE.Mesh(
      sphere,
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    )
    light.add(mesh)
    light.position.y = -0.2
    light.position.z = 0.2
    window.addEventListener('mousedown', e => {
      //light.position.z -= 0.1
    })
    this.scene.add(light)

    // Setup renderer:
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // Shapes:
    this.pyramid = this._createPyramid()
    this.scene.add(this.pyramid)
    this.gem = this._createGem()
    this.scene.add(this.gem)
    this.avatar = this._createAvatar()
    this.scene.add(this.avatar)

    // Directional lights:
    //this.light = new THREE.PointLight(0xffffff, 2, 50)
    //const helper = new THREE.PointLightHelper(this.light, 5)
    //this.scene.add(helper)
    //this.light.position.y = 0
    //this.scene.add(this.light)

    /*
    const loader = new GLTFLoader()
    loader.load(
      '/models/prism.gltf',
      gltf => {
        this.scene.add(gltf.scene)
      },
      undefined,
      error => {
        console.error(error)
      },
    )
    */

    // Begin animation:
    this._tick()

    // Adjustable settings:
    this.pyramidSide = 0
    this.pyramidPosition = PYRAMID_ROTATION_OFFSET
  }

  _tick() {
    // Rotate pyramid:
    if (
      this.pyramidPosition <
      (this.pyramidSide * Math.PI * 2) / 5 + PYRAMID_ROTATION_OFFSET
    ) {
      this.pyramidPosition += 0.04
      this.pyramid.rotation.y = this.pyramidPosition
      this.gem.rotation.y = this.pyramidPosition
    }

    // Move lights:
    this.lights.forEach(
      ({ obj, axisOffset, distance, speed, cycleOffset, quadrantOffset }) => {
        const time = Date.now() / (1000 / speed)
        obj.position.x = distance * axisOffset * Math.sin(time + cycleOffset)
        obj.position.y =
          distance *
            (1 - axisOffset) *
            Math.sin(time + cycleOffset + quadrantOffset) -
          1
        obj.position.z = distance * Math.cos(time + cycleOffset)
      },
    )

    /*
    const time = Date.now() / 1000
    this.light.position.x = Math.sin(time) * 5
    this.light.position.z = Math.cos(time) * 5
    */

    // Rotate avatar:
    this.avatar.rotation.z += 0.01

    // Render:
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this._tick.bind(this))
  }

  _createLight({ color }) {
    const light = new THREE.PointLight(color, 0.8, 100)
    /*
    const sphere = new THREE.SphereGeometry(0.2, 16, 8)
    const mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color }))
    light.add(mesh)
    */
    return light
  }

  _createAvatar() {
    const geometry = new THREE.CylinderGeometry(
      0.6, // Top slice
      0.6, // Width
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

  _createPyramid() {
    const geometry = new THREE.CylinderGeometry(
      0, // Top slice
      1.3, // Width
      1.6, // Height
      5, // Number of sides
    )
    const texture = THREE.ImageUtils.loadTexture('/models/alpha-map.jpg')
    const material = new THREE.MeshPhongMaterial({
      alphaMap: texture,
      ambient: 0x666666,
      color: 0x000000,
      shininess: 30,
    })
    material.side = THREE.DoubleSide
    material.transparent = true

    const pyramid = new THREE.Mesh(geometry, material)
    // Offset down from center:
    pyramid.position.y = -0.5
    window.addEventListener('keydown', e => {
      pyramid.position.y += 0.1
    })
    // Half turn:
    pyramid.rotation.y = PYRAMID_ROTATION_OFFSET
    return pyramid
  }

  _createGem() {
    const geometry = new THREE.CylinderGeometry(
      0, // Top slice
      0.5, // Width
      0.65, // Height
      5, // Number of sides
    )
    const texture = THREE.ImageUtils.loadTexture('/models/alpha-map.jpg')
    const material = new THREE.MeshPhongMaterial({
      alphaMap: texture,
      ambient: 0xffffff,
      color: 0x0099ff,
      shininess: 30,
    })
    material.side = THREE.DoubleSide
    material.transparent = true
    const gem = new THREE.Mesh(geometry, material)
    // Offset down from center:
    gem.position.y = -0.9
    // Half turn:
    gem.rotation.y = PYRAMID_ROTATION_OFFSET
    return gem
  }

  rotatePyramid = () => {
    this.pyramidSide++
  }
}

export default Animation
