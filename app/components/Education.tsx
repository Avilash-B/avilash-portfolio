import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import { glassSx, glassHoverSx } from "../styles/glass";
import { TreeItem, TreeTrunk, useTreeAnimation } from "./Common/VerticalTree";

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
  const { visible, treeVisible, setItemRef } = useTreeAnimation(educations.length);

  return (
    <Box
      component="section"
      id="education"
      py={10}
      sx={{ minHeight: '100vh' }}
    >
      <Container maxWidth="lg">
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

        <Box mt={6} sx={{ position: 'relative' }}>
          <TreeTrunk treeVisible={treeVisible} />

          {educations.map((edu, idx) => (
            <TreeItem
              key={edu.degree}
              index={idx}
              visible={visible[idx]}
              duration={edu.duration}
              isCurrent={idx === 0}
              itemRef={setItemRef(idx)}
            >
              <Card
                elevation={3}
                sx={(theme) => ({
                  ...glassSx(theme),
                  width: 'auto',
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                    ...glassHoverSx(theme),
                  },
                })}
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
                  <Typography variant="body2" color="text.primary">
                    {edu.description}
                  </Typography>
                </CardContent>
              </Card>
            </TreeItem>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Education;
