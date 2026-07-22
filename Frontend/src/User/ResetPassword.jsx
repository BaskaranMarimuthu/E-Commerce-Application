import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ResetNewPassword,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import toast from "react-hot-toast";

const ResetPassword = () => {
  console.log("ResetPassword Component Loaded");
  const { success, loading, error, message } = useSelector(
    (state) => state.user,
  );
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", duration: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Password reset successfully", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, error, success]);

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset button clicked");
    if (password !== confirmPassword) {
      toast.error("password does not match", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    
    dispatch(ResetNewPassword({ token, password, confirmPassword}));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-fuchsia-100 flex justify-center items-center pb-10 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-2">
            Reset Password
          </h1>

          <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
            Enter your new password below to reset your account password.
          </p>

          <form className="space-y-6" onSubmit={handleReset}>
            {/* New Password */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-lg transition duration-300 active:scale-[0.98]"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
