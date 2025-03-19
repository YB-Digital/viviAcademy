import { useState, useRef, useEffect } from "react";

export default function LanguageDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [language, setLanguage] = useState("English");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languageMap: { [key: string]: string } = {
        English: "en",
        German: "de",
        Turkish: "tr",
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const selectLanguage = (lang: string) => {
        setLanguage(lang);
        setDropdownOpen(false);
        changeLanguage(languageMap[lang]);
    };

    const changeLanguage = (langCode: string) => {
        const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (selectElement) {
            selectElement.value = langCode;
            selectElement.dispatchEvent(new Event("change"));
        } else {
            console.error("Google Translate Select Box bulunamadı!");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 hover:text-[#E70BBB] border px-3 py-1 rounded-lg"
            >
                {language}
                <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {dropdownOpen && (
                <div className="absolute bg-white border rounded shadow-md mt-2 w-32">
                    <button onClick={() => selectLanguage("English")} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
                        English
                    </button>
                    <button onClick={() => selectLanguage("German")} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
                        German
                    </button>
                    <button onClick={() => selectLanguage("Turkish")} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
                        Türkçe
                    </button>
                </div>
            )}
        </div>
    );
}