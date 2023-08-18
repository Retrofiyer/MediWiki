import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/navbar";
import Loader from "@/app/components/loader";

const Loading=true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
         <body>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
    </html>
  );
}
