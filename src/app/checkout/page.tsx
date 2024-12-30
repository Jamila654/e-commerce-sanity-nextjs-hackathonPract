"use client";

import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Checkout() {
  const { cartDetails, cartCount, totalPrice, clearCart } = useShoppingCart();
  const [formData, setFormData] = useState({
    name: "",
    street1: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setDeliveryCharge(Math.random() * (20 - 5) + 5);
  }, []);

  const handlePlaceOrder = async () => {
    if (cartCount === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const cartArray = Object.values(cartDetails!);
  
      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cart: cartArray,
          deliveryCharge,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setOrderId(data.orderId);
        setTrackingId(data.trackingId);
        setTrackingUrl(data.trackingUrl);
        setOrderPlaced(true);
        const newOrder = {
          orderId: data.orderId,
          trackingId: data.trackingId,
          trackingUrl: data.trackingUrl,
          date: new Date().toISOString(),
          products: cartArray.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity, // Total price for the product
          })) || [], 
        };
  
        const existingOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
        localStorage.setItem("orderHistory", JSON.stringify([newOrder, ...existingOrders]));
  
        clearCart();
      } else {
        alert(`Failed to place order: ${data.error}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {!orderPlaced ? (
        <>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            {cartCount! > 0 ? (
              Object.values(cartDetails!).map((entry) => (
                <div key={entry.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{entry.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {entry.quantity} x ${entry.price.toFixed(2)}
                    </p>
                  </div>
                  <p>${(entry.price * entry.quantity).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
          <form className="space-y-4">
            {(
              ["name", "street1", "city", "state", "zip"] as Array<
                keyof typeof formData
              >
            ).map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={`Enter your ${field}`}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            ))}
          </form>


          <div className="flex justify-between items-center">
            <p className="text-lg">Delivery Charge:</p>
            <p className="text-lg font-semibold">${deliveryCharge.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">Total:</p>
            <p className="text-lg font-semibold">
              ${(totalPrice! + deliveryCharge).toFixed(2)}
            </p>
          </div>
          <Button
            onClick={handlePlaceOrder}
            disabled={isLoading || cartCount === 0}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <p className="text-lg font-semibold text-green-600">
            Order placed successfully!
          </p>
          <p>Your order ID is: <span className="font-mono">{orderId}</span></p>
          <p>
            Your tracking ID is:{" "}
            <span className="font-mono">{trackingId}</span>
          </p>
          <p>
            Track your order live at:{" "}
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {trackingUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}




