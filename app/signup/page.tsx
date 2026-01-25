/**
 * Signup Page - Entry Gate for Event Hub
 * 
 * This page serves as the mandatory authentication gate for the platform.
 * Users must authenticate with their college Google account before accessing the site.
 * 
 * Flow:
 * 1. User clicks "Sign up with College Google Account"
 * 2. Google OAuth authenticates the user
 * 3. If email domain is valid, user is created in DB
 * 4. Additional profile information is collected
 * 5. User is redirected to homepage after completion
 */

"use client";

import { useEffect, useState, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

/**
 * Profile Completion Form Component
 * Collects additional user details after Google authentication
 */
function ProfileCompletionForm({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    rollNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validates form inputs
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/profile/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Profile completed successfully - redirect to home
        router.push("/");
      } else {
        setErrors({ submit: data.error || "Failed to complete profile" });
      }
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles input changes and clears errors
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Just a few more details to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* College Email (Auto-filled, Disabled) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            College Email ID
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => {
              // Only allow numbers
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                handleInputChange("phoneNumber", value);
              }
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phoneNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
            placeholder="10 digit mobile number"
            maxLength={10}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Roll Number */}
        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Roll Number *
          </label>
          <input
            type="text"
            id="rollNumber"
            value={formData.rollNumber}
            onChange={(e) => handleInputChange("rollNumber", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.rollNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:ring-2 focus:outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
            placeholder="Enter your roll number"
          />
          {errors.rollNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.rollNumber}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Completing...
            </span>
          ) : (
            "Complete Profile & Enter Event Hub"
          )}
        </button>
      </form>
    </div>
  );
}

/**
 * Main Signup Content Component
 */
function SignupContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check for domain validation error
    const error = searchParams.get("error");
    const email = searchParams.get("email");

    if (error === "invalid_domain" && email) {
      setErrorMessage(
        `The email "${email}" is not from an approved college domain. Please use your college-issued Google account.`
      );
    }

    // If user is authenticated and profile is complete, redirect to home
    if (status === "authenticated" && session?.user?.isProfileComplete) {
      router.replace("/");
    }
  }, [status, session, router, searchParams]);

  /**
   * Handles Google Sign-In
   */
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { 
        callbackUrl: "/signup" // Stay on signup to complete profile
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage("Failed to sign in. Please try again.");
    }
  };

  // Show profile completion form if authenticated but profile incomplete
  if (status === "authenticated" && session?.user && !session.user.isProfileComplete) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
          <ProfileCompletionForm userEmail={session.user.email || ""} />
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex flex-1 relative bg-black overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <Image
              src="/signup image .png"
              alt="Event Hub Signup"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  // Show initial signup screen
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Event Hub
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Your Campus Event Gateway
            </p>
          </div>

          {/* Welcome Text */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign up to discover and book exciting campus events
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with College Google Account
          </button>

          {/* Info Text */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Only college-issued Google accounts are accepted
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden lg:flex flex-1 relative bg-black overflow-hidden">
        {/* Signup Image */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <Image
            src="/signup image .png"
            alt="Event Hub Signup"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Mobile Image Section */}
      <div className="lg:hidden bg-black p-8 text-white text-center relative h-64">
        <div className="relative w-full h-full">
          <Image
            src="/signup image .png"
            alt="Event Hub Signup"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Main Signup Page Component with Suspense Boundary
 */
export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
