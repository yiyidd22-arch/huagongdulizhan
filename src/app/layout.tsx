import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { company } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} | Sodium Chlorite Manufacturer & Exporter`,
    template: `%s | ${company.name}`,
  },
  description:
    "Shandong Gaomi Gaoyuan Chemical Industry Co., Ltd. — China's largest sodium chlorite manufacturer and exporter. Yinzhou brand, ISO9001 certified, exporting to 40+ countries since 1992.",
  keywords: [
    "sodium chlorite",
    "亚氯酸钠",
    "sodium chlorate",
    "氯酸钠",
    "Gaoyuan Chemical",
    "Yinzhou",
    "SUNVIM Group",
    "chemical exporter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('gaoyuan-locale');if(l==='zh'||l==='en')document.documentElement.lang=l==='zh'?'zh-CN':'en';}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
