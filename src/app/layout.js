import ReduxProvider from "@/store/ReduxProvider";
import "./globals.css";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "JD Store",
  description: "Timeless style, for every soul.",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
