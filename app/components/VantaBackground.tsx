"use client"

import { useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"
import HALO from "vanta/dist/vanta.halo.min"
import * as THREE from "three"

interface VantaBackgroundProps {
  children: React.ReactNode
}

const VantaBackground: React.FC<VantaBackgroundProps> = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState<ReturnType<typeof HALO> | null>(null)
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
    <Box
      ref={vantaRef}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: -1
      }}
    >
      {children}
    </Box>
  )
}

export default VantaBackground

