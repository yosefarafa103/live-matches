"use client"
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient()
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>مباريات اليوم</title>
        <meta name="description" content="مباريات اليوم بشكل حصري فقط لدينا دون اي منافس لنا" />
      </head>
      <body
      >
        <QueryClientProvider client={client}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
          </ThemeProvider>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
