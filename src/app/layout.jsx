import "./global.css";
import { AlertProvider } from "@components/ui/AlertMessage/AlertContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AlertProvider>{children}</AlertProvider>;
      </body>
    </html>
  );
}
