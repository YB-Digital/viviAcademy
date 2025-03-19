"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import VerifyCode from "@/component/verifyCode";

// Styles
import "./verificationredirect.scss";

// Images
import mail from '@/image/verificationRedirect.svg';

export default function Page() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });
    const [showVerifyCode, setShowVerifyCode] = useState(false);
    const [loading, setLoading] = useState(false);

    // UseEffect to load user data from cookies
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
                    router.push("/signup");
                }
            } else {
                router.push("/signup");
            }
        }
    }, [router]);

    // Handle email send action
    const handleSendEmail = async () => {
        if (!userData.email) return;

        setLoading(true);
        try {
            // Simulate email sending with a delay
            setTimeout(() => {
                setShowVerifyCode(true);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error sending verification email:", error);
            setLoading(false);
        }
    };

    return (
        <div className='verificationredirect'>
            <Image src={mail} alt='Mail Image' />
            <div className="text">
                <p className="title font-montserrat">
                    Verify Your Email Address
                </p>
                <p className='subText font-inter'>
                    We are sending a verification email to: <b>{userData.email || "your email"}</b>. Click the button below to resend it.
                </p>
                <div className="verify">
                    <p className='font-inter'>To verify:</p>
                    <button 
                        className='font-inter' 
                        onClick={handleSendEmail} 
                        disabled={!userData.email || loading}
                    >
                        {loading ? "Sending..." : "Send Email"}
                    </button>
                </div>
            </div>

            {showVerifyCode && <VerifyCode onClose={() => setShowVerifyCode(false)} />}
        </div>
    );
}
