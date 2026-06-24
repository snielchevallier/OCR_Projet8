import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { decodeTokenPayload } from "@/lib/auth";
import type { User } from "@/types/user";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasa",
  description: "location d'appartements et de maisons entre particuliers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await decodeTokenPayload()
  const initialUser = payload
    ? ({ id: payload.id, name: payload.name, email: payload.email, picture: null, role: payload.role } as User)
    : null

  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-light-orange font-sans">
        <AuthProvider initialUser={initialUser}>
          <FavoritesProvider>
            <Header />
            <div className="flex-1 flex flex-col w-full max-w-278 mx-auto">
              {children}
            </div>
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
