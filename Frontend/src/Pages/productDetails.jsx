import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import { Minus, PackageCheck, Plus, SendToBackIcon, ShoppingCartIcon, ShoppingCart } from "lucide-react";

const Product = () => {
  return (<div className="min-h-screen bg-yellow-50">
       <pageTitle title="Product name | Details"/>
       <Navbar/>
       <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
         {/* product details section*/}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8">
          {/* image gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-xl">
              <img src="https://ueeshop.ly200-cdn.com/u_file/UPBA/UPBA381/2404/03/products/800X800-Motive-6-Pro--fen-c852.png" alt="shoe" className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
            </div>
          </div>
         {/* product info */}
         <div className="flex flex-col">
          <h3 className="text-3xl font-semibold mb-2">Product details</h3>
          <div className="flex items-center gap-4 mb-4"> <Rating value={3} disabled={true}/> 
          <span className="text-sm text-gray-500 font-medium" >5 Customer reviews</span> </div>
          <div>
            <div className="flex items-center gap-2">
  <span className="relative inline-flex items-center bg-orange-500 pl-3 pr-4 py-1 text-sm font-bold text-white
               before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2
               before:rotate-45 before:bg-orange-500 before:content-['']">
    33% OFF
  </span>
  <span className="text-gray-500 line-through text-sm">₹1,199</span>
  <span className="text-lg font-bold text-gray-900">₹799</span>
</div>
            <p className=" text-gray-600 leading-relaxed mb-8 text-lg my-4"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quidem labore possimus repudiandae similique quod odit quisquam dolores nihil! Est! </p>
            <div className="border-t border-gray-300  pt-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <PackageCheck size={30} className=" text-green-600 "/>
                <span className=" text-green-600 font-semibold ">IN stock (5 Available)</span>
              </div>
             

<div className="flex items-center gap-3">
  {/* Quantity selector */}
  <div className="flex items-center rounded-lg border border-gray-300">
    <button
      className="p-2.5 text-gray-500 hover:text-gray-800 disabled:opacity-40"
      aria-label="Decrease quantity"
    >
      <Minus size={16} />
    </button>
    <span className="w-8 text-center text-sm font-semibold text-gray-900">1</span>
    <button
      className="p-2.5 text-gray-500 hover:text-gray-800"
      aria-label="Increase quantity"
    >
      <Plus size={16} />
    </button>
  </div>

  {/* Add to cart */}
  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]">
    <ShoppingCart size={18} />
    Add to Cart
  </button>
</div>
            </div>
          </div>
         </div>
         </div>
       </main>
       
       <Footer/>
  </div>);
};

export default Product;
