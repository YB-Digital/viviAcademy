'use client'

import { useState, useEffect } from "react";
import Image from "next/image";

//style
import "./shoppingProduct.scss";

//image
import cancel from "@/image/shoppingCancel.svg";

export default function ShoppingProduct() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // LocalStorage'dan verileri al
    const shoppingCart = JSON.parse(localStorage.getItem("shopping") || "[]");
    setCartItems(shoppingCart);
  }, []);

  // Ürünü kaldırma fonksiyonu
  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("shopping", JSON.stringify(updatedCart));

    // Sepet güncellendiğini duyur
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="shoppingProduct">
      <div className="header">
        <div className="cancel"></div>
        <div className="image"></div>
        <div className="product font-montserrat">Product</div>
        <div className="price font-montserrat">Price</div>
        <div className="piece font-montserrat">Piece</div>
        <div className="subTotal font-montserrat">Subtotal</div>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cancel">
              <Image
                src={cancel}
                alt="cancel"
                onClick={() => handleRemoveItem(item.id)}
                className="cursor-pointer"
              />
            </div>
            <div className="image">
              <img src={item.image} alt={item.name} width={50} height={50} />
            </div>
            <div className="product">
              <p className="font-inter">{item.name}</p>
            </div>
            <div className="price font-inter">€{item.price}</div>
            <div className="piece font-inter">1</div>
            <div className="subTotal font-inter">€{item.price}</div>
          </div>
        ))
      ) : (
        <p className="empty-cart font-inter">Your cart is empty.</p>
      )}
    </div>
  );
}
