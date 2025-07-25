import "@/app/global.css";
import RootProviders from "@/lib/providers/RootProviders";
export default function UserLayout({ children }) {
  return <RootProviders>{children}</RootProviders>;
}
