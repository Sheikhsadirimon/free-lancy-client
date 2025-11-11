import React, {  useEffect, useState } from "react";


import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <Link to="/">
        <li className="m-2">Home</li>
      </Link>
      <Link to="/all-jobs">
        <li className="m-2">All Jobs</li>
      </Link>
      <Link to="/add-job">
        <li className="m-2">Add a Job</li>
      </Link>
      <Link to="/my-accepted-tasks">
        <li className="m-2">My Accepted Tasks</li>
      </Link>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm lg:px-10">
      <div className="navbar-start">
        <div className="dropdown dropdown-right">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        <Link
          to="/"
          className="text-xl flex items-center gap-1 font-bold text-primary"
        >
          <span className="text-2xl">FreeLancy</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-lg">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar online rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL ||
                    `https://img.icons8.com/?size=100&id=21441&format=png&color=000000`
                  }
                  alt="User avatar"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-10 mt-2 w-48 p-2 shadow"
            >
              <li className="px-3 py-2 text-sm font-medium text-base-700">
                {user.displayName || user.email}
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary btn-sm w-full text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/auth/login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/auth/signup" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}

        <button onClick={toggleTheme} className="btn btn-circle ml-2">
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 5.66l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13a9 9 0 01-9.64 8 9 9 0 01-.9-17.95 7 7 0 009.55 9.95z" />
            </svg>
          )}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Navbar;
