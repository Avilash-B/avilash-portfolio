declare module 'vanta/dist/vanta.halo.min' {
  interface VantaHaloOptions {
    el: HTMLElement | null
    THREE: any
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    amplitudeFactor?: number
    xOffset?: number
    yOffset?: number
    size?: number
  }

  interface VantaEffect {
    destroy(): void
    resize(): void
    setOptions(options: Partial<VantaHaloOptions>): void
  }

  function HALO(options: VantaHaloOptions): VantaEffect
  export default HALO
}

declare module 'three' {
  // Re-export THREE types if needed
}