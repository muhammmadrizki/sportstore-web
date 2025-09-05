import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className=" flex flex-col bg-[#7f3b3b] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-[#7f3b3b] text-white">
        <div>
          <Link to={"/"} className="hover:underline">
            <h1 className="text-2xl font-bold">GLORY STORE</h1>
          </Link>
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </header>
    </div>
  );
}
