import {
  Box, Chip, Divider, Drawer, IconButton, Link, LinearProgress, Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import { treeData } from './treeData'

interface DetailPanelProps {
  skillId: string | null
  onClose: () => void
  onSelectSkill: (id: string) => void
}

const sectionTitleSx = {
  color: 'rgba(255,255,255,0.45)',
  fontSize: '0.7rem',
  letterSpacing: 1.5,
  textTransform: 'uppercase' as const,
  mb: 1,
  mt: 2.5,
}

/** Side panel with the full story of a selected technology. */
const DetailPanel = ({ skillId, onClose, onSelectSkill }: DetailPanelProps) => {
  const skill = skillId ? treeData.skills[skillId] : null
  const branch = skill ? treeData.branches.find((b) => b.id === skill.branchId) : null
  const color = branch?.color ?? '#4fc3f7'

  return (
    <Drawer
      anchor="right"
      open={!!skill}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420 },
          backgroundColor: 'rgba(10, 14, 28, 0.92)',
          backdropFilter: 'blur(24px) saturate(160%)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          backgroundImage: 'none',
          p: 3,
        },
      }}
    >
      {skill && (
        <Box role="region" aria-label={`${skill.name} details`}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ color, fontFamily: 'monospace', fontWeight: 700, fontSize: '1.5rem' }}>
                {skill.name}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                {branch?.name} · {skill.years} {skill.years === 1 ? 'year' : 'years'}
              </Typography>
            </Box>
            <IconButton onClick={onClose} aria-label="Close details" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography sx={sectionTitleSx}>Overview</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
            {skill.description}
          </Typography>

          <Typography sx={sectionTitleSx}>Experience</Typography>
          <LinearProgress
            variant="determinate"
            value={skill.proficiency}
            aria-label={`Proficiency ${skill.proficiency}%`}
            sx={{
              height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 3 },
            }}
          />
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', mt: 0.5 }}>
            {skill.proficiency}% proficiency · favorites: {skill.favoriteFeatures.join(', ')}
          </Typography>

          <Typography sx={sectionTitleSx}>Projects</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {skill.projects.map((pid) => {
              const project = treeData.projects.find((p) => p.id === pid)
              if (!project) return null
              return (
                <Box key={pid} sx={{
                  p: 1.5, borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.85rem' }}>
                    {project.name}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem' }}>
                    {project.description}
                  </Typography>
                </Box>
              )
            })}
          </Box>

          {skill.architectureNotes && (
            <>
              <Typography sx={sectionTitleSx}>Architecture decisions</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
                {skill.architectureNotes}
              </Typography>
            </>
          )}

          {(skill.github || skill.liveDemo) && (
            <>
              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
              <Box sx={{ display: 'flex', gap: 2 }}>
                {skill.github && (
                  <Link href={skill.github} target="_blank" rel="noopener" sx={{ color, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}>
                    <GitHubIcon fontSize="small" /> GitHub
                  </Link>
                )}
                {skill.liveDemo && (
                  <Link href={skill.liveDemo} target="_blank" rel="noopener" sx={{ color, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}>
                    <LaunchIcon fontSize="small" /> Live demo
                  </Link>
                )}
              </Box>
            </>
          )}

          <Typography sx={sectionTitleSx}>Related skills</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {skill.relatedSkills.map((rid) => {
              const related = treeData.skills[rid]
              if (!related) return null
              const relatedColor = treeData.branches.find((b) => b.id === related.branchId)?.color
              return (
                <Chip
                  key={rid}
                  label={related.name}
                  size="small"
                  onClick={() => onSelectSkill(rid)}
                  sx={{
                    color: relatedColor, borderColor: `${relatedColor}66`,
                    backgroundColor: 'transparent', border: '1px solid',
                    '&:hover': { backgroundColor: `${relatedColor}1a` },
                  }}
                />
              )
            })}
          </Box>
        </Box>
      )}
    </Drawer>
  )
}

export default DetailPanel
