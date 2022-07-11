import Nav from "./Nav";
import Footer from "./Footer";

export default function MuiLayout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
