import { useState } from "react";
import { X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(`pk_live_51R2VrlRvl74rND5FN9ob9qhS8KrTRx30UnqnHtMaxgs6RJ7VN1kSy9yFqdbAP6CXd8sD9ssoM7Yx29Wg7GS308wY00WU410bor
`!);

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
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert("Please enter your card details.");
      setIsProcessing(false);
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error("Stripe token error:", error.message);
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
      <div className="bg-white w-full sm:w-[400px] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Payment Method</h2>
          <button className="text-gray-600" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
            <CardElement
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              options={{
                hidePostalCode: true,
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 text-white rounded-md mt-4"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Make a payment (€${amount})`}
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
