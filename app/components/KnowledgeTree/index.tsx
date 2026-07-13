import { useState } from "react";
import {
  Box,
  Chip,
  Container,
  Fade,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { treeData } from "./treeData";
import { DISABLE_TREE_VIEW } from "./config";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import KnowledgeTree from "./KnowledgeTree";
import MobileTree from "./MobileTree";
import DetailPanel from "./DetailPanel";

/**
 * "The Knowledge Tree" — an interactive Yggdrasil-inspired visualization of
 * skills, domains and projects. Data-driven from treeData.ts.
 */
const KnowledgeTreeSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Starts from the config default; the "Simple View" toggle flips it at runtime.
  const [disableTreeView, setDisableTreeView] = useState(DISABLE_TREE_VIEW);
  // With the canvas disabled, the list view (built for mobile) is used everywhere.
  const useListLayout = disableTreeView || isMobile;

  const [query, setQuery] = useState("");
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleBranch = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const treeProps = {
    isVisible,
    query,
    activeBranch,
    collapsed,
    onToggleBranch: toggleBranch,
    onSelectSkill: setSelectedSkill,
  };

  return (
    <Box
      id="knowledge-tree"
      component="section"
      sx={{
        // The interactive canvas needs to fit exactly one screen (its pan/zoom
        // only make sense within a fixed viewport); the list view has no such
        // constraint, so it's left to grow naturally instead of clipping its
        // own content behind an internal scrollbar.
        height: useListLayout ? "auto" : "100vh",
        minHeight: "100vh",
        pt: { xs: 10, md: 6 },
        // pb: 2,
        display: "flex",
        flexDirection: "column",
        overflow: useListLayout ? "visible" : "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ height: useListLayout ? "auto" : "100%", display: "flex", flexDirection: "column" }}
      >
        <Fade in={isVisible} timeout={1000} style={{ height: useListLayout ? "auto" : "100%" }}>
          <Box
            ref={ref}
            sx={{ height: useListLayout ? "auto" : "100%", display: "flex", flexDirection: "column" }}
          >
            {/* <Typography
                          variant="h4"
                          component="h2"
                          sx={{
                            fontWeight: 'bold',
                            // mb: 4,
                            textAlign: 'center',
                            color: 'text.primary',
                            fontFamily: 'monospace',
                          }}
                        >
                          Skills
                        </Typography> */}
            {!disableTreeView && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  mb: 1,
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  flexShrink: 0,
                }}
              >
                A living map of the journey — roots, branches, and the projects
                they bore.
              </Typography>
            )}

            {/* toolbar: search + category filters */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 1.5,
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Tooltip title={disableTreeView ? "Switch to the interactive tree" : "Switch to a simple list view"}>
                <Chip
                  label="Simple View"
                  size="medium"
                  clickable
                  onClick={() => setDisableTreeView((prev) => !prev)}
                  aria-pressed={disableTreeView}
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    height: 40,
                    px: 1,
                    color: disableTreeView ? "#0b0e1c" : "#7c9fff",
                    backgroundColor: disableTreeView ? "#7c9fff" : "rgba(124,159,255,0.1)",
                    border: "2px solid #7c9fff",
                    boxShadow: disableTreeView ? "0 0 16px rgba(124,159,255,0.7)" : "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: disableTreeView ? "#7c9fff" : "rgba(124,159,255,0.2)",
                      boxShadow: "0 0 16px rgba(124,159,255,0.5)",
                    },
                  }}
                />
              </Tooltip>
              <TextField
                size="small"
                placeholder="Search skills…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                inputProps={{ "aria-label": "Search skills" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 220,
                  "& .MuiInputBase-root": {
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                  },
                }}
              />
              {treeData.branches.map((branch) => (
                <Tooltip
                  key={branch.id}
                  title={
                    activeBranch === branch.id
                      ? "Show all"
                      : `Focus ${branch.name}`
                  }
                >
                  <Chip
                    label={branch.name}
                    size="small"
                    clickable
                    onClick={() =>
                      setActiveBranch((cur) =>
                        cur === branch.id ? null : branch.id,
                      )
                    }
                    sx={{
                      fontFamily: "monospace",
                      color:
                        activeBranch === branch.id ? "#0b0e1c" : branch.color,
                      backgroundColor:
                        activeBranch === branch.id
                          ? branch.color
                          : `${branch.color}14`,
                      border: `1px solid ${branch.color}55`,
                      "&:hover": {
                        backgroundColor:
                          activeBranch === branch.id
                            ? branch.color
                            : `${branch.color}2e`,
                      },
                    }}
                  />
                </Tooltip>
              ))}
            </Box>

            {/* canvas mode: fills whatever vertical space remains after the toolbar/caption.
                list mode: grows to its natural content height (no internal scrollbar). */}
            <Box
              sx={
                useListLayout
                  ? { width: "100%" }
                  : { flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }
              }
            >
              {useListLayout ? (
                <MobileTree {...treeProps} compact={isMobile} />
              ) : (
                <KnowledgeTree {...treeProps} />
              )}
            </Box>

            {!useListLayout && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  mt: 0.75,
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              >
                scroll to zoom · drag to pan · click a branch name to collapse ·
                double-click a branch to focus · double-click background to
                reset
              </Typography>
            )}
          </Box>
        </Fade>
      </Container>

      <DetailPanel
        skillId={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectSkill={setSelectedSkill}
      />
    </Box>
  );
};

export default KnowledgeTreeSection;
