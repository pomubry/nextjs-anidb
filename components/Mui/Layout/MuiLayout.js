import Nav from "./Nav";
import Footer from "./Footer";
import { Fab, Box } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function MuiLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <main>{children}</main>
      <Footer />
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 25, right: 25 }}
        href="#"
      >
        <NavigationIcon />
      </Fab>
    </Box>
  );
}
