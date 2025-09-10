import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Almostus.in",
  description: "Reconnect with the moments that almost slipped away.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
