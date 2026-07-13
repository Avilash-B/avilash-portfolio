import { Box, Chip, LinearProgress, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { treeData } from './treeData'
import type { SkillNode } from './treeData'

interface SkillCardProps {
  skill: SkillNode
  color: string
  x: number
  y: number
}

/** Floating glass info card shown while hovering a skill node. */
const SkillCard = ({ skill, color, x, y }: SkillCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.96 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      zIndex: 20,
      pointerEvents: 'none',
      width: 280,
    }}
  >
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: 'rgba(13, 17, 33, 0.85)',
        backdropFilter: 'blur(18px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 24px ${color}33`,
      }}
    >
      <Typography sx={{ color, fontWeight: 700, fontFamily: 'monospace', fontSize: '1.05rem' }}>
        {skill.name}
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', mb: 1 }}>
        {skill.years} {skill.years === 1 ? 'year' : 'years'} of experience
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', mb: 1.25 }}>
        {skill.description}
      </Typography>

      <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase' }}>
        Proficiency
      </Typography>
      <LinearProgress
        variant="determinate"
        value={skill.proficiency}
        sx={{
          mb: 1.25, mt: 0.5, height: 5, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.08)',
          '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 3 },
        }}
      />

      <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase', mb: 0.5 }}>
        Favorite features
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
        {skill.favoriteFeatures.map((f) => (
          <Chip key={f} label={f} size="small" sx={{
            fontSize: '0.65rem', height: 20,
            color: 'rgba(255,255,255,0.75)', backgroundColor: 'rgba(255,255,255,0.08)',
          }} />
        ))}
      </Box>

      <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase', mb: 0.5 }}>
        Projects
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem' }}>
        {skill.projects
          .map((id) => treeData.projects.find((p) => p.id === id)?.name ?? id)
          .join(' · ')}
      </Typography>
    </Box>
  </motion.div>
)

export default SkillCard
