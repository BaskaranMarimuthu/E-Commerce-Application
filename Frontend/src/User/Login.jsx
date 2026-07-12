import { useState, useEffect } from "react";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  loadUser,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, success } = useSelector(
    (state) => state.user,
  );
  const loginhandle = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Login successfull", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/");
    }
  }, [dispatch, success]);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <Title title="Register | E-commerce" />
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <form onSubmit={loginhandle} className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
            <p className="text-sm text-gray-600 mt-2">Welcome back</p>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john2026@gmail.com"
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              name="password"
              placeholder="12345678"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl active:scale-[0.98]"
            >
              Register
            </button>
            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-amber-600 font-medium hover:underline"
              >
                sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
