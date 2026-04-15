import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/organism/provider";
import BaseLayout from "@/components/organism/layout/baseLayout";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shopping Catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Provider>
          <BaseLayout>
            {children}
            <ToastContainer />
          </BaseLayout>
        </Provider>
      </body>
    </html>
  );
}
