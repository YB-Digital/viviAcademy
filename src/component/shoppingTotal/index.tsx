"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PaymentModal from "../paymentModal";
import "./shoppingTotal.scss";

export default function ShoppingTotal() {
  const [subtotal, setSubtotal] = useState(0);
  const [courseIds, setCourseIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const VAT_RATE = 0.2;

  const userId = typeof window !== "undefined" ? Number(localStorage.getItem("userId")) || 0 : 0;

  useEffect(() => {
    const calculateTotal = () => {
      const shoppingCart = JSON.parse(localStorage.getItem("shopping") || "[]");

      const total = shoppingCart.reduce((acc: number, item: any) => acc + item.price, 0);
      setSubtotal(total);

      const ids = shoppingCart.map((item: any) => item.id);
      setCourseIds(ids);
    };

    calculateTotal();
    window.addEventListener("cartUpdated", calculateTotal);
    return () => window.removeEventListener("cartUpdated", calculateTotal);
  }, []);

  const vatAmount = subtotal * VAT_RATE;
  const totalPrice = subtotal + vatAmount;

  const formatPrice = (price: number) =>
    price % 1 === 0 ? price.toFixed(0) : price.toFixed(1);

  const handleBuyClick = () => {
    if (!userId) {
      router.push("/login");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="shoppingTotal">
      <div>
        <div className="header font-montserrat">Shopping cart total</div>
        <div className="text">
          <div className="subText">
            <p className="font-inter">Subtotal</p>
            <p className="font-inter">€{formatPrice(subtotal)}</p>
          </div>
          <div className="subText">
            <p className="font-inter">20% VAT included</p>
            <p className="font-inter">€{formatPrice(vatAmount)}</p>
          </div>
          <div className="subText">
            <p className="font-inter">Total</p>
            <p className="font-inter">€{formatPrice(totalPrice)}</p>
          </div>
        </div>
      </div>
      <button onClick={handleBuyClick}>Buy</button>

      {isModalOpen && (
        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          amount={totalPrice} 
          userId={userId} 
          courseIds={courseIds} 
        />
      )}
    </div>
  );
}
