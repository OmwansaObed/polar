// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/lib/providers/SessionProvider"; // NextAuth provider
import ReduxProvider from "@/redux/reduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins-sans",
  display: "swap",
});

export const metadata = {
  title: "Polar - Roller Skating Community",
  keywords: "roller skating, community, events, safety, fun, fitness",
  authors: [{ name: "Polar Team", url: "https://polarclub.vercel.app" }],
  creator: "Polar Team",
  description:
    "Get ready to roll with Polar, your ultimate roller skating community!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <ReduxProvider>
          <Providers>
            <Navbar />
            <Toaster />
            {children}
            <Footer />
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
