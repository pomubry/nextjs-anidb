import footerLinks from "../../../lib/footerLinks";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer style={{ marginTop: "auto" }}>
      <Box bgcolor="#11161d" py={5}>
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
              <Typography variant="h6" component="h2" color="info.main" mb={3}>
                Disclaimer:
              </Typography>
              <Typography variant="body2" color="#fff">
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
                    <Link
                      href={link.link}
                      underline="none"
                      target="_blank"
                      rel="noopener"
                      key={linkIdx}
                      color="#90caf9"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
