"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAllProducts } from "@/services/ProductServices";
import {
  Card,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await fetchAllProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return `Rp. ${price.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;
  };

  const handleCardClick = (productId) => {
    router.push(`/products/${productId}`); // Navigate to the product page
  };

  return (
    <section className="w-full py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border-none cursor-pointer"
              onClick={() => handleCardClick(product.id)} // Set the click handler
            >
              <CardHeader className="p-0">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={400}
                  height={400}
                  className=""
                />
              </CardHeader>
              <CardDescription className="p-4 flex flex-col items-center justify-center">
                <h3 className="text-md md:text-lg mb-2 text-black">
                  {product.name}
                </h3>
              </CardDescription>
              <CardFooter className="justify-center">
                  <span className="text-sm md:text-md text-slate-500">
                    {formatPrice(product.price)}
                  </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
