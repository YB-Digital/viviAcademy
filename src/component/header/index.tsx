'use client';

import HeaderDesktop from "../headerDesktop";
import HeaderMobile from "../headerMobile";

const Header = () => {
    return (
        <header className="bg-gradient-to-b from-[#EFEFEF] to-[#EFEFEF] border-b">
            {/* Mobile Header */}
            <div className="md:hidden w-full">
                <HeaderMobile />
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex w-full">
                <HeaderDesktop />
            </div>
        </header>
    );
};

export default Header;
