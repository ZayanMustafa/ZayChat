import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Import necessary Firebase auth functions
import Button from "./button";

export function Setting() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error in Logout", error); 

      });
  };

  return (
    <>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="absolute top-3 right-0 p-2 text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-full"
        type="button"
      >
        <BsThreeDotsVertical />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 bg-yellow-50 divide-y divide-gray-200 rounded-lg shadow-sm w-44 absolute right-0 mt-2"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {/* <li>
              <Link
                className="block px-4 py-2 hover:bg-yellow-100"
                to={"/updateprofile"}
              >
                Update Profile
              </Link>
            </li> */}
            <li>

              <button
                onClick={handleLogOut}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-yellow-100 focus:outline-none"
              >
                LogOut
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
