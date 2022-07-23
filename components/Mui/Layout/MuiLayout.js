import Nav from "./Nav";
import Footer from "./Footer";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function MuiLayout({ children }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Nav />
      {children}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 25, right: 25 }}
        href="#"
      >
        <NavigationIcon />
      </Fab>
      <Footer />
    </div>
  );
}
