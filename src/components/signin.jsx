import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import InputFeild from "./inputfeild";
import Button from "./button";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        console.group("User SignIn Data");
        console.log("Email:", email);
        console.log("Password:", password);
        console.groupEnd();

        setIsSubmitting(true);
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
                    <h2 className="text-3xl font-bold">Welcome Back Dear</h2>
                    <p className="text-gray-500">Please fill in the details below 👋</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                   
                    <InputFeild
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required={true}
                        htmlFor="email"
                        lable="Email*"
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
                            lable="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute right-3 mt-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
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
                        <Link to="/forgotpassword" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" lable={isSubmitting ? "Sign Up" : "Sign Up"} />

                    <p className="text-sm text-center mt-2 text-gray-500">
                        Do not have Account? {" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;