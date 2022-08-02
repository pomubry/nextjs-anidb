import Nav from "./Nav";
import Footer from "./Footer";
import { Fab, Box } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Head from "next/head";

export default function MuiLayout({ children }) {
  return (
    <>
      <Head>
        <meta name="author" content="pomubry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}
