"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import CartItem from "./NavComponents/CartItem";
import { getCartByUid } from "@/services/CartServices";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  SearchIcon,
  MenuIcon,
  UserIcon,
  ShoppingCartIcon,
  LogOutIcon,
} from "lucide-react";

export default function NavBar() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [myCart, setMyCart] = useState([])
  const [error, setError] = useState(null)

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCartByUid(user.uid, token);
        setMyCart(cart);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching cart:', error);
      }
    };

    if (user && token) {
      fetchCart();
    }
  }, [user, token]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white montserrat">
      <div className="container mx-auto w-full px-4 h-20">
        <div className="grid grid-cols-3 h-full items-center">
          <div className="flex justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-4">
                  <SearchBar />
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" aria-label="Shopping cart">
                      <ShoppingCartIcon className="h-5 w-5" />
                      Cart
                    </Button>
                    <Button variant="outline" aria-label="User account">
                      <UserIcon className="h-5 w-5" />
                      Account
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex justify-center">
            <Image
              src="/logo_circle.png"
              className="cursor-pointer"
              height={40}
              width={40}
              alt="Logo"
              onClick={() => router.push("/")}
            />
          </div>

          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <SearchBar />
              {user ? (
                <>
                  {/* Profile Button */}
                  <DropdownMenu className="montserrat">
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <UserIcon className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36">
                      <DropdownMenuLabel>
                        Welcome, {user.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserIcon className="h-5 w-5" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOutIcon className="h-5 w-5" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Shopping Cart Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost">
                        <ShoppingCartIcon className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="montserrat">
                      <SheetHeader>
                        <SheetTitle>Shopping Cart</SheetTitle>
                        <SheetDescription>
                          These are items in your cart!
                        </SheetDescription>
                      </SheetHeader>
                      <div className="flex flex-col mt-12 mb-6 space-y-8 h-[calc(100vh-280px)] overflow-y-auto">
                        <CartItem
                          imageSrc="https://signore.store/cdn/shop/files/Artboard20_88ee7009-5320-4a87-830b-0640b5ce576d.jpg?v=1729245375&width=500"
                          name="Polo Halfzip Suede - Gray"
                          price="Rp. 249.000"
                          size="L"
                          quantity={1}
                          onIncreaseQuantity={() => {
                            /* Increase quantity handler */
                          }}
                          onDecreaseQuantity={() => {
                            /* Decrease quantity handler */
                          }}
                          onDelete={() => {
                            /* Delete item handler */
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-4 absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Subtotal</span>
                          <span className="text-sm font-medium">
                            Rp. 249.000
                          </span>
                        </div>
                        <SheetFooter className="w-full">
                          <SheetClose asChild>
                            <Button type="submit" className="w-full">
                              CHECKOUT
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      </div>
                    </SheetContent>
                  </Sheet>
                </>
              ) : (
                <Button variant="ghost" onClick={() => router.push("/login")}>
                  <UserIcon className="h-5 w-5 mr-2" /> Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchBar() {
  return (
    <div className="relative hidden md:flex">
      <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 pr-4 w-full md:w-auto"
      />
    </div>
  );
}
