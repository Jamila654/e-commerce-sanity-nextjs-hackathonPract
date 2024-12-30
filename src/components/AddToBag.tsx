"use client";
import { urlFor } from "@/app/lib/sanity";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  id: string;
}

export default function AddToBag({
  currency,
  description,
  price,
  name,
  image,
  id
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();
  const product ={
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    id: id
  }



  return (
    <div>
      <Button onClick={()=>{
        addItem(product), handleCartClick()
      }}>Add To Cart</Button>
    </div>
  );
}

