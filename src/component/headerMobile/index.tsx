'use client';

import Link from 'next/link';
import ShoppingCart from '../shoppingCart';
import LanguageDropdown from '../languageDropdown';
import Logo from '../logo';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation

// Image assets
import menu from '@/image/menu.svg';
import profileIcon from '@/image/loginUser.svg';

const HeaderMobile = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const pathname = usePathname(); // Get the current pathname

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Retrieve userId from localStorage
            setUserId(localStorage.getItem('userId'));
        }
    }, []);

    // Automatically close the menu when the pathname changes
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]); // Close menu only when pathname changes

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div className="md:hidden w-full px-5">
            <div className="flex items-center justify-between">
                <Logo />
                <button
                    className="text-gray-700 hover:text-[#E70BBB]"
                    onClick={toggleMenu}
                >
                    <Image width={24} height={24} src={menu} alt={'menu'} />
                </button>
            </div>

            {menuOpen && (
                <div className="absolute top-[70px] left-0 w-full bg-[#EFEFEF] z-50 shadow-md px-5"> 
                    <div className="flex flex-col items-center gap-6 py-6">
                        {[ 
                            { text: 'Home', href: '/' },
                            { text: 'Courses', href: '/courses' },
                            { text: 'About Us', href: '/about' },
                            { text: 'Services', href: '/services' },
                            { text: 'Contact', href: '/contact' },
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="font-inter font-bold text-[20px] leading-[24.2px] tracking-[4%] text-gray-700 hover:text-[#E70BBB] text-center"
                            >
                                {item.text}
                            </Link>
                        ))}
                        <LanguageDropdown />
                        {userId ? (
                            <Link href="/profile" className="flex items-center justify-center w-[36px] h-[36px] rounded-full">
                                <Image src={profileIcon} alt="Profile" width={24} height={24} />
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center justify-center w-[130px] h-[36px] bg-[#E70BBB] text-white font-inter font-bold text-[18px] leading-[21.78px] rounded-[24px] hover:bg-pink-600 transition"
                            >
                                Log In
                            </Link>
                        )}
                        <ShoppingCart />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderMobile;
