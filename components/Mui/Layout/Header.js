import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { blue } from "@mui/material/colors";
import { ToggleThemeContext } from "../../../src/theme";

const middleLinks = [
  {
    title: "Social",
    href: "https://anilist.co/social",
  },
  {
    title: "Forum",
    href: "https://anilist.co/forum/overview",
  },
];

const rightLinks = [
  {
    title: "Login",
    href: "https://anilist.co/login",
  },
  {
    title: "Signup",
    href: "https://anilist.co/signup",
  },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { mode, toggleTheme } = React.useContext(ToggleThemeContext);
  const modeIcon = mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {/* Left logo */}
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "white", mr: -1 }}
            >
              N
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: blue[300] }}>
              A
            </Typography>
          </Box>

          {/* Middle Links */}
          <Box sx={{ display: { xs: "flex" } }}>
            {middleLinks.map((link, idx) => (
              <Link
                href={link.href}
                target="_blank"
                rel="noopener"
                underline="none"
                key={idx}
              >
                <Button sx={{ color: "white" }}>{link.title}</Button>
              </Link>
            ))}
          </Box>

          {/* Right-side menu icon at small viewport only */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {rightLinks.map((link, idx) => (
                <MenuItem onClick={() => setAnchorElNav(null)} key={idx}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    color="grey"
                  >
                    {link.title}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem
                onClick={toggleTheme}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {modeIcon}
              </MenuItem>
            </Menu>
          </Box>

          {/* Right-side links from small viewport and above */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link
              href="https://anilist.co/social"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              <Button sx={{ color: "white" }}>Login</Button>
            </Link>
            <Button
              variant="contained"
              color="info"
              sx={{ mx: 1, color: "white" }}
            >
              <Link
                href="https://anilist.co/forum/overview"
                target="_blank"
                rel="noopener"
                underline="none"
                color="white"
              >
                Signup
              </Link>
            </Button>
            <IconButton onClick={toggleTheme}>{modeIcon}</IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
