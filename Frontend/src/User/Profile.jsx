import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-fuchsia-100 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
        <div>
          <h1 className="mt-6 text-center text-4xl font-bold">My Profile</h1>
        </div>
        <div className="mt-8 sm:ax-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-10 px-6 shadow-lg  rounded-xl sm:px-12 flex flex-col items-center border border-gray-100">
            <div className="w-25 h-25 mb-8 mt-2">
              <img
                src={user?.avatar?.url}
                alt={user?.name}
                title={user?.name}
                className="rounded-full w-full object-cover h-full border-4 border-amber-200 shadow-lg"
              />
            </div>
            <div className="w-full space-y-2">
              <div className="bg-gray-200 p-4 rounded-xl border border-gray-100">
                <h4 className="test-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  User Name
                </h4>
                <p className="text-black text-xl font-semibold">{user?.name}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-xl border border-gray-100">
                <h4 className="test-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Email
                </h4>
                <p className="text-black text-xl font-semibold">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="w-full mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/profile/update"
                className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-800 transition duration-300 text-white font-bold py-3 rounded-lg text-center text-sm sm:text-base active:scale-[0.98]"
              >
                Edit Profile
              </Link>

              <Link
                to="/password/update"
                className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-800 transition duration-300 text-white font-bold py-3 rounded-lg text-center text-sm sm:text-base active:scale-[0.98]"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
