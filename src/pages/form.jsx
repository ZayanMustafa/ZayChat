import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom"; // Don't forget to import Link
import InputFeild from "../components/inputfeild";

const Signup = () => {
    // State management for the form fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Handle form submission
    const handleSignup = (e) => {
        e.preventDefault(); // Prevent page reload on submit

        // Simple validation to check if all fields are filled
        // if (!fullName || !email || !password) {
        //     setError("Please fill in all fields.");
        //     return;
        // }

        // If validation passes, show the form data in the console
        console.group("User Signup Data");
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
        console.groupEnd();
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
               

                <div className="text-center mt-8 mb-6">
                    <h2 className="text-3xl font-bold">Create an Account</h2>
                    <p className="text-gray-500">Unlock a World of Possibilities-Please Fill in the Details Below 👋 </p>
                </div>

                <form onSubmit={handleSignup}>
                    <InputFeild
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Full Name"
                        required={true}
                        htmlFor="fullName"
                        lable="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <InputFeild
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required={true}
                        htmlFor="email"
                        lable="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Password"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">
                        Submit
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500">
                    Already have an account?{" "}
                    Login
                </p>
            </div>
        </div>
    );
};

export default Signup;
