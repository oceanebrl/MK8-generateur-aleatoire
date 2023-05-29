import Head from "next/head";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/globals.css";

export const metadata = {
  title: "MK8 : Random Picker",
  description:
    "Un générateur aléatoire de combot Kart / Personnages mais aussi de circuit pour Mario Kart 8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
