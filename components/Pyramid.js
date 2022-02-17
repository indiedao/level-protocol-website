import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'

import { outerShapeFs, outerShapeVs } from './pyramid-shapes/outerShape'
import { linesFs, linesVs } from './pyramid-shapes/lines'
import { innerShapeFs, innerShapeVs } from './pyramid-shapes/innerShape'
import {
  outerShapeBackFaceFs,
  outerShapeBackFaceVs,
} from './pyramid-shapes/outerShapeBackFace'
import { throttle } from '../util/throttle'
import { clamp, cubicInterpolation, radians } from '../util/pyramid'
import theme from '../util/theme'

const ROTATION_INTERVAL = 2500

const Pyramid = ({ backgroundColor = theme.colors.vibrantScreen }) => {
  const canvasRef = useRef(null)
  const whiteLightAmount = 0.25
  const discoTimeDivisor = 5000.0
  const outerShapeRadius = 10
  const outerShapeHeight = 13
  const outerShapeEdgeRefractThreshold = 0.04 // closer to 0 means closer to an edge
  const outerShapeRefractionFactor = 5.0
  const innerShapeBaseRadius = 6
  const innerShapeHeight = 7
  const innerShapeReflectionAlpha = 0.2
  const cameraZ = 18
  const cameraY = 5
  const cameraNear = 1
  const cameraFar = 100
  const camaraFOV = 75

  useEffect(() => {
    // Recommendation: keep percentAnimation slightly slower than spin to first draw attention to outershape, then back to inner.
    const percentAnimation = {
      elapsedMilliseconds: 0,
      durationMilliseconds: 1000 * 2,
      beginValue: 0,
      endValue: 0,
    }
    const spinAnimation = {
      elapsedMilliseconds: 0,
      durationMilliseconds: 800 * 2,
      beginValue: 0,
      endValue: 0,
    }
    const whiteLightPosition = new THREE.Vector3(20, 40, 3)
    const scene = new THREE.Scene()
    const sceneRT = new THREE.Scene()
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.autoClear = false

    const frontRT = new THREE.WebGLRenderTarget(
      canvas.clientWidth,
      canvas.clientHeight,
    )

    function genPentagonVerticesAtY(radius, yCoord) {
      // Each vertex is 72 degrees apart because 5 * 72 = 360.
      // To get flat part facing Z-axis, the Z-axis will conceptually split a 72 degree interval into 2 36 degree parts.
      // Those "front" vertices are 90-36 = 54 degrees from the X-axis.
      const theta0 = radians(54 + 72 * 0)
      const theta1 = radians(54 + 72 * 1)
      const theta2 = radians(54 + 72 * 2)
      const theta3 = radians(54 + 72 * 3)
      const theta4 = radians(54 + 72 * 4)
      return [
        radius * Math.cos(theta0),
        yCoord,
        radius * Math.sin(theta0),
        radius * Math.cos(theta1),
        yCoord,
        radius * Math.sin(theta1),
        radius * Math.cos(theta2),
        yCoord,
        radius * Math.sin(theta2),
        radius * Math.cos(theta3),
        yCoord,
        radius * Math.sin(theta3),
        radius * Math.cos(theta4),
        yCoord,
        radius * Math.sin(theta4),
      ]
    }

    function pushVertex(dstArray, srcArray, srcVertexIndex) {
      dstArray.push(
        srcArray[3 * srcVertexIndex + 0],
        srcArray[3 * srcVertexIndex + 1],
        srcArray[3 * srcVertexIndex + 2],
      )
    }

    function pushTriangle(
      dstArray,
      srcArray,
      srcVertexIndexA,
      srcVertexIndexB,
      srcVertexIndexC,
    ) {
      pushVertex(dstArray, srcArray, srcVertexIndexA)
      pushVertex(dstArray, srcArray, srcVertexIndexB)
      pushVertex(dstArray, srcArray, srcVertexIndexC)
    }

    function setVec(vec3, srcArray, srcVertexIndex) {
      const x = srcArray[3 * srcVertexIndex + 0]
      const y = srcArray[3 * srcVertexIndex + 1]
      const z = srcArray[3 * srcVertexIndex + 2]
      vec3.set(x, y, z)
    }

    function createOuterShapeGeometry(radius, height) {
      const penta = genPentagonVerticesAtY(radius, 0)

      // Add center base and top vertices
      penta.push(0, 0, 0)
      penta.push(0, height, 0)

      const vertices = []
      const uvBary = [] // Will use UVs as a hack to get barycentric coordinates in shader

      // bottom triangles
      pushTriangle(vertices, penta, 5, 0, 1)
      pushTriangle(vertices, penta, 5, 1, 2)
      pushTriangle(vertices, penta, 5, 2, 3)
      pushTriangle(vertices, penta, 5, 3, 4)
      pushTriangle(vertices, penta, 5, 4, 0)
      for (let i = 0; i < 5; i += 1) {
        // Choice here doesn't matter much 'cause we won't look at bottom
        uvBary.push(0, 0)
        uvBary.push(1, 0)
        uvBary.push(0, 1)
      }

      // "wall" triangles, 1 per side, 5 sides total
      //    top
      //    /\    b for base
      //   /__\
      //   bj  bk
      for (let i = 0; i < 5; i += 1) {
        const j = i
        const k = i === 4 ? 0 : i + 1
        const b = penta

        pushVertex(vertices, b, 6)
        pushVertex(vertices, b, k)
        pushVertex(vertices, b, j)

        uvBary.push(0, 0)
        uvBary.push(1, 0)
        uvBary.push(0, 1)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(vertices), 3),
      )
      geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvBary), 2),
      )
      return geometry
    }

    function createOuterShapeReflectionMatrices(radius, height) {
      const reflectionMatrices = []

      // Strategy:
      //    1. Compute plane normals
      //    2. Compute d for plane equation ax + by + cz + d = 0. Plane normal contains a,b,c part.
      //    3. Fill threejs Matrix4 with coefficients according to https://en.wikipedia.org/wiki/Transformation_matrix#Reflection

      const penta = genPentagonVerticesAtY(radius, 0)

      // "wall" triangles, 1 per side, 5 sides total
      //    top
      //    /\    b for base
      //   /__\
      //   bj  bk
      const top = new THREE.Vector3(0, height, 0)
      const bj = new THREE.Vector3()
      const bk = new THREE.Vector3()
      for (let i = 0; i < 5; i += 1) {
        const j = i
        const k = i === 4 ? 0 : i + 1

        setVec(bj, penta, j)
        setVec(bk, penta, k)

        bj.sub(top)
        bk.sub(top)

        bj.cross(bk)
        const N = bj
        N.normalize()

        const a = N.x
        const b = N.y
        const c = N.z
        const d = -N.dot(top)

        const mat = new THREE.Matrix4()
        mat.set(
          1 - 2 * a * a,
          -2 * a * b,
          -2 * a * c,
          -2 * a * d,
          -2 * a * b,
          1 - 2 * b * b,
          -2 * b * c,
          -2 * b * d,
          -2 * a * c,
          -2 * b * c,
          1 - 2 * c * c,
          -2 * c * d,
          0,
          0,
          0,
          1,
        )
        reflectionMatrices.push(mat)
      }

      return reflectionMatrices
    }

    function createInnerShapeGeometry(baseRadius, height) {
      // Convention: all verticies with y > 0 will be animated in vertex shader
      const basePenta = genPentagonVerticesAtY(baseRadius, 0)
      const topPenta = genPentagonVerticesAtY(baseRadius, height)

      // Add center vertex for top and base. All top and base triangles will share a center vertex.
      basePenta.push(0, 0, 0)
      topPenta.push(0, height, 0)

      const vertices = []

      // bottom triangles
      pushTriangle(vertices, basePenta, 5, 0, 1)
      pushTriangle(vertices, basePenta, 5, 1, 2)
      pushTriangle(vertices, basePenta, 5, 2, 3)
      pushTriangle(vertices, basePenta, 5, 3, 4)
      pushTriangle(vertices, basePenta, 5, 4, 0)

      // top triangles
      pushTriangle(vertices, topPenta, 5, 1, 0)
      pushTriangle(vertices, topPenta, 5, 2, 1)
      pushTriangle(vertices, topPenta, 5, 3, 2)
      pushTriangle(vertices, topPenta, 5, 4, 3)
      pushTriangle(vertices, topPenta, 5, 0, 4)

      // "wall" triangles, 2 per side, 5 sides total
      //	tj___tk
      //   |\  |
      //   | \ |   b for base, t for top
      //   |__\|
      //   bj  bk
      for (let i = 0; i < 5; i += 1) {
        const j = i
        const k = i === 4 ? 0 : i + 1
        const t = topPenta
        const b = basePenta

        pushVertex(vertices, t, j)
        pushVertex(vertices, b, k)
        pushVertex(vertices, b, j)

        pushVertex(vertices, t, j)
        pushVertex(vertices, t, k)
        pushVertex(vertices, b, k)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(vertices), 3),
      )
      return geometry
    }

    function enablePremultipliedAlpha(material) {
      const alphaMaterial = material
      // Enable blending. Do it premultiplied style. See https://en.wikipedia.org/wiki/Alpha_compositing#Straight_versus_premultiplied
      alphaMaterial.transparent = true
      alphaMaterial.blending = THREE.CustomBlending
      alphaMaterial.blendEquation = THREE.AddEquation
      alphaMaterial.blendSrc = THREE.OneFactor
      alphaMaterial.blendSrcAlpha = alphaMaterial.blendSrc
      alphaMaterial.blendDst = THREE.OneMinusSrcAlphaFactor
      alphaMaterial.blendDstAlpha = alphaMaterial.blendDst

      return alphaMaterial
    }

    function resizeRenderer(resizableRenderer) {
      const rendererCanvas = resizableRenderer.domElement
      const pixelRatio = window.devicePixelRatio
      const width = Math.trunc(rendererCanvas.clientWidth * pixelRatio)
      const height = Math.trunc(rendererCanvas.clientHeight * pixelRatio)
      const needResize =
        rendererCanvas.width !== width || rendererCanvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    const outerShapeReflectionMatrices = createOuterShapeReflectionMatrices(
      outerShapeRadius,
      outerShapeHeight,
    )
    const outerShapeGeometry = createOuterShapeGeometry(
      outerShapeRadius,
      outerShapeHeight,
    )
    let outerShapeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        frontView: { value: frontRT.texture },
        resolution: { value: new THREE.Vector2() },
        discoTime: { value: 0 },
        edgeRefractThreshold: { value: outerShapeEdgeRefractThreshold },
        refractionFactor: { value: outerShapeRefractionFactor },
      },
      vertexShader: outerShapeVs,
      fragmentShader: outerShapeFs,
    })
    outerShapeMaterial = enablePremultipliedAlpha(outerShapeMaterial)
    const outerShapeMesh = new THREE.Mesh(
      outerShapeGeometry,
      outerShapeMaterial,
    )
    scene.add(outerShapeMesh)

    const outerShapeLines = new THREE.LineSegments(
      new THREE.EdgesGeometry(outerShapeGeometry),
      new THREE.ShaderMaterial({
        uniforms: {
          discoTime: { value: 0 },
        },
        vertexShader: linesVs,
        fragmentShader: linesFs,
      }),
    )
    scene.add(outerShapeLines)

    const innerShapeGeometry = createInnerShapeGeometry(
      innerShapeBaseRadius,
      innerShapeHeight,
    )
    let innerShapeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        reflectionMatrix: { value: new THREE.Matrix4() },
        cullFrontReflections: { value: 0 },
        height: { value: innerShapeHeight },
        percent: { value: 50 },
        whiteLightPosition: { value: whiteLightPosition },
        whiteLightAmount: { value: whiteLightAmount },
        discoTime: { value: 0 },
        alpha: { value: 1 },
      },
      vertexShader: innerShapeVs,
      fragmentShader: innerShapeFs,
    })
    innerShapeMaterial = enablePremultipliedAlpha(innerShapeMaterial)
    const innerShapeMesh = new THREE.Mesh(
      innerShapeGeometry,
      innerShapeMaterial,
    )
    sceneRT.add(innerShapeMesh)

    const outerShapeBackFaceMaterial = new THREE.ShaderMaterial({
      uniforms: {
        discoTime: { value: 0 },
        edgeRefractThreshold: { value: outerShapeEdgeRefractThreshold },
      },
      vertexShader: outerShapeBackFaceVs,
      fragmentShader: outerShapeBackFaceFs,
    })

    outerShapeBackFaceMaterial.side = THREE.BackSide
    const outerShapeBackFaceMesh = new THREE.Mesh(
      outerShapeGeometry,
      outerShapeBackFaceMaterial,
    )
    sceneRT.add(outerShapeBackFaceMesh)

    const camera = new THREE.PerspectiveCamera(
      camaraFOV,
      canvas.clientWidth / canvas.clientHeight,
      cameraNear,
      cameraFar,
    )
    camera.position.z = cameraZ
    camera.position.y = cameraY

    function advanceAnimation(animation, ms) {
      const advance = animation
      if (animation.elapsedMilliseconds < animation.durationMilliseconds) {
        advance.elapsedMilliseconds = clamp(
          animation.elapsedMilliseconds + ms,
          0,
          animation.durationMilliseconds,
        )
        const t = advance.elapsedMilliseconds / advance.durationMilliseconds
        return cubicInterpolation(advance.beginValue, advance.endValue, t)
      }
      return advance.endValue
    }

    // We will let this counter go freely beyond or below valid index ranges [0,5) to avoid more complicated logic for the spin animation. Basic
    // problem is that the discontinuity at 0/360 can make the pyramid spin a bunch the "long way". The general fix for this kind of problem is
    // to determine the shortest route. We don't need the general fix for this implementation.
    let currentFace = 0

    // Sample data
    const samplePercents = [0, 100, 20, 75, 50]

    const rotate = rotateFace => {
      // Unlike C/C++, % is well defined for negatives in JavasScript.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
      const faceIndex = ((rotateFace % 5) + 5) % 5

      percentAnimation.elapsedMilliseconds = 0
      percentAnimation.beginValue = innerShapeMaterial.uniforms.percent.value
      percentAnimation.endValue = samplePercents[faceIndex]

      spinAnimation.elapsedMilliseconds = 0
      spinAnimation.beginValue = innerShapeMesh.rotation.y
      spinAnimation.endValue = radians(rotateFace * 72)
    }

    const rotateThrottled = throttle(() => {
      rotate((currentFace += 1))
    }, ROTATION_INTERVAL)

    canvas.onclick = function onClickHandler(mouseEvent) {
      if (mouseEvent.clientX > canvas.clientWidth / 2) {
        rotate((currentFace += 1))
      } else {
        rotate((currentFace -= 1))
      }
    }

    let previousTime = 0
    function render(time) {
      const deltaMilli = time - previousTime
      previousTime = time

      if (resizeRenderer(renderer)) {
        const rendererCanvas = renderer.domElement
        camera.aspect = rendererCanvas.clientWidth / rendererCanvas.clientHeight
        camera.updateProjectionMatrix()

        const size = outerShapeMaterial.uniforms.resolution.value
        renderer.getSize(size)
        frontRT.setSize(size.x, size.y)
      }

      innerShapeMaterial.uniforms.percent.value = advanceAnimation(
        percentAnimation,
        deltaMilli,
        cubicInterpolation,
      )
      const rotY = advanceAnimation(
        spinAnimation,
        deltaMilli,
        cubicInterpolation,
      )

      outerShapeMesh.rotation.y = rotY
      outerShapeLines.rotation.y = rotY
      outerShapeBackFaceMesh.rotation.y = rotY
      innerShapeMesh.rotation.y = rotY

      const discoTime = time / discoTimeDivisor
      outerShapeMaterial.uniforms.discoTime.value = discoTime
      outerShapeLines.material.uniforms.discoTime.value = discoTime
      outerShapeBackFaceMaterial.uniforms.discoTime.value = discoTime
      innerShapeMaterial.uniforms.discoTime.value = discoTime

      // Render inside mesh and outside backfaces to render target so it can be distorted later
      renderer.setRenderTarget(frontRT)
      renderer.clear()

      outerShapeBackFaceMesh.visible = true
      outerShapeBackFaceMaterial.depthWrite = false
      outerShapeBackFaceMaterial.stencilWrite = true
      outerShapeBackFaceMaterial.stencilZPass = THREE.IncrementStencilOp
      innerShapeMaterial.stencilFunc = THREE.AlwaysStencilFunc
      innerShapeMaterial.side = THREE.FrontSide
      innerShapeMaterial.uniforms.reflectionMatrix.value = new THREE.Matrix4()
      innerShapeMaterial.uniforms.cullFrontReflections.value = 0
      innerShapeMaterial.uniforms.alpha.value = 1
      renderer.render(sceneRT, camera)

      outerShapeBackFaceMesh.visible = false
      innerShapeMaterial.side = THREE.BackSide
      innerShapeMaterial.uniforms.alpha.value = innerShapeReflectionAlpha
      innerShapeMaterial.stencilFunc = THREE.GreaterStencilFunc

      for (let faceIndex = 0; faceIndex < 5; faceIndex += 1) {
        innerShapeMaterial.uniforms.reflectionMatrix.value =
          outerShapeReflectionMatrices[faceIndex]
        innerShapeMaterial.uniforms.cullFrontReflections.value = 1
        renderer.render(sceneRT, camera)
      }

      // Now render outer mesh and apply effects
      renderer.setRenderTarget(null)
      renderer.clear()
      scene.background = new THREE.Color(backgroundColor)
      renderer.render(scene, camera)

      rotateThrottled()

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }, [])
  return <Canvas ref={canvasRef} />
}

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`

export default Pyramid
