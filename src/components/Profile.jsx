import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [displayName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user profile
  useEffect(() => {
    if (!user) return;
    async function fetchProfile() {
      try {
        const docRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFullName(data.displayName || "");
          setPhone(data.phone || "");
          setAge(data.age || "");
          setPhotoBase64(data.photoBase64 || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile.");
      }
    }
    fetchProfile();
  }, [user]);

  // Convert file to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileName(file.name);
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Save to Firestore
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    setSuccess("");

    // Client-side validations
    if (Number(age) < 0) {
      setError("Age cannot be negative!");
      setLoading(false);
      return;
    }
    // If phone is not empty, ensure it has only digits
    if (phone && !/^\d+$/.test(phone)) {
      setError("Phone number must contain only digits!");
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        displayName,
        phone,
        age,
        photoBase64,
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Please log in.</p>;
  }

  return (
    <div className=" bg-gradient-to-br from-gray-800 via-blue-800 to-purple-900 min-h-screen pt-6">
      <div className="max-w-3xl mx-auto px-4">
        {/* Profile card */}
        <div className="bg-white rounded-lg shadow p-6 text-center relative">
          <div className="absolute left-4 top-4">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-gray-800">Your Profile</h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
              {success}
            </div>
          )}

          {/* Profile Picture */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Profile Picture
            </label>
            <small className="block text-gray-400 mb-1">
              Max file size: 300 KB. Max dimensions: 600×600 px.
            </small>
            {photoBase64 ? (
              <img
                src={photoBase64}
                alt="Profile"
                className="mx-auto w-32 h-32 object-cover mb-2 rounded-full border"
              />
            ) : (
              <div className="text-gray-500 mb-2">No photo uploaded.</div>
            )}
            <div className="inline-block text-center">
            <label className="mt-3 h-12 w-full bg-primary text-white text-lg rounded-xl font-semibold flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 shadow-lg">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
              <div className="mt-2 text-gray-500">
                {selectedFileName || "No file chosen"}
              </div>
            </div>
          </div>

          {/* Email (Read-Only) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Email
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded bg-gray-100"
              value={user.email}
              readOnly
            />
          </div>

          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded"
              value={displayName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
            />
          </div>

          {/* Age */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Age
            </label>
            <input
              type="number"
              className="border border-gray-300 p-2 w-full rounded"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your age"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-3 h-12 w-full bg-primary text-white text-lg rounded-xl font-semibold flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 shadow-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
