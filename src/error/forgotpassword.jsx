import React from "react";

const ForgotPassword = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
                    <p className="text-gray-500">Enter the OTP sent to your email</p>
                </div>

                <div className="flex justify-center space-x-2">
                    <input
                        className="m-2 border h-10 w-10 text-center form-control rounded shadow-sm"
                        type="text"
                        id="first"
                        maxLength={1}
                    />
                    <input
                        className="m-2 border h-10 w-10 text-center form-control rounded shadow-sm"
                        type="text"
                        id="second"
                        maxLength={1}
                    />
                    <input
                        className="m-2 border h-10 w-10 text-center form-control rounded shadow-sm"
                        type="text"
                        id="third"
                        maxLength={1}
                    />
                    <input
                        className="m-2 border h-10 w-10 text-center form-control rounded shadow-sm"
                        type="text"
                        id="fourth"
                        maxLength={1}
                    />
                    <input
                        className="m-2 border h-10 w-10 text-center form-control rounded shadow-sm"
                        type="text"
                        id="fifth"
                        maxLength={1}
                    />
                    <input
                        className="m-2 border h-10 w-10 text-center form-control rounded shadow-sm"
                        type="text"
                        id="sixth"
                        maxLength={1}
                    />
                </div>

                <div className="flex justify-center text-center mt-5">
                    <a className="flex items-center text-yellow-600 hover:text-yellow-900 cursor-pointer">
                        <span className="font-bold">Resend OTP</span>
                        <i className="bx bx-caret-right ml-1" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;