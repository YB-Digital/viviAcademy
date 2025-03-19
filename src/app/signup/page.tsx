"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "@/component/inputComponent";
import Link from "next/link";

// Style
import "./signup.scss";

// Image
import eye from '@/image/eyeIcon.svg';

export default function Page() {
    const router = useRouter();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = name === "phone" ? value.replace(/\D/g, "") : value;

        setUserData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!userData.firstName || !userData.lastName || !userData.email || !userData.phone) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        if (!userData.password || !userData.confirmPassword) {
            setError("Password fields cannot be empty.");
            setLoading(false);
            return;
        }
        if (userData.password !== userData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://ybdigitalx.com/vivi_front/sign_up.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                }).toString(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            if (data.includes("warning")) {
                setError("This email is already registered, please log in.");
            } else if (data.includes("success")) {
                // Set cookies using document.cookie
                document.cookie = `userData=${JSON.stringify(userData)}; path=/; max-age=${60 * 60 * 24}`;  // expires in 1 day
                router.push("/verificationredirect");  // Redirect to verification page after successful sign-up
            } else {
                setError("An unexpected error occurred.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError("An error occurred while signing up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signUpPage">
            <form onSubmit={handleSubmit}>
                <h2 className="font-montserrat">Sign Up</h2>
                <InputComponent
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    value={userData.firstName}
                    onChange={handleChange}
                />
                <InputComponent
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    value={userData.lastName}
                    onChange={handleChange}
                />
                <InputComponent
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                />
                <InputComponent
                    name="phone"
                    placeholder="Phone number"
                    type="text"
                    value={userData.phone}
                    onChange={handleChange}
                />
                <InputComponent
                    name="password"
                    rightImage={eye}
                    placeholder="Password"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                />
                <InputComponent
                    name="confirmPassword"
                    rightImage={eye}
                    placeholder="Confirm password"
                    type="password"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                />

                {error && <p className="error">{error}</p>}

                <button className="font-inter" type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
                <div className="createAccount">
                    <p className="font-inter">Already have an account?</p>
                    <Link href={'/login'} className="font-inter">Log In</Link>
                </div>
            </form>
        </div>
    );
}
