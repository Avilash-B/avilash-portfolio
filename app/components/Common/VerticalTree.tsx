"use client"

import { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import type React from "react"

const TRUNK_LEFT = { xs: 72, sm: 112 }
const CONNECTOR_LEFT = { xs: 80, sm: 120 }
const CONTENT_OFFSET = { xs: '100px', sm: '140px' }
const CONTENT_WIDTH = { xs: 'calc(100% - 100px)', sm: 'calc(100% - 140px)' }

/**
 * Drives per-item scroll-in visibility for a vertical tree/timeline.
 * Falls back to a staggered reveal on tablets, where IntersectionObserver
 * has proven unreliable in this app.
 */
export function useTreeAnimation(length: number) {
  const [visible, setVisible] = useState<boolean[]>(Array(length).fill(false))
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024
    if (!isTablet) return

    Array.from({ length }).forEach((_, index) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[index] = true
          return next
        })
      }, index * 200)
    })
  }, [length])

  useEffect(() => {
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024
    if (isTablet) return

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          const index = Number(target.dataset.index)
          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[index]) return prev
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const timeoutId = setTimeout(() => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref)
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [length])

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el
  }

  return { visible, treeVisible: visible.some(Boolean), setItemRef }
}

/** Growing trunk line, positioned to match TreeItem's node/connector offsets. */
export const TreeTrunk = ({ treeVisible }: { treeVisible: boolean }) => (
  <Box
    sx={{
      position: 'absolute',
      left: TRUNK_LEFT,
      top: 0,
      bottom: 0,
      width: '2px',
      transformOrigin: 'top',
      transform: `scaleY(${treeVisible ? 1 : 0})`,
      transition: 'transform 1.4s cubic-bezier(0.65, 0, 0.35, 1)',
      background: (theme) =>
        `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    }}
  />
)

interface TreeItemProps {
  index: number
  visible: boolean
  duration: string
  isCurrent?: boolean
  itemRef: (el: HTMLElement | null) => void
  children: React.ReactNode
}

/** One row of the tree: date label, branch node + connector, and card content. */
export const TreeItem = ({ index, visible, duration, isCurrent, itemRef, children }: TreeItemProps) => {
  const delay = 450 + index * 110

  return (
    <Box
      ref={itemRef}
      data-index={index}
      sx={{
        position: 'relative',
        mb: 6,
        '&:last-of-type': { mb: 0 },
      }}
    >
      {/* date range to the left of the trunk */}
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          left: 0,
          width: { xs: 60, sm: 96 },
          top: 2,
          textAlign: 'right',
          color: 'text.secondary',
          fontFamily: 'monospace',
          fontSize: { xs: '0.7rem', sm: '0.8rem' },
          lineHeight: 1.3,
          transform: visible ? 'translateX(0)' : 'translateX(-10px)',
          opacity: visible ? 1 : 0,
          transition: `all ${delay}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
      >
        {duration}
      </Typography>

      {/* branch node on the trunk */}
      <Box
        sx={{
          position: 'absolute',
          left: TRUNK_LEFT,
          top: 6,
          width: 16,
          height: 16,
          borderRadius: '50%',
          zIndex: 2,
          bgcolor: 'primary.main',
          border: '3px solid',
          borderColor: 'background.default',
          boxShadow: 2,
          transform: visible ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 0) scale(0)',
          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 110 + 200}ms`,
          ...(isCurrent && {
            animation: visible ? 'nodePulse 2s ease-out infinite' : 'none',
            '@keyframes nodePulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.5)' },
              '70%': { boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' },
            },
          }),
        }}
      />

      {/* branch connecting node to card */}
      <Box
        sx={{
          position: 'absolute',
          top: 13,
          height: '2px',
          left: CONNECTOR_LEFT,
          width: 20,
          bgcolor: 'primary.main',
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 0.4s ease-out ${index * 110 + 350}ms`,
        }}
      />

      <Box
        sx={{
          width: CONTENT_WIDTH,
          ml: CONTENT_OFFSET,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          opacity: visible ? 1 : 0,
          transition: `all ${delay}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
