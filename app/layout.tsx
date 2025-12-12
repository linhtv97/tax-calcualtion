import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tính Thuế Thu Nhập Cá Nhân Việt Nam | Gross ⇄ Net",
  description: "Công cụ tính thuế thu nhập cá nhân Việt Nam - Chuyển đổi Gross sang Net dễ dàng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

