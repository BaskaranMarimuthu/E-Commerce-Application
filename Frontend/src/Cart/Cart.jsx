import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "./cartItem";
import { ArrowRight, Trash2 } from "lucide-react";
import { clearCart, removeMessage } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { success, loading, error, message, cartItems } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();
  const amount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = amount * 0.18;
  const shippingCharge = cartItems.length === 0 ? 0 : amount > 500 ? 0 : 50;
  const total = amount + tax + shippingCharge;

  useEffect(() => {
    if (message) {
      toast.success(message, { position: "top-center", autoClose: 2000 });
      dispatch(removeMessage());
    }
  }, [message, dispatch]);
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-10 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 ">
                <h2 className="text-2xl font-bold text-cyan-700 mb-6 flex justify-between">
                  Your Cart
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-100 hover:text-red-600 transition flex justify-between gap-2 items-center"
                  >
                    <Trash2 size={22} /> clear all
                  </button>
                </h2>

                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500"></p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <CartItem item={item} key={item.product} />
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-cyan-700 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className=" flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Product Amount
                    </span>
                    <span className="font-bold">{amount.toFixed(2)}</span>
                  </div>
                  <div className=" flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Shipping Charge
                    </span>
                    <span className="font-bold">
                      {shippingCharge.toFixed(2)}
                    </span>
                  </div>
                  <div className=" flex justify-between">
                    <span className="text-gray-600 font-medium">Tax 18%</span>
                    <span className="font-bold">{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 pt-4 border-dashed  ">
                    <div className=" flex justify-between">
                      <span className="text-gray-800 text-xl font-bold ">
                        Total Amount
                      </span>
                      <span className="font-bold text-xl text-cyan-700">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-5 flex items-center justify-center gap-2 bg-amber-300 hover:bg-amber-400 text-black font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:shadow-lg active:scale-95">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
