import { Box, Chip, Collapse, IconButton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { motion, useReducedMotion } from 'framer-motion'
import { treeData } from './treeData'
import { glassSx } from '../../styles/glass'

interface MobileTreeProps {
  isVisible: boolean
  query: string
  activeBranch: string | null
  collapsed: Set<string>
  onToggleBranch: (id: string) => void
  onSelectSkill: (id: string) => void
  /**
   * True on narrow viewports: single-column stack threaded by a trunk line.
   * False renders the same collapsible content as a wider desktop card grid
   * (used when the mobile-style list replaces the SVG canvas via config.ts).
   */
  compact: boolean
}

/** Collapsible list view of the tree: a single stacked column on mobile, a card grid on desktop. */
const MobileTree = ({
  isVisible, query, activeBranch, collapsed, onToggleBranch, onSelectSkill, compact,
}: MobileTreeProps) => {
  const prefersReducedMotion = useReducedMotion()
  const q = query.trim().toLowerCase()

  const branches = treeData.branches.filter((b) => !activeBranch || b.id === activeBranch)

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: compact ? '100%' : 1040, mx: 'auto', pl: compact ? 3 : 0 }}>
      {compact && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute', left: 8, top: 0, bottom: 0, width: 3, borderRadius: 2,
            background: 'linear-gradient(to bottom, #b388ff, #7c9fff, #4dd0e1)',
            '@keyframes mtPulse': { '0%, 100%': { opacity: 0.5 }, '50%': { opacity: 1 } },
            animation: prefersReducedMotion ? undefined : 'mtPulse 3.5s ease-in-out infinite',
          }}
        />
      )}

      <Typography sx={{
        fontFamily: 'monospace', fontWeight: 700, color: 'text.primary',
        textAlign: compact ? 'left' : 'center',
        fontSize: compact ? '1.1rem' : '1.6rem',
        mb: compact ? 2 : 3,
      }}>
        {treeData.trunkTitle}
        <Typography component="span" sx={{
          display: 'block', color: 'text.secondary', letterSpacing: 2,
          fontSize: compact ? '0.7rem' : '0.8rem', mt: compact ? 0 : 0.5,
        }}>
          {treeData.trunkSubtitle.toUpperCase()}
        </Typography>
      </Typography>

      <Box sx={compact ? undefined : {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 2,
      }}>
        {branches.map((branch, bi) => {
          const isCollapsed = collapsed.has(branch.id)
          const skills = branch.skills
            .map((id) => treeData.skills[id])
            .filter((s) => !q || s.name.toLowerCase().includes(q))
          const projects = treeData.projects.filter((p) => p.branchId === branch.id)

          return (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, x: compact ? -16 : 0, y: compact ? 0 : 12 }}
              animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: compact ? -16 : 0, y: compact ? 0 : 12 }}
              transition={{ delay: prefersReducedMotion ? 0 : bi * 0.1, duration: prefersReducedMotion ? 0 : 0.5 }}
            >
              <Box sx={compact ? { mb: 2 } : (theme) => ({ ...glassSx(theme), borderRadius: 3, p: 2, height: '100%' })}>
                <Box
                  onClick={() => onToggleBranch(branch.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={!isCollapsed}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleBranch(branch.id) }
                  }}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                >
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: branch.color, boxShadow: `0 0 10px ${branch.color}` }} />
                  <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: branch.color, fontSize: compact ? '1rem' : '1.05rem' }}>
                    {branch.name}
                  </Typography>
                  <IconButton size="small" aria-hidden tabIndex={-1} sx={{
                    color: branch.color, ml: 'auto',
                    transform: isCollapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 0.25s',
                  }}>
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Collapse in={!isCollapsed}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1, ml: compact ? 2.5 : 0 }}>
                    {skills.map((skill) => (
                      <Chip
                        key={skill.id}
                        label={`${skill.name} · ${skill.years}y`}
                        size="small"
                        onClick={() => onSelectSkill(skill.id)}
                        sx={{
                          fontFamily: 'monospace', fontSize: '0.7rem',
                          color: 'text.primary', border: `1px solid ${branch.color}55`,
                          backgroundColor: `${branch.color}14`,
                          '&:hover': { backgroundColor: `${branch.color}2e` },
                        }}
                      />
                    ))}
                    {projects.map((p) => (
                      <Chip
                        key={p.id}
                        label={`🍃 ${p.name}`}
                        size="small"
                        sx={{
                          fontFamily: 'monospace', fontSize: '0.7rem', fontStyle: 'italic',
                          color: '#ffd54f', border: '1px solid #ffd54f44', backgroundColor: '#ffd54f10',
                        }}
                      />
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </motion.div>
          )
        })}
      </Box>
    </Box>
  )
}

export default MobileTree
