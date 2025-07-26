import React, { useRef, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";

const educations = [
  {
    degree: "Master of Computer Application",
    institution: "Centre for Development of Advanced Computing, India",
    duration: "2016 - 2019",
    description: "",
  },
  {
    degree: "Bachelor of Computer Application",
    institution: "Maharaja Surajmal Institute, India",
    duration: "2013 - 2016",
    description: "",
  },
  {
    degree: "Schooling",
    institution: "Red Roses Public School, Delhi - India",
    duration: "2001 - 2013",
    description: "",
  },
];

const Education = () => {
  const [visible, setVisible] = useState(Array(educations.length).fill(false));
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Fallback for iPad and tablet views where intersection observer fails
  useEffect(() => {
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

    if (isTablet) {
      // For tablets, show cards immediately with a slight delay for staggered effect
      educations.forEach((_, index) => {
        setTimeout(() => {
          setVisible(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 200); // Staggered appearance
      });
    }
  }, []);

  useEffect(() => {
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

    // Skip intersection observer for tablets since it's unreliable
    if (isTablet) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const index = Number(target.dataset.index);
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const newVisible = [...prev];
              if (!newVisible[index]) {
                newVisible[index] = true;
              }
              return newVisible;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const timeoutId = setTimeout(() => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Box
      component="section"
      id="education"
      py={10}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'grey.900'
            : 'grey.100'
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
          fontFamily="monospace"
          sx={{ color: 'text.primary' }}
        >
          Education
        </Typography>
        <Box mt={4}>
          {educations.map((edu, idx) => (
            <Box
              key={idx}
              ref={(el: HTMLElement | null) => {
                cardRefs.current[idx] = el
              }}
              data-index={idx}
              mb={4}
              sx={{
                transform: visible[idx]
                  ? 'translateX(0)'
                  : {
                    xs: `translateY(${idx % 2 === 0 ? '50px' : '-50px'})`,
                    sm: `translateX(${idx % 2 === 0 ? '-100%' : '100%'})`
                  },
                opacity: visible[idx] ? 1 : 0,
                transition: `all ${350 + idx * 110}ms ease-in-out`,
              }}
            >
              <Card
                elevation={3}
                sx={{
                  width: 'auto',
                  backgroundColor: 'background.paper',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1.5}>
                    <SchoolIcon color="primary" sx={{ mr: 1 }} />
                    <Typography
                      variant="h6"
                      component="div"
                      fontWeight="medium"
                      color="text.primary"
                      fontFamily="monospace"
                    >
                      {edu.degree}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    mb={0.5}
                    color="text.secondary"
                  >
                    {edu.institution}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={1}
                    fontFamily="monospace"
                  >
                    {edu.duration}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {edu.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Education;
