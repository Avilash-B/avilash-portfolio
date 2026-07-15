"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { Box, Fade, Stack } from "@mui/material"
import { LinkedIn, GitHub, Instagram, FileDownload } from "@mui/icons-material"
import SocialLink from "./SocialLink"
import SignatureText from "./SignatureText"
import KoFiButton from "./KoFiButton"

const ProfileCard = ({ onComplete }: { onComplete?: () => void }) => {
  const [signatureDone, setSignatureDone] = useState(false)
  const handleComplete = useCallback(() => {
    setSignatureDone(true)
    onComplete?.()
  }, [onComplete])

  return (
  <Stack spacing={2} sx={{ height: '100%', justifyContent: 'center' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          width: { xs: 190, sm: 210, md: 220 },
          aspectRatio: '353 / 466',
          borderRadius: '28px',
          p: '2px',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #1e3a8a, #581c87, #0e7490)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 12px 40px rgba(88, 28, 135, 0.35)'
              : '0 12px 40px rgba(124, 174, 236, 0.35)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%', borderRadius: '25px', overflow: 'hidden' }}>
          <Image
            src="/images/avilash-2.jpg"
            alt="Avilash"
            fill
            sizes="(max-width: 600px) 190px, (max-width: 900px) 210px, 220px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            priority
          />
        </Box>
      </Box>
    </Box>

    <Box sx={{ color: 'text.primary' }}>
      <Stack direction="row" spacing={1.2} alignItems="center" justifyContent="center">
        <SocialLink href="https://www.linkedin.com/in/avilashbharti" icon={<LinkedIn />} label="LinkedIn" />
        <SocialLink href="https://github.com/avilash-b" icon={<GitHub />} label="GitHub" />
        <SocialLink href="https://www.instagram.com/avilash_bharti" icon={<Instagram />} label="Instagram" />
        <SocialLink href="/docs/resume.pdf" icon={<FileDownload />} label="Download Resume" download />
      </Stack>
      <Box sx={{ mt: 1 }}>
        <SignatureText onComplete={handleComplete} />
      </Box>
      <Fade in={signatureDone} timeout={600} mountOnEnter unmountOnExit>
        <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center' }}>
          <KoFiButton />
        </Box>
      </Fade>
    </Box>
  </Stack>
  )
}

export default ProfileCard
