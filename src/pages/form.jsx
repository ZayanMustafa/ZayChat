import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputFeild from "../components/inputfeild";
import Button from "../components/button";
import { Link } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        console.group("User Signup Data");
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
        console.groupEnd();
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-dark-900 md:text-2xl dark:text-dark">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <InputFeild
                                lable={"Email Address"}
                                htmlFor={"email"}
                                type={"email"}
                                name={"email"}
                                id={"email"}
                                placeholder={"Email Address"}
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <InputFeild
                                lable={"Full Name"}
                                htmlFor={"fullName"}
                                type={"text"}
                                name={"fullName"}
                                id={"fullName"}
                                placeholder={"Name"}
                                required={true}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-dark-300 rounded bg-dark-50 focus:ring-3 focus:ring-primary-300 dark:bg-dark-700 dark:border-dark-600 dark:focus:ring-primary-600 dark:ring-offset-dark-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-dark-900 dark:text-dark"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <span
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </span>
                            </div>
                            <Button type={"Sumbit"} lable={"Sign In"} />
                            <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Don’t have an account yet? {"     "}
                                <Link to="/signup" className="text-primary-600 hover:underline dark:text-primary-500">

                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;