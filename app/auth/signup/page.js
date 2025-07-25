// "use client";
// import { useState, useEffect } from "react";
// import { signIn, getSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   Chrome,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react";

// export default function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const router = useRouter();

//   // Check if user is already signed in
//   useEffect(() => {
//     const checkSession = async () => {
//       const session = await getSession();
//       if (session) {
//         router.push("/");
//       }
//     };
//     checkSession();
//   }, [router]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     // Clear error when user starts typing
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError("Name is required");
//       return false;
//     }

//     if (formData.name.trim().length < 2) {
//       setError("Name must be at least 2 characters");
//       return false;
//     }

//     if (!formData.email.trim()) {
//       setError("Email is required");
//       return false;
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }

//     // Enhanced password validation
//     if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       setError(
//         "Password must contain at least one uppercase letter, one lowercase letter, and one number"
//       );
//       return false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }

//     if (!formData.terms) {
//       setError("You must agree to the Terms of Service and Privacy Policy");
//       return false;
//     }

//     return true;
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       // Call your API to create the user account
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           email: formData.email.toLowerCase().trim(),
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Failed to create account");
//         return;
//       }

//       // If account creation successful, sign them in
//       const result = await signIn("credentials", {
//         email: formData.email,
//         password: formData.password,
//         redirect: false,
//       });

//       if (result?.error) {
//         setError(
//           "Account created but failed to sign in. Please try signing in manually."
//         );
//       } else if (result?.ok) {
//         setSuccess(true);
//         setTimeout(() => {
//           router.push("/");
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setIsLoading(true);
//     setError("");

//     try {
//       await signIn("google", {
//         callbackUrl: "/",
//         redirect: true,
//       });
//     } catch (error) {
//       console.error("Google signup error:", error);
//       setError("Failed to sign up with Google");
//       setIsLoading(false);
//     }
//   };

//   // Password strength indicator
//   const getPasswordStrength = (password) => {
//     if (password.length === 0) return { strength: 0, text: "" };

//     let strength = 0;
//     if (password.length >= 6) strength++;
//     if (password.length >= 8) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/\d/.test(password)) strength++;
//     if (/[^a-zA-Z\d]/.test(password)) strength++;

//     const levels = [
//       { strength: 0, text: "", color: "" },
//       { strength: 1, text: "Very Weak", color: "text-red-500" },
//       { strength: 2, text: "Weak", color: "text-orange-500" },
//       { strength: 3, text: "Fair", color: "text-yellow-500" },
//       { strength: 4, text: "Good", color: "text-blue-500" },
//       { strength: 5, text: "Strong", color: "text-green-500" },
//       { strength: 6, text: "Very Strong", color: "text-green-600" },
//     ];

//     return levels[Math.min(strength, 6)];
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

//   if (success) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
//         <div className="max-w-md w-full text-center">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Account Created!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Welcome to PolarClub! You'll be redirected to the homepage
//               shortly.
//             </p>
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           <div className="flex justify-center mb-6">
//             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
//               <img
//                 src="/polar-logo.jpg"
//                 alt="Polar Logo"
//                 className="w-14 h-14 rounded-full"
//                 onError={(e) => {
//                   e.target.style.display = "none";
//                   e.target.parentElement.innerHTML =
//                     '<div class="text-white font-bold text-xl">PC</div>';
//                 }}
//               />
//             </div>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Join PolarClub
//           </h2>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
//             <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
//             <p className="text-red-700 text-sm">{error}</p>
//           </div>
//         )}

//         {/* Sign Up Form */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           {/* Google Sign Up */}
//           <button
//             onClick={handleGoogleSignIn}
//             disabled={isLoading}
//             className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Chrome className="text-gray-600" size={20} />
//             <span className="text-gray-700 font-medium">
//               {isLoading ? "Creating account..." : "Continue with Google"}
//             </span>
//           </button>

//           {/* Divider */}
//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500">
//                 Or create account with email
//               </span>
//             </div>
//           </div>

//           {/* Registration Form */}
//           <form onSubmit={handleSignUp} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="text-gray-400" size={20} />
//                 </div>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
//                   placeholder="John Doe"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="text-gray-400" size={20} />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
//                   placeholder="john@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="text-gray-400" size={20} />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Create a strong password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               <div className="mt-1 flex justify-between text-sm">
//                 <span className="text-gray-500">
//                   Must contain uppercase, lowercase, and number
//                 </span>
//                 {formData.password && (
//                   <span className={passwordStrength.color}>
//                     {passwordStrength.text}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="text-gray-400" size={20} />
//                 </div>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>
//               </div>
//               {formData.confirmPassword &&
//                 formData.password !== formData.confirmPassword && (
//                   <p className="text-sm text-red-500 mt-1">
//                     Passwords do not match
//                   </p>
//                 )}
//             </div>

//             <div className="flex items-start">
//               <div className="flex items-center h-5">
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   required
//                   checked={formData.terms}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
//                 />
//               </div>
//               <div className="ml-3 text-sm">
//                 <label htmlFor="terms" className="text-gray-700">
//                   I agree to the{" "}
//                   <Link
//                     href="/terms"
//                     className="text-rose-600 hover:text-rose-500 font-medium"
//                   >
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link
//                     href="/privacy"
//                     className="text-rose-600 hover:text-rose-500 font-medium"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   <span>Creating account...</span>
//                 </div>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           {/* Sign In Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 href="/auth/signin"
//                 className="text-rose-600 hover:text-rose-500 font-semibold"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-500">
//           By creating an account, you're joining the best skating community in
//           town!
//         </p>
//       </div>
//     </div>
//   );
// }
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
