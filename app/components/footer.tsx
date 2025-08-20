import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#9c4a4a] text-white text-center py-4 mt-8">
      <p className="text-sm sm:text-base">
        Created 2025 by{" "}
        <Link to="/about" className="underline hover:text-gray-200 transition">
          Muhammad Rizki Kurnia Putra
        </Link>
      </p>
    </footer>
  );
}
