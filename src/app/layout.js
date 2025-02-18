import "./globals.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Providers } from "@/hook/providers";
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';

export const metadata = {
  title: "OMG Digital Assets Management",
  description: "OMG Digital Assets Management", 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
			
      <body >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
