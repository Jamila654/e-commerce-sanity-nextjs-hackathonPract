"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { History, ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Men",
    href: "/Men",
  },
  {
    name: "Women",
    href: "/Women",
  },
  {
    name: "Teens",
    href: "/Teens",
  },
];

export default function Navbar() {
  const pathName = usePathname();
  const { handleCartClick } = useShoppingCart();
  return (
    <header className=" mb-8 border-b">
      <div className=" flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href={"/"}>
          <h1 className=" text-2xl md:text-4xl font-bold">
            Shop<span className=" text-purple-600">Sphere</span>
          </h1>
        </Link>
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <Link
                  className=" text-lg font-semibold text-purple-600"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className=" text-lg font-semibold text-gray-600 transition duration-100 hover:text-purple-600"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className=" flex gap-3 divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            className="  flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 rounded-none"
            onClick={() => handleCartClick()}
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
          <Link href={"/order-history"}>
            <Button
              variant={"secondary"}
              className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 rounded-none"
            >
              <History />
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                History
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
