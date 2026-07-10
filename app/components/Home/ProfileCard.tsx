"use client"

import Image from "next/image"
import { Box, Stack } from "@mui/material"
import { LinkedIn, GitHub, Instagram, FileDownload } from "@mui/icons-material"
import SocialLink from "./SocialLink"

const ProfileCard = () => (
  <Stack spacing={2} sx={{ height: '100%', justifyContent: 'center' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          borderRadius: '50%',
          border: (theme) =>
            `4px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : 'white'}`,
          overflow: 'hidden',
          flexShrink: 0,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.2)' },
        }}
      >
        <Image
          src="/images/avilash-home.jpg"
          alt="Avilash"
          width={200}
          height={200}
          style={{ display: 'block', borderRadius: '10%' }}
        />
      </Box>
    </Box>

    <Stack direction="row" spacing={1.2} alignItems="center" justifyContent="center">
      <SocialLink href="https://www.linkedin.com/in/avilashbharti" icon={<LinkedIn />} label="LinkedIn" />
      <SocialLink href="https://github.com/avilash-b" icon={<GitHub />} label="GitHub" />
      <SocialLink href="https://www.instagram.com/avilash_bharti" icon={<Instagram />} label="Instagram" />
      <SocialLink href="/docs/resume.pdf" icon={<FileDownload />} label="Download Resume" download />
    </Stack>
  </Stack>
)

export default ProfileCard
