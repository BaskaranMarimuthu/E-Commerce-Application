import { Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGit,
  FaGithub,
} from "react-icons/fa";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-mauve-800  text-yellow-100  mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left ">
        {/* Home */}
        {/* About */}
        {/* contact */}
        <div className="min-w-62.5 flex-1 pt-3">
          <h3 className="mb-2 text-xl text-yellow-200 font-bold">Contact Us</h3>
          <p className="text-sm py-2 text-amber-100 flex items-center justify-center md:justify-start gap-2 mb-2">
            
            <Phone size={18} /> Phone.No : 8012298499{" "}
          </p>
          <p className="text-sm text-amber-100 flex items-center justify-center md:justify-start gap-2 mb-2">
            
            <Mail size={18} /> Gmail : baskarbain@gmail.com
          </p>
        </div>
        {/* follow on */}
        <div className="min-w-62.5 flex-1 pt-3 border-0 md:border-x">
          <h3 className="mb-2 text-xl text-yellow-200 font-bold text-center md:text-center">Follow Me</h3>
          <div className="flex gap-4 py-2 justify-center md:justify-center items-center">

        <a href="#" target="_blank" className="flex  justify-center"><FaFacebookF
              className="text-neutral-200 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              size={18}/></a>
        <a href="#" target="_blank" className="flex  justify-center"><FaGithub
              className="text-neutral-200 hover:text-white transition-colors duration-300 cursor-pointer"
              size={18}/></a>
        <a href="#" target="_blank" className="flex  justify-center"><FaInstagram
              className="text-neutral-200 hover:text-pink-400 transition-colors duration-300 cursor-pointer"
              size={18}/></a>
        <a href="#" target="_blank" className="flex  justify-center"><FaLinkedinIn
              className="text-neutral-200  hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              size={18}/> </a>
              </div>
        </div>
        {/* about us */}
        <div className="min-w-62.5 flex-1 pt-3">
          <h3 className="mb-2 text-xl text-yellow-200 font-bold">About us</h3>

          <p className="text-sm text-amber-100 flex items-center justify-center md:justify-start gap-2 mb-2 pb-2">
            “At Maison, we believe shopping should be simple, stylish, and secure — bringing premium products and trusted service together in one place.”</p>
        </div>

      </div>
      <div>
        <div className="border-t border-white/80 py-3 text-gold-500 text-sm text-center text-yellow-100">
          © 2026 Maison Free shipping over $150
        </div>
      </div>
    </footer>
  );
};

export default Footer;
