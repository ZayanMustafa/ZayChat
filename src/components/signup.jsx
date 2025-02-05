import React, { useState } from "react"; 
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import InputFeild from "./inputfeild";
import Button from "./button";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup, db, ref, set } from "../firebase/initializetion"; // Fixed the import

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    // Password Strength Check
    const checkPasswordStrength = (password) => {
        const lengthCriteria = password.length >= 8; // Minimum length of 8
        const upperCaseCriteria = /[A-Z]/.test(password); // At least one uppercase letter
        const lowerCaseCriteria = /[a-z]/.test(password); // At least one lowercase letter
        const numberCriteria = /\d/.test(password); // At least one number
        const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character
        
        // Determine strength using ternary operators
        const strength = lengthCriteria
            ? upperCaseCriteria && lowerCaseCriteria && numberCriteria && specialCharCriteria
                ? 'Strong'
                : upperCaseCriteria || lowerCaseCriteria || numberCriteria || specialCharCriteria
                    ? 'Moderate'
                    : 'Weak'
            : 'Password must be at least 8 characters long'; // Display message if password is too short

        setPasswordStrength(strength);
    };

    const saveUserToDatabase = (user, fullName, email , password) => {
        const userRef = ref(db, 'users/' +fullName + " "+ user.uid);
        set(userRef, {
            fullName: fullName,
            email: email,
            uid: user.uid,
            password : password
        })
            .then(() => {
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error("Error saving user data:", error.message);
            });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            saveUserToDatabase(user, fullName, email , password); 
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    const handleGoogleSignUp = () => {
        setIsSubmitting(true);

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUserToDatabase(user, user.displayName, user.email , user.password);
                navigate('/dashboard');  
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold">Create an Account</h2>
                    <p className="text-gray-500">Please fill in the details below 👋</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">
                    <InputFeild
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Full Name"
                        required={true}
                        htmlFor="fullName"
                        lable="Full Name*"
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordStrength(e.target.value);
                            }}
                        />
                        <div
                            className="absolute right-3 mt-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                        </div>
                    </div>

                    {password && (
                        <div className="mt-2 text-sm">
                            <span className={`text-${passwordStrength === 'Weak' ? 'red' : passwordStrength === 'Moderate' ? 'yellow' : 'green'}-500`}>
                                {passwordStrength} Password
                            </span>
                        </div>
                    )}

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
                    </div>

                    <Button type="submit"
                        disabled={isSubmitting}
                        lable={isSubmitting ? 'Signing Up...' : 'Sign Up'} />

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <Button
                        // disabled={isSubmitting}
                        type="button"
                        lable={'Sign Up with Google'}
                        onClick={handleGoogleSignUp}
                        icon={<FaGoogle size={20} />}
                    />

                    <p className="text-sm text-center mt-2 text-gray-500">
                        Already have an Account?{" "}
                        <Link to="/signin" className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
