// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <Link to="/add-equipment" className="mr-4">
                Add Equipment
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
