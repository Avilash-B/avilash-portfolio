"use client"

import { useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"

const FIRST = "Avilash"
const LAST = "Bharti"
const LETTER_DURATION = 600
const LETTER_DELAY = 180
const FILL_DELAY = 200

const totalFirstDuration = FIRST.length * LETTER_DELAY + LETTER_DURATION
const lastStartDelay = totalFirstDuration - 300
const underlineDelay = lastStartDelay + (LAST.length - 1) * LETTER_DELAY + LETTER_DURATION
const UNDERLINE_DURATION = 600

interface Props {
  onComplete?: () => void
}

const SignatureText = ({ onComplete }: Props) => {
  const [animate, setAnimate] = useState(false)
  const firedRef = useRef(false)

  useEffect(() => {
    // Inject styles client-side only to avoid SSR hydration mismatch
    const style = document.createElement("style")
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
      .sig-letter {
        font-family: 'Caveat', cursive;
        font-weight: 500;
        stroke: currentColor;
        stroke-width: 0.2px;
        paint-order: stroke fill;
      }
      .sig-underline {
        fill: none;
        stroke: currentColor;
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-dasharray: 1;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!animate || !onComplete || firedRef.current) return
    firedRef.current = true
    const t = setTimeout(onComplete, underlineDelay + UNDERLINE_DURATION + 100)
    return () => clearTimeout(t)
  }, [animate, onComplete])

  const letterStyle = (index: number, wordDelay = 0): React.CSSProperties => {
    const delay = wordDelay + index * LETTER_DELAY
    return animate
      ? {
          strokeDasharray: 150,
          strokeDashoffset: 0,
          fill: "currentColor",
          opacity: 1,
          transition: `stroke-dashoffset ${LETTER_DURATION}ms ease-in-out ${delay}ms, fill 300ms ease-in ${delay + FILL_DELAY}ms, opacity 0ms ${delay}ms`,
        }
      : {
          strokeDasharray: 150,
          strokeDashoffset: 150,
          fill: "transparent",
          opacity: 0,
          transition: "none",
        }
  }

  const halfUnderlineStyle = (stagger = 0): React.CSSProperties => animate
    ? {
        strokeDashoffset: 0,
        opacity: 1,
        transition: `stroke-dashoffset ${UNDERLINE_DURATION}ms ease-in-out ${underlineDelay + stagger}ms, opacity 0ms ${underlineDelay + stagger}ms`,
      }
    : {
        strokeDashoffset: 1,
        opacity: 0,
        transition: "none",
      }
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <g transform="rotate(-8, 100, 50)">
          <text x="20" y="42" fontSize="44" className="sig-letter">
            {FIRST.split("").map((char, i) => (
              <tspan key={i} style={letterStyle(i)}>{char}</tspan>
            ))}
          </text>

          <text x="48" y="75" fontSize="44" className="sig-letter">
            {LAST.split("").map((char, i) => (
              <tspan key={i} style={letterStyle(i, lastStartDelay)}>{char}</tspan>
            ))}
          </text>

          {/* Underline: left to right, rough hand-drawn wobble */}
          <path
            d="M 16 83 C 55 80, 75 84, 94 82 C 112 80, 130 84, 165 83"
            className="sig-underline"
            pathLength="1"
            style={halfUnderlineStyle(0)}
          />
        </g>
      </svg>
    </Box>
  )
}

export default SignatureText
