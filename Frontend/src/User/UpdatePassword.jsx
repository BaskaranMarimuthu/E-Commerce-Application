import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../features/user/userSlice";
import { removeErrors, removeSuccess } from "../features/user/userSlice";

const UpdatePassword = () => {
  const { loading, error, success } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", duration: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Password changed successfully", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, error, success]);

  const passwordChanged = (e) => {
    e.preventDefault();
    if (newPassword !== confrimPassword) {
      toast.error("Newpassword and Confrim Password does not match", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    dispatch(changePassword({ oldPassword, newPassword, confrimPassword }));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-fuchsia-100 flex justify-center items-center pt-24 pb-10 px-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-8">
            Change Password
          </h1>

          <form className="space-y-6" onSubmit={passwordChanged}>
            {/* Old Password */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Old Password
              </label>

              <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confrimPassword}
                onChange={(e) => setConfrimPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 transition duration-300 text-white font-bold py-3 rounded-lg text-lg active:scale-[0.98]"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
