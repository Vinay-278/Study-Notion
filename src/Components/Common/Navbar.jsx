import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../../data/navbar-links";
import { apiConnector } from "../../Service/apiconnector";
import { categories } from "../../Service/apis";
import { ACCOUNT_TYPE } from "../../Util/constants";
import ProfileDropDown from "../Core/Auth/ProfileDropDown";
import ProgressBar from "./progressbar";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  //->useSelector is used to take data from redux store
  //->state.auth, state.profile, state.cart means you are accessing the auth, profile, cart slice of your store
  //->inside auth, profile, cart
  // ->you are picking only token by destucturing

  const location = useLocation();
  //->This is from React Router
  // -> useLocation() returns the current URL path of the user

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //->you are creating a state variable 
  // ->(intially) subLinks([]->empty), loading(false), mobileMenuOpen(false), dropdownOpen(false) 
  // ->useEffect runs after the components renders //[] means ->run only once (when the component loads.) 
  // ->React first renders your UI // Then its run side effects such as api call, dom updates 
  // ->using useEffect with [] prevents infinite API calls

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        console.log(res.data.categories);
        setSubLinks(res.data.categories);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);
  
  const matchRoute = (route) => location.pathname === route;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleMouseEnter = () => setDropdownOpen(true);

  const handleMouseLeave = () => setDropdownOpen(false);


  return (
    <div className="sticky top-0 left-0 z-50 bg-black shadow-md">
      <div className="flex items-center justify-between w-full max-w-maxContent mx-auto px-4 py-3">
        {/* Logo + Mobile Menu Button */}
        <div className="items-center px-25  w-full md:w-auto">
          <Link to="/" onClick={closeMobileMenu}>
            <img
              src={logo}
              alt="Logo"
              width={170}
              height={32}
              className="cursor-pointer"
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="block md:hidden text-2xl text-white"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? "✕" : <AiOutlineMenu />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${mobileMenuOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row items-center text-center gap-6 mt-4 md:mt-0">
            {NavbarLinks.map(({ title, path }, index) => (
              <li key={index} className="text-[19px]">
                {title === "Catalog" ? (
                  <div
                    onClick={toggleDropdown}
                    className={`flex items-center gap-1 cursor-pointer ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-300"
                        : "text-gray-300 hover:text-yellow-500"
                    }`}
                    onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                  >
                    {title}
                    <BsChevronDown
                      className={`transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute left-1/2 top-full mt-2 w-52 -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg z-40">
                        {loading ? (
                          <p>Loading...</p>
                        ) : subLinks?.length ? (
                          subLinks
                            // .filter((sub) => sub?.course?.length > 0)
                            .map((sub, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${sub.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="block py-2 px-2 hover:bg-gray-200 rounded cursor-pointer"
                                onClick={toggleDropdown}
                              >
                                {sub.name}
                                {console.log(sub.name)}
                              </Link>
                            ))
                        ) : (
                          <p>No Course Found</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={path} onClick={closeMobileMenu}>
                    <p
                      className={`${
                        matchRoute(path) ? "text-yellow-300" : "text-gray-300"
                      } hover:text-yellow-500`}
                    >
                      {title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Buttons */}
        <div className={`${mobileMenuOpen ? "block mt-4" : "hidden md:block"}`}>
          <div className="flex items-center gap-6 justify-center">
            {/* Cart */}
            {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/cart"
                className="relative text-2xl text-gray-300"
              >
                <AiOutlineShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -bottom-1 -right-2 h-5 w-5 grid place-items-center bg-yellow-400 text-black text-xs rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Login / Signup */}
            {!token ? (
              <div className="flex items-center gap-3 px-30">
                <Link to="/login">
                  <button className="bg-yellow-300 text-black rounded px-4 py-2 hover:bg-yellow-400">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <ProfileDropDown />
            )}
          </div>
        </div>
      </div>

      <ProgressBar />
    </div>
  );
};

export default Navbar;
