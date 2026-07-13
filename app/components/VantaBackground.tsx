"use client"

import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
import * as THREE from "three"

interface VantaBackgroundProps {
  darkMode: boolean
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uGrain;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    vec2 mouse = (uMouse - 0.5) * aspect;

    vec2 c1 = vec2(sin(uTime * 0.15) * 0.3, cos(uTime * 0.18) * 0.25) + mouse * 0.08;
    float b1 = smoothstep(0.9, 0.0, length(p - c1));

    vec2 c2 = vec2(cos(uTime * 0.12) * 0.35 - 0.2, sin(uTime * 0.1) * 0.3 + 0.15) - mouse * 0.05;
    float b2 = smoothstep(0.8, 0.0, length(p - c2));

    vec2 c3 = vec2(sin(uTime * 0.09 + 2.0) * 0.25 + 0.2, cos(uTime * 0.13 + 1.0) * 0.3 - 0.15) + mouse * 0.03;
    float b3 = smoothstep(0.85, 0.0, length(p - c3));

    vec3 color = uColorA * b1 + uColorB * b2 + uColorC * b3;
    float grain = (hash(vUv * uResolution.xy + uTime) - 0.5) * uGrain;
    color += grain;

    float alpha = clamp(b1 + b2 + b3, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`

const DARK_COLORS: [THREE.Vector3, THREE.Vector3, THREE.Vector3] = [
  new THREE.Vector3(30 / 255, 58 / 255, 138 / 255),
  new THREE.Vector3(88 / 255, 28 / 255, 135 / 255),
  new THREE.Vector3(14 / 255, 116 / 255, 144 / 255),
]

const LIGHT_COLORS: [THREE.Vector3, THREE.Vector3, THREE.Vector3] = [
  new THREE.Vector3(96 / 255, 165 / 255, 250 / 255),
  new THREE.Vector3(168 / 255, 85 / 255, 247 / 255),
  new THREE.Vector3(125 / 255, 211 / 255, 252 / 255),
]

const VantaBackground: React.FC<VantaBackgroundProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.display = "block"
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uColorA: { value: DARK_COLORS[0].clone() },
        uColorB: { value: DARK_COLORS[1].clone() },
        uColorC: { value: DARK_COLORS[2].clone() },
        uGrain: { value: 0.03 },
      },
    })
    materialRef.current = material

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(quad)

    const targetMouse = new THREE.Vector2(0.5, 0.5)

    const resize = () => {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight, false)
      material.uniforms.uResolution.value.set(clientWidth, clientHeight)
    }
    resize()
    window.addEventListener("resize", resize)

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouse.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      )
    }
    window.addEventListener("pointermove", handlePointerMove)

    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!reduceMotion) {
        material.uniforms.uTime.value += clock.getDelta()
        const mouseUniform = material.uniforms.uMouse.value as THREE.Vector2
        mouseUniform.lerp(targetMouse, 0.05)
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      renderer.dispose()
      material.dispose()
      quad.geometry.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  useEffect(() => {
    const material = materialRef.current
    if (!material) return
    const colors = darkMode ? DARK_COLORS : LIGHT_COLORS
    material.uniforms.uColorA.value.copy(colors[0])
    material.uniforms.uColorB.value.copy(colors[1])
    material.uniforms.uColorC.value.copy(colors[2])
    material.uniforms.uGrain.value = darkMode ? 0.03 : 0.02
  }, [darkMode])

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        backgroundColor: darkMode ? "#0a0a0f" : "#f5f7fb",
      }}
    >
      <Box ref={containerRef} sx={{ position: "absolute", inset: 0 }} />
    </Box>
  )
}

export default VantaBackground
