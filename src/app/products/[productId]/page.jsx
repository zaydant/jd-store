"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { fetchProductById } from "@/services/productServices";
import { addToCart as addToCartService, editItemQuantity } from "@/services/cartServices";
import { formatToIDR } from "@/lib/utils";
import NavBar from "@/components/misc/navbar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, updateItemQuantity } from "@/store/slices/cartSlice"; // Redux action

export default function ProductPage({ params }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch(); // Redux dispatcher
  const unwrappedParams = React.use(params);
  const { productId } = unwrappedParams;

  const myCart = useSelector((state) => state.cart.cartItems);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [loading, setLoading] = useState(false);

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
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const uid = user.uid;

      // Check if the product with the same id and size already exists in the cart
      const existingItem = myCart.find((item) => {
        console.log("Checking item:", item);
        return item.product_id === product.id && item.size === selectedSize;
      });

      console.log(existingItem);

      if (existingItem) {
        // Update the quantity for the existing item
        const newQuantity = existingItem.quantity + quantity;

        await editItemQuantity(existingItem.id, token, newQuantity); // Update in the backend
        dispatch(
          updateItemQuantity({ id: existingItem.id, quantity: newQuantity })
        ); // Update Redux state

        toast({
          title: "Success",
          description: `Quantity updated to ${newQuantity} for size ${selectedSize}.`,
        });
      } else {
        // Add a new item to the cart
        await addToCartService(token, uid, product.id, selectedSize, quantity);

        dispatch(
          addItemToCart({
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
            },
            size: selectedSize,
            quantity,
          })
        );

        toast({
          title: "Success",
          description: `${quantity} item(s) of size ${selectedSize} added to cart.`,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add items to cart.",
      });
    } finally {
      setLoading(false);
    }
  };

  const goLogin = () => {
    router.push("/login");
  };

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
            {formatToIDR(product.price)}
          </p>
          <p className="text-lg text-gray-600 mb-8">{product.description}</p>

          {/* Size Toggle Group */}
          <div className="flex space-x-4 mb-4">
            <ToggleGroup
              type="single"
              value={selectedSize}
              onValueChange={handleSizeChange} // Handle size changes
            >
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <ToggleGroupItem
                  key={size}
                  variant="outline"
                  value={size}
                  disabled={size === "XXL"} // Example: Disable XXL
                  aria-label={`Toggle ${size}`}
                >
                  <p className="h-6 w-6">{size}</p>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Quantity Controls */}
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

          {/* Add to Cart Button */}
          <div className="mt-6">
            <Button
              className="px-6 py-6 bg-black text-white text-md font-medium hover:bg-gray-800"
              onClick={user ? handleAddToCart : goLogin}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
