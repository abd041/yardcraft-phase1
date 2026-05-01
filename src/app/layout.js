import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const ycSans = Inter({
  variable: "--font-yc-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ycSerif = Cormorant_Garamond({
  variable: "--font-yc-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "YardCraft",
    template: "%s • YardCraft",
  },
  description:
    "Luxury landscaping and outdoor living transformations across Northern Virginia.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ycSans.variable} ${ycSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
