import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputFeild from "../components/inputfeild";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        console.group("User Signup Data");
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
        console.groupEnd();

        setIsSubmitting(true);
        setFullName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
            history.push("/dashboard");
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold">Create an Account</h2>
                    <p className="text-gray-500">Please fill in the details below 👋</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
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

                    <div className="relative">
                        <InputFeild
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            required={true}
                            htmlFor="password"
                            lable="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <Button type="submit" lable={isSubmitting ? "Creating Account..." : "Sign In"} />

                    <p className="text-sm text-center text-gray-500">
                        Don’t have an account yet?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;