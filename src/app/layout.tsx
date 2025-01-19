import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leones App",
  description: "Venta de tickets para Leones",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookie = await cookies()
  const token = cookie.get('auth_data')
  const tokenData = token?.value ? JSON.parse(token.value) : null;

  return (
    <AuthProvider tokenData={tokenData}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
