import type { Metadata } from "next";
import Header from "@/component/header";
import Footer from "@/component/footer";
import ReduxProvider from "@/redux/reduxProvider";
import GoogleTranslate from "@/component/googleTranslate";
import Script from "next/script";
import { GoogleOAuthProvider } from "@react-oauth/google";

//style
import "@/style/globals.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Metadata
export const metadata: Metadata = {
  title: "VIVI Academy",
  description: "VIVI Academy Beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=6Ldg4O4qAAAAACsIuqumgZbOrItg5kjtWB23w52n`} />
        {/* Google Translate Widget (Gizli olacak) */}
        <GoogleTranslate />

        {/* Header içine LanguageDropdown eklenecek */}
        <Header />

        <ReduxProvider>
        <GoogleOAuthProvider clientId="910256832117-26mdluesnd6om1kankgnvh9mtudm9q60.apps.googleusercontent.com">
          {children}
          </GoogleOAuthProvider>
          </ReduxProvider>

        <Footer />
      </body>
    </html>
  );
}
