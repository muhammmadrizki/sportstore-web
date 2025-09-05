import { Outlet } from "react-router";
import { Footer } from "../components/footer";
// import { Footer } from "~/components/footer";
import { Header } from "../components/header";

export default function LayoutMain() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* will either be home.tsx or settings.tsx */}
      <main className="flex-[1]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
