import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { ShoppingBag, ShieldCheck, Truck, Headphones } from "lucide-react";

const About = () => {
  return (
    <>
      <Title title="About | NammaKart" />
      <Navbar />

      <section className="bg-gradient-to-b from-amber-50 via-white to-amber-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-bold text-mauve-800">
              About NammaKart
            </h1>

            <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg leading-8">
              NammaKart is a modern e-commerce platform designed to provide
              customers with quality products, secure shopping, and a seamless
              online experience. From fashion to electronics, we carefully
              curate products that combine quality, affordability, and trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt="Shopping"
              className="rounded-2xl shadow-xl"
            />

            <div>
              <h2 className="text-3xl font-bold text-mauve-800 mb-5">
                Our Mission
              </h2>

              <p className="text-gray-600 leading-8 mb-5">
                Our mission is to make online shopping simple, reliable, and
                enjoyable by offering premium-quality products with excellent
                customer service and fast delivery.
              </p>

              <p className="text-gray-600 leading-8">
                We believe every customer deserves a smooth shopping experience,
                secure payments, and products they can trust.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-20">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <ShoppingBag className="mx-auto text-amber-500" size={42} />
              <h3 className="mt-4 font-bold text-xl">Premium Products</h3>
              <p className="text-gray-500 mt-3">
                Carefully selected quality products across multiple categories.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <ShieldCheck className="mx-auto text-green-600" size={42} />
              <h3 className="mt-4 font-bold text-xl">Secure Payments</h3>
              <p className="text-gray-500 mt-3">
                Safe and trusted payment methods with complete protection.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Truck className="mx-auto text-blue-600" size={42} />
              <h3 className="mt-4 font-bold text-xl">Fast Delivery</h3>
              <p className="text-gray-500 mt-3">
                Quick shipping with reliable delivery partners.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Headphones className="mx-auto text-red-500" size={42} />
              <h3 className="mt-4 font-bold text-xl">24/7 Support</h3>
              <p className="text-gray-500 mt-3">
                Friendly customer support whenever you need assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
