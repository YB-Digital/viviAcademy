import { useState } from "react";
import { X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

//image
import visa from '@/image/visa.svg'
import mastercard from '@/image/mastercard.svg'
import paypal from '@/image/paypal.svg'
import Image from "next/image";

const stripePromise = loadStripe("pk_live_51R2VrlRvl74rND5FN9ob9qhS8KrTRx30UnqnHtMaxgs6RJ7VN1kSy9yFqdbAP6CXd8sD9ssoM7Yx29Wg7GS308wY00WU410bor");

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  userId: number;
  courseIds: number[];
}

function CheckoutForm({ onClose, amount, userId, courseIds }: Omit<PaymentModalProps, "isOpen">) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      alert("Please enter your card details.");
      setIsProcessing(false);
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardNumberElement);
      if (error) {
        alert(error.message);
        setIsProcessing(false);
        return;
      }

      const response = await fetch("https://ybdigitalx.com/vivi_front/payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          education_id: courseIds,
          user_id: userId,
          token: token.id,
        }),
      });

      const responseData = await response.json();
      setIsProcessing(false);
      if (responseData.status === "success") {
        alert("Payment successful!");
        onClose();
      } else {
        alert(`Payment failed: ${responseData.message}`);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      alert("An error occurred while processing the payment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment Method</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="flex justify-between mb-4">
          <Image src={visa} alt="Visa" className="h-8" />
          <Image src={mastercard} alt="Mastercard" className="h-8" />
          <Image src={paypal} alt="PayPal" className="h-8" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Card Number</label>
            <CardNumberElement className="mt-1 w-full border px-3 py-2 rounded-md text-sm" />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm text-gray-600">Expiration Date</label>
              <CardExpiryElement className="mt-1 w-full border px-3 py-2 rounded-md text-sm" />
            </div>
            <div className="w-1/2">
              <label className="text-sm text-gray-600">CVV</label>
              <CardCvcElement className="mt-1 w-full border px-3 py-2 rounded-md text-sm" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md mt-2 text-sm font-semibold"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Make a payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PaymentModal(props: PaymentModalProps) {
  if (!props.isOpen) return null;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
