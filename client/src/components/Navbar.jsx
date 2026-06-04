import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="h-12">
          <img
            className="h-full w-auto object-contain"
            src="../assets/images/logo.svg"
            alt="Velaro"
          />
        </div>

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
        <NavLink to="/login">
          <button className="px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition">
            Login
          </button>
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
