import Header from "./Header";
import Footer from "./Footer";

export default function MuiLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
