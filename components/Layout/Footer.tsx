import footerLinks from "../../lib/links/footerLinks";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useContext } from "react";
import { ToggleThemeContext } from "../../src/theme";
import { IContext } from "../../lib/interface/interface";

export default function Footer() {
  const { mode } = useContext(ToggleThemeContext) as IContext;

  return (
    <Box component="footer" bgcolor="#121212" py={5} mt={2}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Disclaimer */}
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: { sm: "center", md: "flex-start" },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" component="h2" color="info.main">
                Disclaimer:
              </Typography>
              <IconButton
                aria-label="Github icon link"
                href="https://github.com/pomubry/nextani"
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon htmlColor="white" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="white">
              This website is not the official Anilist.co. This is a small
              project made for learning purposes only. However, all data are
              fetched from Anilist&apos;s API.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid container item xs={12} sm={7} spacing={3}>
            {footerLinks.map((links, linksIdx) => (
              <Grid
                item
                xs={6}
                md={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 0.5, sm: 1 },
                }}
                key={linksIdx}
              >
                {links.map((link, linkIdx) => (
                  <Button
                    href={link.link}
                    target="_blank"
                    rel="noopener"
                    key={linkIdx}
                    sx={{ textAlign: "center" }}
                    color={mode === "dark" ? "primary" : "info"}
                  >
                    {link.name}
                  </Button>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
