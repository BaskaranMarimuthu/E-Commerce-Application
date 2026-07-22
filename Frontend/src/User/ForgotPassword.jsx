import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { success, loading, error, message } = useSelector(
    (state) => state.user,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", duration: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Reset link successfully", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(removeSuccess());
      navigate("/reset/password");
      
    }
  }, [dispatch, error, success]);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
    setEmail("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-fuchsia-100 flex justify-center items-center  pb-10 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-2">
            Forgot Password
          </h1>

          <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
            Enter your email address and we'll send you a password reset link.
          </p>

          <form className="space-y-6" onSubmit={handleForgotPassword}>
            {/* Email */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-lg transition duration-300 active:scale-[0.98]"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
