import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/");
  };

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
            {/* Cart Button */}
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

            {/* Auth Section */}
            {!user ? (
              <NavLink to="/login">
                <button className="px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition">
                  Login
                </button>
              </NavLink>
            ) : (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  {/* Hey, Name */}
                  <span className="text-gray-700 text-sm font-medium">
                    Hey, {user.name?.split(" ")[0]}
                  </span>
                  {/* Avatar Circle */}
                  <div className="h-9 w-9 rounded-full bg-[#6C63FF] flex items-center justify-center text-white font-semibold text-sm select-none">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  {/* Chevron */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                    <NavLink
                      to="/my-orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6C63FF]/5 hover:text-[#6C63FF] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      My Orders
                    </NavLink>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
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
