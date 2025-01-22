"use client"

import { useEffect, useRef, useState } from "react"
import HALO from "vanta/dist/vanta.halo.min"
import * as THREE from "three"

interface VantaBackgroundProps {
  children: React.ReactNode
}

const VantaBackground: React.FC<VantaBackgroundProps> = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
        }),
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div ref={vantaRef} className="absolute inset-0 -z-10">
      {children}
    </div>
  )
}

export default VantaBackground

