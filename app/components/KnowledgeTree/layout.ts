import { treeData } from './treeData'

/**
 * Computes a deterministic organic layout for the tree in a 1000x1000 viewBox.
 * Ground line sits at y=GROUND; roots grow below it, canopy above.
 */

export interface Point {
  x: number
  y: number
}

export interface SkillLayout {
  id: string
  pos: Point
  path: string // twig from branch anchor to the skill node
}

export interface LeafLayout {
  id: string
  pos: Point
  path: string // stem from branch to the leaf
}

export interface BranchLayout {
  id: string
  path: string // limb from trunk to branch tip
  start: Point
  tip: Point
  labelPos: Point
  skills: SkillLayout[]
  leaves: LeafLayout[]
}

export interface RootLayout {
  id: string
  path: string
  labelPos: Point
}

export const VIEW_W = 1000
export const VIEW_H = 1000
export const GROUND = 680
export const TRUNK_BASE: Point = { x: 500, y: GROUND }
export const TRUNK_TOP: Point = { x: 500, y: 430 }

const rad = (deg: number) => (deg * Math.PI) / 180

// Small deterministic wobble so lines never look ruler-straight.
const wobble = (seed: number, amp: number) => {
  const s = Math.sin(seed * 127.1) * 43758.5453
  return (s - Math.floor(s) - 0.5) * 2 * amp
}

const curve = (from: Point, to: Point, bend: number, seed: number): string => {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  // perpendicular offset for an organic bow
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const px = (-dy / len) * (bend + wobble(seed, bend * 0.4))
  const py = (dx / len) * (bend + wobble(seed + 1, bend * 0.4))
  return `M ${from.x} ${from.y} Q ${mx + px} ${my + py} ${to.x} ${to.y}`
}

// ---------- Roots ----------
export const rootLayouts: RootLayout[] = treeData.roots.map((root, i) => {
  const n = treeData.roots.length
  // fan roots from -150deg to -30deg measured downward
  const t = n === 1 ? 0.5 : i / (n - 1)
  const angle = rad(200 + t * 140) // 200deg..340deg (below the ground line)
  const reach = 200 + wobble(i * 3 + 5, 40)
  const tip: Point = {
    x: TRUNK_BASE.x + Math.cos(angle) * reach,
    y: TRUNK_BASE.y - Math.sin(angle) * reach * 0.55, // squash vertically
  }
  return {
    id: root.id,
    path: curve(TRUNK_BASE, tip, 24, i * 7 + 2),
    labelPos: tip,
  }
})

// ---------- Trunk ----------
export const trunkPath = `M ${TRUNK_BASE.x} ${TRUNK_BASE.y} C ${TRUNK_BASE.x - 14} ${GROUND - 90}, ${TRUNK_TOP.x + 12} ${TRUNK_TOP.y + 80}, ${TRUNK_TOP.x} ${TRUNK_TOP.y}`

// ---------- Branches, skills, leaves ----------
const BRANCH_ANGLES = [155, 120, 90, 60, 25] // degrees, 0 = right, 90 = straight up

export const branchLayouts: BranchLayout[] = treeData.branches.map((branch, bi) => {
  const angle = rad(BRANCH_ANGLES[bi % BRANCH_ANGLES.length])
  const outward = Math.abs(Math.cos(angle)) // 1 = horizontal branch, 0 = vertical
  // branches leave the trunk lower when they point more sideways
  const start: Point = {
    x: TRUNK_TOP.x,
    y: TRUNK_TOP.y + outward * 90 + wobble(bi, 12),
  }
  const reach = 190 + outward * 55
  const tip: Point = {
    x: start.x + Math.cos(angle) * reach,
    y: start.y - Math.sin(angle) * reach,
  }

  // Skills fan out past the branch tip.
  const skills: SkillLayout[] = branch.skills.map((skillId, si) => {
    const n = branch.skills.length
    const t = n === 1 ? 0.5 : si / (n - 1)
    const spread = rad(70) // total fan width
    const skillAngle = angle - spread / 2 + t * spread
    const dist = 105 + wobble(bi * 10 + si, 22)
    const pos: Point = {
      x: tip.x + Math.cos(skillAngle) * dist,
      y: tip.y - Math.sin(skillAngle) * dist,
    }
    return {
      id: skillId,
      pos,
      path: curve(tip, pos, 14, bi * 20 + si * 3),
    }
  })

  // Leaves hang from partway along the limb.
  const leaves: LeafLayout[] = treeData.projects
    .filter((p) => p.branchId === branch.id)
    .map((project, li) => {
      const anchor: Point = {
        x: start.x + (tip.x - start.x) * 0.55,
        y: start.y + (tip.y - start.y) * 0.55,
      }
      const side = li % 2 === 0 ? 1 : -1
      const pos: Point = {
        x: anchor.x + side * (46 + wobble(bi + li, 10)),
        y: anchor.y + 52 + li * 26,
      }
      return {
        id: project.id,
        pos,
        path: curve(anchor, pos, 10, bi * 31 + li * 5),
      }
    })

  return {
    id: branch.id,
    path: curve(start, tip, 30, bi * 13 + 3),
    start,
    tip,
    labelPos: { x: tip.x, y: tip.y },
    skills,
    leaves,
  }
})

/** Quick lookup: skill id -> absolute position (for connection lines). */
export const skillPositions: Record<string, Point> = Object.fromEntries(
  branchLayouts.flatMap((b) => b.skills.map((s) => [s.id, s.pos])),
)

export const leafPositions: Record<string, Point> = Object.fromEntries(
  branchLayouts.flatMap((b) => b.leaves.map((l) => [l.id, l.pos])),
)

/** Connection path between two skills (gentle arc). */
export const connectionPath = (a: Point, b: Point): string => {
  const mx = (a.x + b.x) / 2
  const my = Math.min(a.y, b.y) - 40
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}
