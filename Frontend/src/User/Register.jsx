import { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  register,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const { loading, error, success } = useSelector((state) => state.user);
  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPreviewImage(URL.createObjectURL(file));
  //   }
  // };

  const registerNow = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !avatar) {
      toast.error("Please fill all fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    // for (let pair of myForm.entries()) {
    //   console.log(pair[0] + ":" + pair[1]);
    // }
    dispatch(register(myForm));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Registration successfull", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success]);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <Title title="Register | E-commerce" />
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <form
          encType="multipart/form-data"
          className="space-y-6"
          onSubmit={registerNow}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-600 mt-2">
              Join us to start your journey
            </p>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              value={name}
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="john"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all"
            />
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
              placeholder="john2026@gmail.com"
              onChange={handleChange}
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
              onChange={handleChange}
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <img
                src={previewImage || "https://via.placeholder.com/40"}
                alt="profile"
                className="h-10 w-10 object-cover rounded-full bg-gray-100 border border-gray-200"
              />
            </div>
            <label className="block flex-1">
              <span className="sr-only">Choose profile image</span>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-amber-50 file:text-amber-900 hover:file:bg-amber-100 file:transition-colors"
              />
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl"
            >
              Register
            </button>
            <p className="text-sm text-gray-600 text-center mt-4 active:scale-[0.98]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-600 font-medium hover:underline"
              >
                sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
