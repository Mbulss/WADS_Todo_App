import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // For displaying the user’s uploaded photo
  const [profilePic, setProfilePic] = useState("");
  // For displaying the user’s displayName
  const [displayName, setDisplayName] = useState("");

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setLoading(false);
    }
  }

  // Listen to real-time updates of the user's profile document
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfilePic(data.photoBase64 || "");
        setDisplayName(data.displayName || "");
      } else {
        setProfilePic("");
        setDisplayName("");
      }
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  // If no custom photo, use default avatar
  const avatarSrc = profilePic || "/default-avatar.png";
  // If no displayName, show email
  const nameToShow = displayName || user.email;

  return (
    <nav className="bg-white shadow w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/to-do-list.png"
                alt="Logo"
                className="h-8 w-8 object-cover"
              />
              <span className="text-xl font-bold text-gray-900">
                Todo App
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Profile Avatar */}
            <Link to="/profile">
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            {/* Display Name or Email */}
            <span className="text-gray-600">{nameToShow}</span>
            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
            >
              {loading ? "Logging out..." : "Log out"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {/* Hamburger / X icon */}
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow space-y-3">
          <div className="flex items-center space-x-2">
            <Link to="/profile" onClick={() => setIsOpen(false)}>
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            <span className="text-gray-600 text-sm">{nameToShow}</span>
          </div>
          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="block w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      )}
    </nav>
  );
}
