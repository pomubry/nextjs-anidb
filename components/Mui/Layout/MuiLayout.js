import Nav from "./Nav";
import Footer from "./Footer";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function MuiLayout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 15, right: 15 }}
        href="#"
      >
        <NavigationIcon />
      </Fab>
      <Footer />
    </div>
  );
}
