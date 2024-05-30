import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: "300"
});
const interFont = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   icons: {
//     icon: '/favicon.svg', // /public path
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>AtomTechnology</title>
        <meta property="og:title" content="AtomTechnology" key="title" />
        <meta name="description" content="Alçando organizações à excelência em segurança da informação" />
        <link rel="icon" href="/logos/favicon.svg" />
      </head>
      <body>
      <ToastContainer
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
        />
        {children}
      </body>
    </html>
  );
}
