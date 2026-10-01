import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ModalProvider } from "@/components/modal/ModalContext";
import GlobalModals from "@/components/modal/GlobalModals";
import FloatingActionWidget from "@/components/ui/FloatingActionWidget";
import ParallaxScrollProgress from "@/components/animation/ParallaxScrollProgress";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Light theme only
export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#F6F5F1",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jdivineecovalley.com"),
  title: {
    default: "J The Divine Eco Valley | Natural Cardamom & Spice Garlands",
    template: "%s | J The Divine Eco Valley",
  },
  description:
    "J The Divine Eco Valley creates handcrafted natural garlands made from cardamom, nuts, spices and botanical materials for weddings, ceremonies, homes, celebrations and global markets.",
  keywords: [
    "cardamom garland",
    "natural garlands",
    "spice garland",
    "wedding garland",
    "spiritual garlands",
    "Indian botanical craft",
    "handcrafted garlands India",
    "natural export garlands",
  ],
  authors: [{ name: "J The Divine Eco Valley" }],
  creator: "J The Divine Eco Valley",
  publisher: "J The Divine Eco Valley",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jdivineecovalley.com",
    siteName: "J The Divine Eco Valley",
    title: "J The Divine Eco Valley | Natural Cardamom & Spice Garlands",
    description:
      "Handcrafted natural garlands created from cardamom, nuts, spices and carefully selected botanical materials — bringing together craftsmanship, culture and nature for celebrations across the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "J The Divine Eco Valley | Natural Cardamom & Spice Garlands",
    description:
      "Handcrafted natural garlands created from cardamom, nuts, spices and carefully selected botanical materials.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "J The Divine Eco Valley",
    description:
      "Handcrafted natural garlands created from cardamom, nuts, spices and botanical materials.",
    url: "https://jdivineecovalley.com",
    craft: "Natural decorative garlands manufacturer and exporter",
    foundingLocation: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "Natural decorative garlands",
      "Cardamom garlands",
      "Indian cultural craftsmanship",
      "Botanical exports",
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-canvas text-emerald font-sans antialiased selection:bg-gold selection:text-emerald-dark">
        <ModalProvider>
          <ParallaxScrollProgress />
          <Navbar />
          <main className="flex-1 w-full bg-canvas">{children}</main>
          <Footer />
          <GlobalModals />
          <FloatingActionWidget />
        </ModalProvider>
      </body>
    </html>
  );
}
