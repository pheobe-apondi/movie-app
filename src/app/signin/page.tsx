"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Errors {
    emailOrPhone?: string;
    password?: string;
}

export default function SignIn() {
    const router = useRouter();

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    const validate = () => {
        const tempErrors: Errors = {};

        if (!emailOrPhone.trim()) {
            tempErrors.emailOrPhone = "Email or Phone Number is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{8,15}$/;
            if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
                tempErrors.emailOrPhone = "Enter a valid email or phone number";
            }
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
            <div className="flex gap-50 overflow-hidden h-full">
                <div>
                    <Image src="/movieCover.jpeg" width={900} height={1000} alt="movie Cover" />
                </div>
                <div className="mt-70">
                    <h1 className="text-7xl">Login</h1>
                    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-10">
                        <div>
                            <input
                                placeholder="Email or Phone Number"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                className={`border-b outline-none py-2 w-full ${errors.emailOrPhone ? "border-yellow-500" : "border-gray-400"
                                    }`}
                            />
                            {errors.emailOrPhone && (
                                <p className="text-yellow-500 text-sm">{errors.emailOrPhone}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`border-b outline-none py-2 w-130 ${errors.password ? "border-yellow-500" : "border-gray-400"
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-yellow-500 text-sm">{errors.password}</p>
                            )}
                        </div>

                        <div className="mt-10 flex gap-10 justify-between items-center">
                            <button
                                type="submit"
                                className="bg-yellow-600 text-black py-3 w-45 rounded-md hover:bg-yellow-700 transition w-130"
                            >
                                Login
                            </button>
                          
                        </div>
                          <Link href="/signup" className="underline text-yellow-600 mt-3 text-center">
                                Dont have an account?Sign Up          </Link>
                    </form>
                </div>
            </div>
        </div>

    )



}