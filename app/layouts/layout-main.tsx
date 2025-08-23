import { Outlet } from "react-router";
import { Footer } from "../components/footer";
// import { Footer } from "~/components/footer";
import { Header } from "../components/header";

export default function LayoutMain() {
  return (
    <div>
      <Header />
      {/* will either be home.tsx or settings.tsx */}
      <Outlet />
      <Footer />
    </div>
  );
}
