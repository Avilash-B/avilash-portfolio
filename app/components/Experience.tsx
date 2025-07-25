import React, { useRef, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Slide from "@mui/material/Slide";
import WorkIcon from "@mui/icons-material/Work";

const experiences = [
  {
    company: "Ahead",
    url: "https://www.ahead.com/",
    position: "Technical Consultant",
    duration: "May 2025 - Present",
    description: "",
  },
  {
    company: "Nagarro",
    url: "https://www.nagarro.com/",
    position: "Associate Staff Engineer",
    duration: "Jan 2022 - May 2025",
    description: "Built and maintained microservices in the non-profit domain, modernized SOAP APIs to REST, and handled testing, documentation, and cloud monitoring. Actively contributed to client discussions and agile planning.",
  },
  {
    company: "Accolite Digital",
    url: "https://www.bounteous.com/",
    position: "Senior Software Engineer",
    duration: "Nov 2020 - Jan 2022",
    description: "Developed a greenfield solution for the energy sector and led CDF generation for remote meters. Mentored team members and ensured high test coverage using Xunit.",
  },
  {
    company: "Fareportal",
    url: "https://www.fareportal.com/",
    position: "Software Engineer",
    duration: "Jan 2019 - Nov 2020",
    description: "Worked on scalable web APIs and data handling for a global travel platform. Migrated services to .NET Core and maintained quality with NUnit and Sonar in an Agile setup.",
  },
];

const Experience = () => {
  // one state for each card's visibility
  const [visible, setVisible] = useState(
    Array(experiences.length).fill(false)
  );
  const cardRefs = useRef([]);

  // trigger the animation when card enters viewport
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index)
          if (entry.isIntersecting && !visible[index]) {
            setVisible((prev) =>
              prev.map((v, i) => (i === index ? true : v))
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
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
      id="experience"
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
          fontFamily="monospace"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Experience
        </Typography>

        <Box mt={4}>
          {experiences.map((exp, idx) => (
            <Box
              key={exp.company}
              ref={(el) => {
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
                    width:'auto',
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
                      <WorkIcon color="primary" sx={{ mr: 1 }} />
                      <Typography
                        variant="h6"
                        component="div"
                        fontWeight="medium"
                        fontFamily="monospace"
                      >
                        {exp.position}
                      </Typography>
                    </Box>
                    <Typography variant="body1" mb={0.5}>
                      <Link
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        underline="hover"
                        fontWeight="medium"
                      >
                        {exp.company}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1} fontFamily="monospace">
                      {exp.duration}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ whiteSpace: "pre-line", fontFamily: 'monospace' }}
                    >
                      {exp.description}
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

export default Experience;
