"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Style
import "./verifyCode.scss";

// Image
import cancel from "@/image/codePageCancel.svg";

interface VerifyCodeProps {
    onClose: () => void;
}

export default function VerifyCode({ onClose }: VerifyCodeProps) {
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch user data from cookies
    useEffect(() => {
        if (typeof window !== "undefined") {
            const cookies = document.cookie.split("; ");
            const userDataCookie = cookies.find(cookie => cookie.startsWith("userData="));

            if (userDataCookie) {
                try {
                    const cookieData = userDataCookie.split("=")[1];
                    const parsedUser = JSON.parse(cookieData);
                    setUserData(parsedUser);
                } catch (error) {
                    console.error("Failed to parse user data from cookies", error);
                    onClose();  // Close the modal or redirect if cookies are not valid
                }
            } else {
                onClose();  // If no cookie is found, close the modal or redirect
            }
        }
    }, [onClose]);

    // Handle change in the input fields
    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next input field
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace key press to go to the previous input
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // Handle the verification of the code
    const handleVerify = async () => {
        const verificationCode = code.join("");  // Join the code array to get the full code as a string

        // Check if the verification code is exactly 6 digits
        if (verificationCode.length !== 6) {
            setError("Please enter a 6-digit code.");
            return;
        }

        setError("");
        setMessage("Verifying...");

        try {
            // Send the verification data to the server
            const response = await fetch("https://ybdigitalx.com/vivi_front/send_verification.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    code: verificationCode,   // Send the code in the request body
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                }).toString(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();
            if (data.includes("Success")) {
                setMessage("Verification successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/login"; // Redirect to login after success
                }, 2000);
            } else if (data.includes("hata2")) {
                setError("Invalid verification code. Please try again.");
                setMessage("");
            } else if (data.includes("hata1")) {
                setError("Error while registering user. Please try again.");
                setMessage("");
            } else if (data.includes("hata4")) {
                setError("No verification record found for this email.");
                setMessage("");
            }
        } catch (error: unknown) {
            console.error("Verification Error:", error);
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
            setMessage("");
        }
    };

    return (
        <div className="verifyCode">
            <div>
                <div className="cancel" onClick={onClose}>
                    <Image src={cancel} alt="cancel" />
                </div>
                <div className="text">
                    <p className="title font-montserrat">Verification</p>
                    <p className="subText font-inter">
                        To verify VIVI membership, enter the code sent to your email in the verification code field.
                    </p>
                    <div className="code">
                        {/* Render the 6 input fields for the verification code */}
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    if (el) inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>

                    {/* Display error or message */}
                    {error && <p className="error">{error}</p>}
                    {message && <p className="message">{message}</p>}
                </div>

                <div className="button">
                    <button className="font-inter" onClick={handleVerify}>
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
}
