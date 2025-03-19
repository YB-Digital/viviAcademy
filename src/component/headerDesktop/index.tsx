'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ShoppingCart from '../shoppingCart';
import LanguageDropdown from '../languageDropdown';
import Logo from '../logo';
import Image from 'next/image';

//image
import profileIcon from '@/image/loginUser.svg';

const HeaderDesktop = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const checkUserId = () => {
            setUserId(localStorage.getItem('userId'));
        };

        checkUserId(); // İlk başta userId'yi kontrol et

        // LocalStorage değişikliklerini ve özel event'i dinle
        const handleUserUpdate = () => checkUserId();
        window.addEventListener("storage", handleUserUpdate);
        window.addEventListener("userUpdated", handleUserUpdate);

        return () => {
            window.removeEventListener("storage", handleUserUpdate);
            window.removeEventListener("userUpdated", handleUserUpdate);
        };
    }, []);

    return (
        <header className="w-full bg-gradient-to-b from-[#EFEFEF] to-[#EFEFEF] border-b">
            <div className="container mx-auto flex items-center justify-between">
                <Logo />
                <Link href="/" className="font-inter font-bold text-[20px] text-gray-700 hover:text-[#E70BBB]">
                    Home
                </Link>
                <Link href="/courses" className="font-inter font-bold text-[20px] text-gray-700 hover:text-[#E70BBB]">
                    Courses
                </Link>
                <Link href="/about" className="font-inter font-bold text-[20px] text-gray-700 hover:text-[#E70BBB]">
                    About Us
                </Link>
                <Link href="/services" className="font-inter font-bold text-[20px] text-gray-700 hover:text-[#E70BBB]">
                    Services
                </Link>
                <Link href="/contact" className="font-inter font-bold text-[20px] text-gray-700 hover:text-[#E70BBB]">
                    Contact
                </Link>
                <LanguageDropdown />

                {userId ? (
                    <Link href="/profile" className="flex items-center justify-center w-[36px] h-[36px] rounded-full">
                        <Image src={profileIcon} alt="Profile" width={24} height={24} />
                    </Link>
                ) : (
                    <Link href="/login" className="flex items-center justify-center w-[130px] h-[36px] bg-[#E70BBB] text-white font-inter font-bold text-[18px] rounded-[24px] hover:bg-pink-600 transition">
                        Log In
                    </Link>
                )}

                <ShoppingCart />
            </div>
        </header>
    );
};

export default HeaderDesktop;
