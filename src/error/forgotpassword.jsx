import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import InputFeild from "../components/inputfeild";
import Button from "../components/button";
// import InputFeild from "./inputfeild";
// import Button from "./button";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");
        setError("");

        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Check your inbox.");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                <p className="text-gray-500 text-center mb-6">
                    Enter your email to receive a password reset link.
                </p>

                <form onSubmit={handleResetPassword} className="space-y-4">
                    <InputFeild
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        required={true}
                        htmlFor="email"
                        lable="Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="submit" lable={isSubmitting ? "Sending..." : "Send Reset Link"} disabled={isSubmitting} />
                </form>

                <p className="text-sm text-center mt-4 text-gray-500">
                    Remembered your password?{" "}
                    <Link to="/signin" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
