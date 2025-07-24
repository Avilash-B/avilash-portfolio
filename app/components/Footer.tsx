import { Box, Container, Typography, Link, Stack } from "@mui/material"

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'grey.800',
        color: 'white',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Avilash. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link 
              href="https://coolify.avilashbharti.in/" 
              color="inherit" 
              underline="hover"
              sx={{ 
                transition: 'color 0.15s ease-in-out',
                '&:hover': { color: 'grey.300' }
              }}
            >
              Self Hosted
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer

