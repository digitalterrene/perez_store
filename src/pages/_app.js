import Footer from "@/components/native/Footer";
import Header from "@/components/native/Header";
import { AuthContextProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { CartProvider } from "react-use-cart";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <AuthContextProvider>
        <CartProvider>
          <div className="  w-full ">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </CartProvider>
      </AuthContextProvider>
    </div>
  );
}
