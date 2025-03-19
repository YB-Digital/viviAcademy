import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//image
import shopping from "@/image/shopping-cart.svg";

export default function ShoppingCart() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const shoppingCart = JSON.parse(localStorage.getItem("shopping") || "[]");
      setCartCount(shoppingCart.length);
    };

    updateCartCount(); // İlk başta mevcut sepeti kontrol et

    // Sepet güncellendiğinde dinle
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <Link href="/shopping" className="text-gray-700 hover:text-[#E70BBB] relative">
      <Image src={shopping} alt="shopping icon" width={42} height={42} />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-[#E70BBB] text-white font-inter font-medium text-[14px] leading-[16.94px] rounded-full w-[18.67px] h-[18.67px] flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
