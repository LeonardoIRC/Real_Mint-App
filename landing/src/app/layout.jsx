export const metadata = {
    title: "RealMint",
    description: "Powering NewFi to Real Estate",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="pt-BR">
        <body className="min-h-screen">{children}</body>
      </html>
    );
  }
  