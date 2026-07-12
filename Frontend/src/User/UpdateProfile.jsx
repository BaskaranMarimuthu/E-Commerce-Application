import { useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../features/user/userSlice";
import toast from "react-hot-toast";
const UpdateProfile = () => {
  const { user, error, success, loading } = useSelector((state) => state.user);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const [avatarChanged, setAvatarChanged] = useState(false);

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    const result = await dispatch(updateProfile(myForm));
    // console.log(myForm);

    if (updateProfile.fulfilled.match(result)) {
      toast.success("🎉 Profile updated successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigation("/profile");
      }, 2000);
    } else {
      toast.error(result.payload || "Failed to update profile.");
    }
  };

  const updateProfileDataChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarChanged(true);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-fuchsia-100 flex justify-center items-center pt-24 pb-10 px-4">
        <div className="bg-white w-full max-w-xl rounded-xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-4xl font-bold text-center mb-8">Edit Profile</h1>

          <form onSubmit={updateProfileSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28">
                <img
                  src={avatar}
                  alt={user?.name}
                  className="w-full h-full rounded-full object-cover border-4 border-amber-200 shadow-md"
                />
              </div>

              <label className="mt-4 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">
                Change Avatar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={updateProfileDataChange}
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-3 rounded-lg text-xl font-semibold transition active:scale-[0.98]"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
