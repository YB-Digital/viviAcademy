"use client"; // Next.js'de sadece client-side çalışması için

import { useEffect } from "react";

// Google Translate için global tanımlama yap
declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    if (document.querySelector("#google-translate-script")) return;

    const addScript = document.createElement("script");
    addScript.id = "google-translate-script";
    addScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,de,tr", autoDisplay: false },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(addScript);
    };
  }, []);

  return <div id="google_translate_element" className="hidden"></div>; // Widget görünmeyecek
}
