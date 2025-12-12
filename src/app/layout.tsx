import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlgoFlow | DSA Visualizer",
  description:
    "Smooth, minimal visual explanations of data structures and algorithms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-slate-950 text-slate-50 antialiased"
      >
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
