"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "@/component/inputComponent";
import Link from "next/link";
// import Image from "next/image";

//style
import "./login.scss";

//image
// import icloud from "@/image/icloudIcon.svg";
import user from "@/image/inputUserIcon.svg";
import lock from "@/image/inputLockIcon.svg";
// import GoogleLoginButton from "@/component/googleLoginButton";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Handle manual login with email & password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://ybdigitalx.com/vivi_front/login_control.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ email, password }).toString(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === "error") {
                setError(data.message);
            } else {
                if (typeof window !== "undefined") {
                    localStorage.setItem("userId", data.id);
                    window.dispatchEvent(new Event("userUpdated"));
                }

                router.push("/profile");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError("An error occurred while logging in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Login
    const handleGoogleLogin = async (credentialResponse: any) => {
        if (!credentialResponse.credential) {
            setError("Google login failed. Please try again.");
            return;
        }

        try {
            const res = await fetch("https://ybdigitalx.com/vivi_front/google_login.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ tokenId: credentialResponse.credential }).toString(),
            });

            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.text();

            if (data.includes("success")) {
                localStorage.setItem("userEmail", "GoogleUserEmail"); // You need to extract the actual email from Google API
                router.push("/profile");
            } else {
                setError("An error occurred while logging in with Google. Please try again.");
            }
        } catch (error) {
            console.error("Google Login Error:", error);
            setError("An error occurred while logging in with Google. Please try again.");
        }
    };

    return (
        <div className="loginPage">
            <form onSubmit={handleSubmit}>
                <h2 className="font-montserrat">Log in</h2>
                <InputComponent
                    name="email"
                    leftImage={user}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputComponent
                    name="password"
                    leftImage={lock}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <div className="forgotPass">
                    <Link className="font-inter" href={'/forgotpassword'}>Forgot password</Link>
                </div>
                <button className="font-inter" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
                </button>
                <div className="createAccount">
                    <p className="font-inter">Don&apos;t have an account?</p>
                    <Link href={'/signup'} className="font-inter">Create an account</Link>
                </div>

                {/* <div className="otherAccounts">
                    <p className="font-inter">You can also log in using your accounts below.</p>
                    <div>
                        <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
                        <Link href="">
                            <Image src={icloud} alt="icloud account" />
                        </Link>
                    </div>
                </div> */}
            </form>
        </div>
    );
}
