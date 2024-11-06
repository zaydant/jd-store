"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { fetchProductById } from "@/services/ProductServices";
import NavBar from "@/components/misc/Navbar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MinusIcon, PlusIcon } from 'lucide-react';

export default function ProductPage({ params }) {
  const { user } = useAuth();
  const router = useRouter();
  const unwrappedParams = use(params);
  const { productId } = unwrappedParams;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity]= useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const decreaseQuantity = () => {
    if(quantity != 1){
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    console.log('add to cart')
  }

  const goLogin = () => {
    router.push('/login')
  }

  return (
    <div className="montserrat">
      <NavBar />
      <div className="container mx-auto px-6 py-10 lg:py-20 flex flex-col lg:flex-row">
        {/* Left Column - Product Image */}
        <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            src={product.image_url}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Right Column - Product Details */}
        <div className="lg:w-1/2 flex flex-col justify-center lg:pl-12">
          <h1 className="text-4xl font-semibold mb-6">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-700 mb-4">
            {`Rp. ${product.price.toLocaleString("id-ID")}`}
          </p>
          <p className="text-lg text-gray-600 mb-8">{product.description}</p>
          <div className="flex space-x-4">
            <ToggleGroup type="single">
              <ToggleGroupItem variant="outline" value="S" aria-label="Toggle S">
                <p className="h-6 w-6">S</p>
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value="M" aria-label="Toggle M">
                <p className="h-6 w-6">M</p>
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value="L" aria-label="Toggle L">
                <p className="h-6 w-6">L</p>
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value="XL" aria-label="Toggle XL">
                <p className="h-6 w-6">XL</p>
              </ToggleGroupItem>
              <ToggleGroupItem disabled variant="outline" value="XXL" aria-label="Toggle XXL">
                <p className="h-6 w-6">XXL</p>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex items-center border rounded-md mt-4 w-[100px]">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={increaseQuantity}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          {/* CTA Buttons */}
          <div className="mt-6">
            <Button className="px-6 py-6 bg-black text-white text-md font-medium hover:bg-gray-800" onClick={user ? addToCart : goLogin}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
