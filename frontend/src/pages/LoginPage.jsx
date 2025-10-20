import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, isLoggingIn, googleLogin } = useAuthStore();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Scroll to top on form submission
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!validateForm()) return;

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      // Error is handled by useAuthStore
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate("/");
    } catch (err) {
      // Error is handled by useAuthStore
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <>
      <div className="h-5"></div>
      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20"
        style={{ backgroundColor: "#0f1419" }}
      >
        <div className="w-full max-w-6xl m-auto">
          <div className="">
            {/* Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Login Form */}
              <div className="flex flex-col justify-center max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-[#605dff]/30">
                      <MessageSquare className="w-8 h-8 text-[#605dff]" />
                    </div>
                    <h1 className="text-4xl font-bold text-white">
                      Welcome Back
                    </h1>
                    <p className="text-gray-400 text-base">
                      Sign in to your account
                    </p>
                  </div>
                </div>

                {/* Google Sign-In */}
                <div className="space-y-4 mb-5">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="filled_black"
                    size="large"
                    width="100%"
                  />
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#0f1419] text-gray-400">or</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                    <input
                      id="email"
                      type="email"
                      className="peer w-full bg-[#2d3748] text-white rounded-xl border border-gray-700 focus:border-[#605dff] focus:ring-2 focus:ring-[#605dff]/40 transition-all duration-200 pl-12 pr-4 py-3.5 outline-none"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
                                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                                peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#605dff]
                                peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#605dff]"
                    >
                      Email
                    </label>
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="peer w-full bg-[#2d3748] text-white rounded-xl border border-gray-700 focus:border-[#605dff] focus:ring-2 focus:ring-[#605dff]/40 transition-all duration-200 pl-12 pr-12 py-3.5 outline-none"
                      placeholder=" "
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
                                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                                peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#605dff]
                                peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#605dff]"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#605dff] transition z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-[#605dff] hover:bg-[#6663ffc9] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-[#605dff] hover:text-[#6663ffc9] font-medium hover:underline"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="hidden lg:flex flex-col justify-center border-l border-gray-700 pl-12">
                <AuthImagePattern
                  title="Welcome Back!"
                  subtitle="Sign in to continue your conversations and catch up with your messages."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;