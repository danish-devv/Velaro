import { NavLink } from "react-router-dom";
import { useContext } from "react";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="h-12">
          <img
            className="h-full w-auto object-contain"
            src={logo}
            alt="Velaro"
          />
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-[#6C63FF] transition-colors"
          >
            Home
          </NavLink>

          <NavLink
            to="/categories"
            className="text-gray-700 hover:text-[#6C63FF] transition-colors"
          >
            Categories
          </NavLink>

          <NavLink
            to="/products"
            className="text-gray-700 hover:text-[#6C63FF] transition-colors"
          >
            Products
          </NavLink>
        </nav>

        {/* Auth */}
        {!user ? (
          <div className="flex gap-3">
            <NavLink to="/login">
              <button className="px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition" >
                Login
              </button>
            </NavLink>

            
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span>{user.name}</span>

            <button
              className="px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
