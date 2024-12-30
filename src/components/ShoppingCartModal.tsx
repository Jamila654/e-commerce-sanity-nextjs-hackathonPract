"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import Link from "next/link";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
  } = useShoppingCart();
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className=" sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className=" h-full flex flex-col justify-between">
          <div className=" mt8 flex-1 overflow-y-auto">
            <ul className=" -my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <li><h1 className="py-10">You dont have any items</h1></li>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className=" flex py-10">
                      <div className=" h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className=" ml-4 flex flex-1 flex-col">
                        <div>
                          <div className=" flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className=" ml-4">${entry.price}</p>
                          </div>
                          <p className=" mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>
                        <div className=" flex flex-1 items-center justify-between text-sm">
                          <p className=" text-gray-500">
                            QTY: {entry.quantity}
                          </p>

                          <div className=" flex">
                            <button
                              onClick={() => removeItem(entry.id)}
                              type="button"
                              className=" font-medium text-purple-600 hover:text-purple-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className=" border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className=" flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className=" mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at Checkout.
            </p>
            <div className=" mt-6">
              <Link href={'/checkout'}>
              <Button className=" w-full">Checkout</Button></Link>
            </div>
            <div className=" mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR <button onClick={()=> handleCartClick()} className=" font-medium text-purple-600 hover:text-purple-800">Continue Shopping</button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
