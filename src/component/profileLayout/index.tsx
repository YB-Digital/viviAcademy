"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// style
import "./profileLayout.scss";

// image
import profile from "@/image/userProfileImage.svg";
import user from "@/image/profileUser.svg";
import lock from "@/image/profileLock.svg";
import course from "@/image/profilCourse.svg";
import logout from "@/image/profileLogOut.svg";

export default function ProfileLayout() {
    const pathname = usePathname();
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü durumu

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUserId(localStorage.getItem("userId"));
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`https://ybdigitalx.com/vivi_front/getUser.php`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({ userId }).toString(),
                });

                const data = await response.json();

                if (data.status === "success") {
                    setUserName(data.userName);
                } else {
                    console.error("Failed to fetch user data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userId");
            window.dispatchEvent(new Event("userUpdated")); 
        }
        router.push("/login");
    };

    return (
        <div className={`profileLayout ${isMenuOpen ? "open" : ""}`}>
            <div className="profileImage">
                <Image src={profile} alt="profile" />
                <p className="font-inter">{userName || "Welcome"}</p>
            </div>
            <div className="profileLinks">
                <button className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    ☰
                </button>
                <Link href="/profile" className={pathname === "/profile" ? "active" : ""}>
                    <Image src={user} alt="icon" />
                    <p className="font-inter">My Profile</p>
                </Link>
                <Link href="/profile/updatepassword" className={pathname === "/profile/updatepassword" ? "active" : ""}>
                    <Image src={lock} alt="icon" />
                    <p className="font-inter">Update Password</p>
                </Link>
                <Link href="/profile/mycourses" className={pathname === "/profile/mycourses" ? "active" : ""}>
                    <Image src={course} alt="icon" />
                    <p className="font-inter">My Courses</p>
                </Link>
                <button onClick={handleLogout} className="logoutButton">
                    <Image src={logout} alt="icon" />
                    <p className="font-inter">Log Out</p>
                </button>
            </div>
        </div>
    );
}
