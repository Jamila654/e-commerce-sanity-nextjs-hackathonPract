"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orderHistory");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const clearOrderHistory = () => {
    localStorage.removeItem("orderHistory");
    setOrders([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Order History</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm space-y-4 bg-white"
            >
              <div>
                <p>
                  <strong>Order ID:</strong>{" "}
                  <span className="font-mono">{order.orderId}</span>
                </p>
                <p>
                  <strong>Tracking ID:</strong>{" "}
                  <span className="font-mono">{order.trackingId}</span>
                </p>
                <p>
                  <strong>Tracking URL:</strong>{" "}
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {order.trackingUrl}
                  </a>
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Products:</h3>
                {order.products?.map((product: any, productIndex: number) => (
                  <div
                    key={productIndex}
                    className="border rounded-md p-3 bg-gray-50"
                  >
                    <p>
                      <strong>Name:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ${product.price.toFixed(2)}
                    </p>
                  </div>
                ))}
                {(!order.products || order.products.length === 0) && (
                  <p className="text-gray-500">No products in this order.</p>
                )}
              </div>
              
            </div>
          ))}
          <Button onClick={clearOrderHistory} className=" w-full">Clear Order History</Button>
        </div>
      ) : (
        <p className="text-gray-500">You have no order history yet.</p>
      )}
    </div>
  );
}



