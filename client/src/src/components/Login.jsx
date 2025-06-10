import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// const __userId = "imr@123.com";
// const __userPassword = "123@123";

const Login = ({ loginHandler }) => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [wrongCredErrorVisible, setWrongCredErrorVisible] = useState(false);
  const navigate = useNavigate();

  const handleSetUserId = (val) => {
    setUserId(val);
  };
  const handleSetUserPassword = (val) => {
    setUserPassword(val);
  };
  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const packetuserCredentials = {
        email: userId,
        password: userPassword,
      };
      const response = await axios.post(
        "http://localhost:5000/api/login",
        packetuserCredentials
      );

      if (response.data.success) {
        navigate("/");
      } else {
        loginHandler(false);
        setWrongCredErrorVisible(true);
      }

      // if (__userId === userId && __userPassword === userPassword) {
      //   console.log("Logging successful");
      //   loginHandler(true);
      // } else {
      //   console.log("Loggin unsuccessfull");
      //   loginHandler(false);
      //   setWrongCredErrorVisible(true);
      // }
    } catch (err) {
      console.error("Login error", err);
      setWrongCredErrorVisible(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>
        {/* ********************************************************* */}
        {wrongCredErrorVisible && (
          <div className="mb-3 border-2 rounded-lg border-red-400 bg-red-200 text-stone-900 py-2 px-2 flex justify-between items-start gap-2">
            <h3 className="text-wrap">
              The email or password in incorrect, try again or sign up if you
              haven't already
            </h3>
            <button
              onClick={() => setWrongCredErrorVisible(false)}
              className="flex justify-center items-center text-red-500 border pt-[1px] h-5 w-5 border-red-400 rounded-full  leading-0 shrink-0 flex-wrap text-sm"
            >
              X
            </button>
          </div>
        )}
        {/* ********************************************************* */}

        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 p-2"
              onBlur={(e) => handleSetUserId(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 p-2"
              onBlur={(e) => handleSetUserPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
