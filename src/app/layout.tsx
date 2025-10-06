import type { Metadata } from "next";
import { Raleway, } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap"
});

const gambarino = localFont({
  src: "./Gambarino.woff2",
  display: "swap",
  variable: "--font-gambarino"
})


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.side_title || "Cote Royale Paris Training",
    description: settings.data.meta_description || "Discover the exquesite collection of luxury fragrances by Cote Royale Paris",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image) ? [settings.data.fallback_og_image.url] : ["/og-image.png"],
    }
  }
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <ViewTransitions>

      <html lang="en">
        <body
          className={`${raleway.variable} ${gambarino.variable}  antialiased bg-neutral-900 text-neutral-100`}
        >
          <NavBar settings={settings} />
          <main className="pt-14 md:pt-16">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
