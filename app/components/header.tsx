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
          <Link to="/register" className="hover:underline">
            Register
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/logout" className="hover:underline">
            Logout
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </header>
    </div>
  );
}

// import { Link } from "react-router-dom";
// import type { UserAuthMe } from "~/modules/user/type";

// type HeaderProps = {
//   navigationLinks: { to: string; text: string }[];
//   user: UserAuthMe | null;
// };

// export function Header({ navigationLinks, user }: HeaderProps) {
//   return (
//     <div className="flex flex-col bg-[#7f3b3b] text-white">
//       <header className="flex justify-between items-center p-4">
//         {/* Logo */}
//         <div>
//           <Link to="/" className="hover:underline">
//             <h1 className="text-2xl font-bold">GLORY STORE</h1>
//           </Link>
//         </div>

//         {/* Navigation */}
//         <nav className="flex gap-4 items-center">
//           {navigationLinks.map((nav) => (
//             <Link key={nav.to} to={nav.to} className="hover:underline">
//               {nav.text}
//             </Link>
//           ))}

//           {/* Jika user login, tampilkan nama + Logout */}
//           {user?.fullName ? (
//             <>
//               <span className="ml-4 font-semibold">{user.fullName}</span>
//               <Link to="/logout" className="hover:underline">
//                 Logout
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//               <Link to="/register" className="hover:underline">
//                 Register
//               </Link>
//             </>
//           )}
//         </nav>
//       </header>
//     </div>
//   );
// }
