import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { treeData } from './treeData'
import {
  VIEW_W, VIEW_H, GROUND, TRUNK_BASE, TRUNK_TOP,
  trunkPath, rootLayouts, branchLayouts, skillPositions, leafPositions, connectionPath,
} from './layout'
import SkillCard from './SkillCard'

interface KnowledgeTreeProps {
  isVisible: boolean
  query: string
  activeBranch: string | null
  collapsed: Set<string>
  onToggleBranch: (id: string) => void
  onSelectSkill: (id: string) => void
}

const GOLD = '#ffd54f'
const BARK = 'rgba(148, 163, 200, 0.55)'

// Deterministic pseudo-random for particles.
const prand = (seed: number) => {
  const s = Math.sin(seed * 91.7) * 43758.5453
  return s - Math.floor(s)
}

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  x: 120 + prand(i) * 760,
  y: 120 + prand(i + 40) * 520,
  r: 1 + prand(i + 80) * 2,
  dur: 6 + prand(i + 120) * 8,
  delay: prand(i + 160) * 6,
}))

const KnowledgeTree = ({
  isVisible, query, activeBranch, collapsed, onToggleBranch, onSelectSkill,
}: KnowledgeTreeProps) => {
  const prefersReducedMotion = useReducedMotion()
  const highContrast = useMediaQuery('(prefers-contrast: more)')
  const containerRef = useRef<HTMLDivElement>(null)

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [hoveredLeaf, setHoveredLeaf] = useState<string | null>(null)
  const [view, setView] = useState({ x: 0, y: 0, k: 1 })

  const animate = isVisible && !prefersReducedMotion
  const q = query.trim().toLowerCase()

  // ---------- highlight sets ----------
  const { litSkills, litLeaves, litBranches, connections } = useMemo(() => {
    const litSkills = new Set<string>()
    const litLeaves = new Set<string>()
    const litBranches = new Set<string>()
    const connections: Array<{ from: string; to: string }> = []

    if (hoveredSkill) {
      const skill = treeData.skills[hoveredSkill]
      litSkills.add(hoveredSkill)
      litBranches.add(skill.branchId)
      skill.relatedSkills.forEach((id) => {
        litSkills.add(id)
        litBranches.add(treeData.skills[id]?.branchId ?? '')
        connections.push({ from: hoveredSkill, to: id })
      })
      skill.projects.forEach((id) => litLeaves.add(id))
    } else if (hoveredLeaf) {
      const project = treeData.projects.find((p) => p.id === hoveredLeaf)
      litLeaves.add(hoveredLeaf)
      project?.skills.forEach((id) => {
        litSkills.add(id)
        litBranches.add(treeData.skills[id]?.branchId ?? '')
      })
    }
    return { litSkills, litLeaves, litBranches, connections }
  }, [hoveredSkill, hoveredLeaf])

  const hasFocus = litSkills.size > 0 || litLeaves.size > 0
  const matchesQuery = (name: string) => !q || name.toLowerCase().includes(q)

  const skillOpacity = (id: string, branchId: string) => {
    const name = treeData.skills[id]?.name ?? ''
    if (activeBranch && branchId !== activeBranch) return 0.12
    if (q && !matchesQuery(name)) return 0.12
    if (hasFocus) return litSkills.has(id) ? 1 : 0.15
    return 1
  }

  // ---------- pan / zoom ----------
  const clampK = (k: number) => Math.min(3, Math.max(0.6, k))

  // Native, non-passive wheel listener: React's synthetic wheel handler can't
  // reliably preventDefault (root listener is registered passive), which lets
  // the page scroll even when the pointer is over the tree. Attaching directly
  // to the DOM node with { passive: false } stops that bubble-through.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      // Cursor position in viewBox units — the point that must stay fixed
      // under the pointer as k changes.
      const mouseSvgX = ((e.clientX - rect.left) / rect.width) * VIEW_W
      const mouseSvgY = ((e.clientY - rect.top) / rect.height) * VIEW_H
      setView((v) => {
        const newK = clampK(v.k * Math.exp(-e.deltaY * 0.0012))
        const ratio = newK / v.k
        return {
          k: newK,
          x: mouseSvgX - ratio * (mouseSvgX - v.x),
          y: mouseSvgY - ratio * (mouseSvgY - v.y),
        }
      })
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  // Drag-to-pan is wired entirely through native listeners on the container,
  // set up once. On pointerdown we capture the pointer to the container itself
  // (not the nested SVG node under the cursor), so every subsequent
  // pointermove/up is delivered here regardless of which skill node, branch
  // label or leaf the gesture started on — capture can't be stolen mid-drag.
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let active = false
    let lastX = 0
    let lastY = 0
    let moved = false

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      active = true
      moved = false
      lastX = e.clientX
      lastY = e.clientY
      el.setPointerCapture(e.pointerId)
      setIsDragging(true)
    }
    const onMove = (e: PointerEvent) => {
      if (!active) return
      const rect = el.getBoundingClientRect()
      const scale = rect.width ? VIEW_W / rect.width : 1
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (!moved && Math.abs(dx) + Math.abs(dy) < 3) return
      moved = true
      lastX = e.clientX
      lastY = e.clientY
      setView((v) => ({ ...v, x: v.x + dx * scale, y: v.y + dy * scale }))
    }
    const onUp = (e: PointerEvent) => {
      if (!active) return
      active = false
      setIsDragging(false)
      try { el.releasePointerCapture(e.pointerId) } catch {}
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [])

  const focusBranch = (tip: { x: number; y: number }) => {
    const k = 1.8
    setView({ x: VIEW_W / 2 - tip.x * k, y: VIEW_H / 2 - tip.y * k, k })
  }
  const resetView = () => setView({ x: 0, y: 0, k: 1 })

  // ---------- hover card placement (viewBox -> % of container) ----------
  const cardFor = hoveredSkill ? treeData.skills[hoveredSkill] : null
  const cardBranch = cardFor ? treeData.branches.find((b) => b.id === cardFor.branchId) : null
  const cardPos = hoveredSkill ? skillPositions[hoveredSkill] : null
  const cardPx = (() => {
    if (!cardPos || !containerRef.current) return null
    const rect = containerRef.current.getBoundingClientRect()
    const px = ((cardPos.x * view.k + view.x) / VIEW_W) * rect.width
    const py = ((cardPos.y * view.k + view.y) / VIEW_H) * rect.height
    return {
      x: Math.min(Math.max(8, px + 20), rect.width - 290),
      y: Math.min(Math.max(8, py - 40), rect.height - 320),
    }
  })()

  // ---------- staged growth timing ----------
  const T = prefersReducedMotion
    ? { roots: 0, trunk: 0, branch: 0, twig: 0, skill: 0, leaf: 0, dur: 0 }
    : { roots: 0.3, trunk: 1.0, branch: 1.9, twig: 2.7, skill: 3.1, leaf: 3.7, dur: 1 }

  const draw = (delay: number, duration = T.dur) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { delay: animate ? delay : 0, duration: animate ? duration : 0, ease: 'easeInOut' as const },
  })

  const pop = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 },
    transition: { delay: animate ? delay : 0, duration: animate ? 0.5 : 0, ease: 'backOut' as const },
  })

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        // Square that fills the largest area fitting inside its flex parent,
        // whose height is already the exact vertical space left on screen.
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: '1 / 1',
        mx: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(30, 41, 82, 0.55), rgba(8, 11, 24, 0.9) 70%)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        '@keyframes energyFlow': {
          to: { strokeDashoffset: -60 },
        },
        '@keyframes trunkPulse': {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 0.8 },
        },
        '@keyframes floatUp': {
          '0%': { transform: 'translateY(0)', opacity: 0 },
          '15%': { opacity: 0.8 },
          '85%': { opacity: 0.6 },
          '100%': { transform: 'translateY(-90px)', opacity: 0 },
        },
      }}
      onDoubleClick={resetView}
      role="application"
      aria-label="Interactive knowledge tree of skills and projects"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      >
        <defs>
          <radialGradient id="kt-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c9fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c9fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="kt-energy" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4dd0e1" />
            <stop offset="55%" stopColor="#7c9fff" />
            <stop offset="100%" stopColor="#b388ff" />
          </linearGradient>
          <filter id="kt-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          {/* ground line */}
          <motion.line
            x1={140} y1={GROUND} x2={860} y2={GROUND}
            stroke="rgba(124, 159, 255, 0.25)" strokeWidth={1.5}
            {...draw(T.roots, 0.8)}
          />

          {/* seed */}
          <motion.circle
            cx={TRUNK_BASE.x} cy={TRUNK_BASE.y} r={7}
            fill="url(#kt-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: [0, 1.6, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: animate ? 0.8 : 0 }}
          />

          {/* roots */}
          {rootLayouts.map((root, i) => {
            const data = treeData.roots[i]
            const dim = (q && !matchesQuery(data.name)) || activeBranch
            return (
              <g key={root.id} opacity={dim ? 0.25 : 0.8}>
                <motion.path
                  d={root.path} fill="none" stroke={BARK} strokeWidth={2.5} strokeLinecap="round"
                  {...draw(T.roots + i * 0.08)}
                />
                <motion.path
                  d={root.path} fill="none" stroke="url(#kt-energy)" strokeWidth={1.2}
                  strokeLinecap="round" strokeDasharray="4 26" opacity={0.7}
                  style={{ animation: prefersReducedMotion ? undefined : 'energyFlow 3.5s linear infinite' }}
                  {...draw(T.roots + i * 0.08)}
                />
                <motion.text
                  x={root.labelPos.x} y={root.labelPos.y + 16}
                  textAnchor="middle" fontSize={13} fontFamily="monospace"
                  fill={highContrast ? '#fff' : 'rgba(200, 214, 255, 0.75)'}
                  {...pop(T.roots + 0.5 + i * 0.08)}
                >
                  {data.name}
                </motion.text>
              </g>
            )
          })}

          {/* trunk */}
          <motion.path
            d={trunkPath} fill="none" stroke={BARK} strokeWidth={14} strokeLinecap="round"
            {...draw(T.trunk)}
          />
          <motion.path
            d={trunkPath} fill="none" stroke="url(#kt-energy)" strokeWidth={4}
            strokeLinecap="round" strokeDasharray="10 34"
            style={{ animation: prefersReducedMotion ? undefined : 'energyFlow 2.8s linear infinite' }}
            {...draw(T.trunk)}
          />
          {/* trunk pulse halo */}
          {!prefersReducedMotion && isVisible && (
            <ellipse
              cx={TRUNK_BASE.x} cy={(TRUNK_BASE.y + TRUNK_TOP.y) / 2} rx={40} ry={130}
              fill="url(#kt-glow)"
              style={{ animation: 'trunkPulse 4s ease-in-out infinite' }}
            />
          )}
          <motion.text
            x={TRUNK_BASE.x} y={GROUND + 34} textAnchor="middle"
            fontSize={20} fontWeight={700} fontFamily="monospace"
            fill={highContrast ? '#fff' : 'rgba(230, 238, 255, 0.95)'}
            {...pop(T.trunk + 0.4)}
          >
            {treeData.trunkTitle}
          </motion.text>
          <motion.text
            x={TRUNK_BASE.x} y={GROUND + 54} textAnchor="middle"
            fontSize={12} fontFamily="monospace" letterSpacing={2}
            fill={highContrast ? '#fff' : 'rgba(160, 178, 220, 0.8)'}
            {...pop(T.trunk + 0.55)}
          >
            {treeData.trunkSubtitle.toUpperCase()}
          </motion.text>

          {/* branches */}
          {branchLayouts.map((branch, bi) => {
            const data = treeData.branches[bi]
            const isCollapsed = collapsed.has(branch.id)
            const branchDim =
              (activeBranch && activeBranch !== branch.id) ||
              (hasFocus && !litBranches.has(branch.id))
            const branchLit = litBranches.has(branch.id)

            return (
              <g key={branch.id} opacity={branchDim ? 0.18 : 1} style={{ transition: 'opacity 0.35s ease' }}>
                <motion.path
                  d={branch.path} fill="none"
                  stroke={branchLit ? data.color : BARK}
                  strokeWidth={branchLit ? 7 : 6} strokeLinecap="round"
                  style={{ transition: 'stroke 0.3s ease' }}
                  {...draw(T.branch + bi * 0.15)}
                />
                <motion.path
                  d={branch.path} fill="none" stroke={data.color} strokeWidth={2}
                  strokeLinecap="round" strokeDasharray="6 30"
                  opacity={branchLit ? 1 : 0.55}
                  style={{ animation: prefersReducedMotion ? undefined : `energyFlow ${3 + bi * 0.4}s linear infinite` }}
                  {...draw(T.branch + bi * 0.15)}
                />

                {/* branch label — toggles collapse */}
                <motion.g
                  {...pop(T.branch + 0.6 + bi * 0.15)}
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); onToggleBranch(branch.id) }}
                  onDoubleClick={(e) => { e.stopPropagation(); focusBranch(branch.tip) }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={!isCollapsed}
                  aria-label={`${data.name} branch, ${isCollapsed ? 'collapsed' : 'expanded'}. Enter to toggle.`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleBranch(branch.id) }
                  }}
                >
                  <circle cx={branch.tip.x} cy={branch.tip.y} r={9} fill={data.color} filter="url(#kt-soft-glow)" />
                  <text
                    x={branch.tip.x} y={branch.tip.y - 16} textAnchor="middle"
                    fontSize={15} fontWeight={700} fontFamily="monospace"
                    fill={highContrast ? '#fff' : data.color}
                  >
                    {data.name}
                  </text>
                </motion.g>

                {/* skill twigs + nodes */}
                {!isCollapsed && branch.skills.map((skill, si) => {
                  const sdata = treeData.skills[skill.id]
                  const lit = litSkills.has(skill.id)
                  const op = skillOpacity(skill.id, branch.id)
                  return (
                    <g key={skill.id} opacity={op} style={{ transition: 'opacity 0.35s ease' }}>
                      <motion.path
                        d={skill.path} fill="none"
                        stroke={lit ? data.color : BARK} strokeWidth={lit ? 3 : 2}
                        strokeLinecap="round"
                        {...draw(T.twig + bi * 0.12 + si * 0.06, 0.6)}
                      />
                      {lit && !prefersReducedMotion && (
                        <path
                          d={skill.path} fill="none" stroke={data.color} strokeWidth={1.5}
                          strokeDasharray="3 14"
                          style={{ animation: 'energyFlow 1.2s linear infinite' }}
                        />
                      )}
                      <motion.g
                        {...pop(T.skill + bi * 0.12 + si * 0.08)}
                        style={{ cursor: 'pointer' }}
                        tabIndex={0}
                        role="button"
                        aria-label={`${sdata.name}, ${sdata.years} years experience. Enter for details.`}
                        onMouseEnter={() => setHoveredSkill(skill.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onFocus={() => setHoveredSkill(skill.id)}
                        onBlur={() => setHoveredSkill(null)}
                        onClick={(e) => { e.stopPropagation(); onSelectSkill(skill.id) }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectSkill(skill.id) }
                        }}
                      >
                        <circle
                          cx={skill.pos.x} cy={skill.pos.y} r={lit ? 8 : 5.5}
                          fill={data.color}
                          filter={lit ? 'url(#kt-soft-glow)' : undefined}
                          style={{ transition: 'r 0.25s ease' }}
                        />
                        <text
                          x={skill.pos.x} y={skill.pos.y - 12} textAnchor="middle"
                          fontSize={lit ? 13.5 : 12} fontFamily="monospace"
                          fontWeight={lit ? 700 : 500}
                          fill={highContrast ? '#fff' : lit ? data.color : 'rgba(210, 222, 255, 0.85)'}
                        >
                          {sdata.name}
                        </text>
                      </motion.g>
                    </g>
                  )
                })}

                {/* project leaves */}
                {branch.leaves.map((leaf, li) => {
                  const pdata = treeData.projects.find((p) => p.id === leaf.id)!
                  const lit = litLeaves.has(leaf.id)
                  const leafDim = hasFocus && !lit
                  return (
                    <g key={leaf.id} opacity={leafDim ? 0.15 : 1} style={{ transition: 'opacity 0.35s ease' }}>
                      <motion.path
                        d={leaf.path} fill="none" stroke={BARK} strokeWidth={1.5}
                        {...draw(T.leaf + li * 0.1, 0.5)}
                      />
                      <motion.g
                        {...pop(T.leaf + 0.2 + li * 0.12)}
                        style={{ cursor: 'pointer' }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Project: ${pdata.name}. Highlights technologies used.`}
                        onMouseEnter={() => setHoveredLeaf(leaf.id)}
                        onMouseLeave={() => setHoveredLeaf(null)}
                        onFocus={() => setHoveredLeaf(leaf.id)}
                        onBlur={() => setHoveredLeaf(null)}
                      >
                        <ellipse
                          cx={leaf.pos.x} cy={leaf.pos.y} rx={lit ? 12 : 9} ry={lit ? 7 : 5.5}
                          fill={GOLD} opacity={lit ? 1 : 0.8}
                          filter={lit ? 'url(#kt-soft-glow)' : undefined}
                          transform={`rotate(-25 ${leaf.pos.x} ${leaf.pos.y})`}
                        />
                        <text
                          x={leaf.pos.x} y={leaf.pos.y + 20} textAnchor="middle"
                          fontSize={11.5} fontFamily="monospace" fontStyle="italic"
                          fill={highContrast ? '#fff' : 'rgba(255, 224, 130, 0.9)'}
                        >
                          {pdata.name}
                        </text>
                      </motion.g>
                    </g>
                  )
                })}
              </g>
            )
          })}

          {/* live connection arcs while hovering */}
          <AnimatePresence>
            {connections.map(({ from, to }) => {
              const a = skillPositions[from]
              const b = skillPositions[to]
              if (!a || !b) return null
              return (
                <motion.path
                  key={`${from}-${to}`}
                  d={connectionPath(a, b)}
                  fill="none" stroke={GOLD} strokeWidth={1.5} strokeDasharray="4 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ animation: prefersReducedMotion ? undefined : 'energyFlow 1.5s linear infinite' }}
                />
              )
            })}
          </AnimatePresence>

          {/* ambient particles */}
          {isVisible && !prefersReducedMotion &&
            PARTICLES.map((p, i) => (
              <circle
                key={i}
                cx={p.x} cy={p.y} r={p.r}
                fill={i % 3 === 0 ? GOLD : '#7c9fff'}
                opacity={0}
                style={{ animation: `floatUp ${p.dur}s ease-in-out ${p.delay + 4}s infinite` }}
              />
            ))}
        </g>
      </svg>

      {/* floating skill card */}
      <AnimatePresence>
        {cardFor && cardBranch && cardPx && (
          <SkillCard skill={cardFor} color={cardBranch.color} x={cardPx.x} y={cardPx.y} />
        )}
      </AnimatePresence>
    </Box>
  )
}

export default KnowledgeTree
