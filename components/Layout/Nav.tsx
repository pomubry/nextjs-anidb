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
import { Switch, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ToggleThemeContext } from "../../src/theme";
import navLinks from "../../lib/navLinks";
import StyledLink from "../../src/Link";
import { IContext } from "../../lib/interface";

export default function Nav() {
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { mode, toggleTheme } = React.useContext(
    ToggleThemeContext
  ) as IContext;

  const [anchorElNav, setAnchorElNav] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  return (
    <nav>
      <AppBar position="static">
        <Container maxWidth={lessThanSmall ? "xs" : "lg"}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
            }}
          >
            {/* Left logo */}
            <Box sx={{ display: "flex", flex: 1 }}>
              <StyledLink underline="none" href="/" sx={{ display: "flex" }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "white", mr: -1 }}
                >
                  N
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: blue[300] }}
                >
                  A
                </Typography>
              </StyledLink>
            </Box>

            {/* Right-side menu icon at xs viewport only */}
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
                {navLinks.map((link, idx) => (
                  <MenuItem onClick={() => setAnchorElNav(null)} key={idx}>
                    <Link
                      href={link.link}
                      target="_blank"
                      rel="noopener"
                      underline="none"
                      color="grey"
                    >
                      {link.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Right-side links from small viewport and above */}
            <Box sx={{ display: { xs: "none", sm: "flex", gap: 10 } }}>
              {navLinks.map((link, idx) =>
                link.name !== "Sign Up" ? (
                  <Link
                    href={link.link}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    key={idx}
                  >
                    <Button sx={{ color: "white" }}>{link.name}</Button>
                  </Link>
                ) : (
                  <Link
                    href={link.link}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    color="white"
                    key={idx}
                  >
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ color: "white" }}
                    >
                      {link.name}
                    </Button>
                  </Link>
                )
              )}
            </Box>

            {/* Theme Toggle */}
            <Switch
              onChange={toggleTheme}
              checked={mode === "dark"}
              inputProps={{ "aria-label": "dark mode switch" }}
              icon={<Brightness4Icon sx={{ transform: "translateY(-9%)" }} />}
              checkedIcon={
                <Brightness7Icon sx={{ transform: "translateY(-9%)" }} />
              }
            />
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}
