import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CrickEase",
  description: "Crickkart is a cricket store where you can buy cricket equipment.",
  image: "/crickEase-logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href={metadata.image} />
      </head>
      <body
        className={` bg-gray-100 min-h-screen`}
      >
        <AuthProvider>
          <Navbar />

          {children}
          <Toaster  position="top-right"/>
        </AuthProvider>
      </body>
    </html>
  );
}
