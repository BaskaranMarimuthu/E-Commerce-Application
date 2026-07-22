import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Title title="Contact | NammaKart" />
      <Navbar />

      <section className="bg-gradient-to-b from-amber-50 via-white to-amber-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-14">
            <h1 className="text-5xl font-bold text-mauve-800">Contact Us</h1>

            <p className="mt-5 text-gray-600 text-lg">
              We'd love to hear from you. Feel free to contact us anytime.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-mauve-800">
                Send us a Message
              </h2>

              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                ></textarea>

                <button className="bg-mauve-800 text-amber-100 px-8 py-3 rounded-lg hover:bg-mauve-700 transition">
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 flex gap-5 items-center">
                <Phone className="text-amber-500" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p>+91 80122 98499</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 flex gap-5 items-center">
                <Mail className="text-amber-500" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p>support@nammakart.com</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 flex gap-5 items-center">
                <MapPin className="text-amber-500" />
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p>
                    Chennai,
                    <br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 flex gap-5 items-center">
                <Clock className="text-amber-500" />
                <div>
                  <h3 className="font-bold">Working Hours</h3>
                  <p>Monday - Saturday</p>
                  <p>9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
