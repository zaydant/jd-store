// src/components/Footer.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black py-12 border-t-[1px] border-slate-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between md:w-2/3">
        {/* About Section */}
        <div className="mb-8 md:mb-0">
          <h4 className="text-xl font-semibold mb-4">JD Store</h4>
          <p className="text-gray-400">
            Providing quality products since 2023. Your satisfaction is our priority.
          </p>
        </div>
        {/* Links Section */}
        <div className="mb-8 md:mb-0">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      {/* Social Media Icons */}
      <div className="container mx-auto px-4 mt-8 flex justify-center space-x-6">
        <a href="#" className="text-gray-400 hover:text-white">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaInstagram size={24} />
        </a>
      </div>
      {/* Footer Bottom */}
      <div className="container mx-auto px-4 mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} JD Store. All rights reserved.
      </div>
    </footer>
  );
}
