import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="min-h-screen flex flex-col bg-[#7f3b3b] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold">GLORY STORE</h1>
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </header>
    </div>
  );
}
