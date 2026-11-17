import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { ui } from '../store'
import { BLOB_VERT, BLOB_FRAG, STAR_VERT, STAR_FRAG } from './shaders'

// ---------------------------------------------------------------- Fluid blob
function FluidBlob() {
  const mesh = useRef<THREE.Mesh>(null!)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: BLOB_VERT,
        fragmentShader: BLOB_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.38 },
          uScroll: { value: 0 },
          uColorA: { value: new THREE.Color('#22d3ee') },
          uColorB: { value: new THREE.Color('#7c3aed') },
          uColorC: { value: new THREE.Color('#f472b6') },
        },
      }),
    [],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    material.uniforms.uTime.value = t
    material.uniforms.uScroll.value = ui.scroll
    // gentle constant morph speed
    material.uniforms.uAmp.value = 0.38 + Math.sin(t * 0.5) * 0.06

    // scale-in on entry + subtle breathing
    const s = mesh.current.scale
    const target = ui.entered ? 1 : 0.001
    const k = THREE.MathUtils.damp(s.x, target, 4, delta)
    s.setScalar(k)

    // drift down & back as the user scrolls
    mesh.current.position.y = 0.15 - ui.scroll * 2.4
    mesh.current.position.z = -ui.scroll * 2.2
    mesh.current.rotation.y = t * 0.06
  })

  return (
    <mesh ref={mesh} material={material} scale={0.001}>
      <sphereGeometry args={[1.6, 128, 128]} />
    </mesh>
  )
}

// ---------------------------------------------------------------- Starfield
function Starfield() {
  const points = useRef<THREE.Points>(null!)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: STAR_VERT,
        fragmentShader: STAR_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
      }),
    [],
  )

  const geometry = useMemo(() => {
    const COUNT = 2000
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const palette = [
      new THREE.Color('#9beaff'),
      new THREE.Color('#b9a4ff'),
      new THREE.Color('#ffd9f0'),
      new THREE.Color('#ffffff'),
    ]
    for (let i = 0; i < COUNT; i++) {
      // distribute in a thick shell
      const r = 18 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      sizes[i] = 0.6 + Math.random() * 2.6
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    points.current.rotation.y = state.clock.elapsedTime * 0.012 + ui.scroll * 0.5
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
  })

  return <points ref={points} geometry={geometry} material={material} />
}

// ---------------------------------------------------------------- Orbital rings
function Rings() {
  const group = useRef<THREE.Group>(null!)

  const rings = useMemo(() => {
    const defs = [
      { r: 2.6, tube: 0.012, rot: [1.1, 0.4, 0.0], color: '#22d3ee', speed: 0.12 },
      { r: 3.2, tube: 0.008, rot: [0.6, 1.3, 0.3], color: '#a855f7', speed: -0.08 },
      { r: 3.9, tube: 0.006, rot: [1.4, 0.7, 0.9], color: '#f472b6', speed: 0.05 },
    ]
    return defs.map((d) => ({
      ...d,
      geo: new THREE.TorusGeometry(d.r, d.tube, 8, 180),
      mat: new THREE.MeshBasicMaterial({
        color: d.color,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    }))
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      const d = rings[i]
      child.rotation.x += d.speed * delta * 2.2
      child.rotation.y += d.speed * delta * 1.4
      ;(child.material as THREE.MeshBasicMaterial).opacity =
        0.35 + 0.25 * Math.sin(t * 0.8 + i * 2.0)
    })
    group.current.position.y = 0.15 - ui.scroll * 2.4
    group.current.position.z = -ui.scroll * 2.2
    group.current.rotation.z = t * 0.05
  })

  return (
    <group ref={group}>
      {rings.map((d, i) => (
        <mesh key={i} geometry={d.geo} material={d.mat} rotation={d.rot as [number, number, number]} />
      ))}
    </group>
  )
}

// ---------------------------------------------------------------- Camera rig
function CameraRig() {
  useFrame((state, delta) => {
    const cam = state.camera
    const px = ui.pointer.x
    const py = ui.pointer.y
    const targetX = px * 0.9
    const targetY = py * 0.6 - ui.scroll * 1.6
    const targetZ = 6.5 + ui.scroll * 1.5
    cam.position.x = THREE.MathUtils.damp(cam.position.x, targetX, 2.2, delta)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, targetY, 2.2, delta)
    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 2.2, delta)
    cam.lookAt(0, 0, 0)
  })
  return null
}

// ---------------------------------------------------------------- Root scene
export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.5], fov: 55 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0 }}
    >
      <color attach="background" args={['#05060f']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 4, 6]} intensity={40} color="#7dd3fc" />
      <Starfield />
      <Rings />
      <FluidBlob />
      <CameraRig />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.25} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
        <Vignette offset={0.22} darkness={0.82} />
      </EffectComposer>
    </Canvas>
  )
}
