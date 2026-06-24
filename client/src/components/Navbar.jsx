import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="h-12">
            <img
              className="h-full w-auto object-contain"
              src={logo}
              alt="Velaro"
            />
          </NavLink>

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

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-gray-700 hover:text-[#6C63FF] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6C63FF] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {!user ? (
              <NavLink to="/login">
                <button className="px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition">
                  Login
                </button>
              </NavLink>
            ) : (
              <div className="flex items-center gap-4">
                <span>{user.name}</span>
                <button
                  className="cursor-pointer px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
