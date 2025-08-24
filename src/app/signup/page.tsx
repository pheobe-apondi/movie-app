"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const tempErrors: Errors = {};

    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Enter a valid email";
    }
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      router.push("/");
    }
  };

  return (
    <div className="overflow-hidden h-screen">
      <div className="flex gap-80 overflow-hidden h-full">
        <div>
          <Image src="/movieCover.jpeg" width={900} height={1000} alt="movie Cover" />
        </div>
        <div className="mt-40">
          <h1 className="text-7xl">Create Account</h1>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-10">
            <div>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border-b outline-none py-2 w-full ${
                  errors.name ? "border-yellow-500" : "border-gray-400"
                }`}
              />
              {errors.name && (
                <p className="text-yellow-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border-b outline-none py-2 w-full ${
                  errors.email ? "border-yellow-500" : "border-gray-400"
                }`}
              />
              {errors.email && (
                <p className="text-yellow-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border-b outline-none py-2 w-full ${
                  errors.password ? "border-yellow-500" : "border-gray-400"
                }`}
              />
              {errors.password && (
                <p className="text-yellow-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-10">
              <button
                type="submit"
                className="bg-yellow-600 text-black py-3 rounded-md hover:bg-yellow-700 transition"
              >
                Create Account
              </button>
              <button
                type="button"
                className="border border-black text-white py-3 rounded-md bg-white hover:bg-yellow-600 hover:text-white transition"
              >
                Sign Up with Google
              </button>
            </div>
          </form>
          <p className="mt-5 text-center">
            Already have an account?
            <Link href="/signin" className="underline ml-1 text-yellow-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
