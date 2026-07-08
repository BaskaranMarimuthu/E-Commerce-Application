import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { discountCal, formatDate } from "../mathcalculation/uitilsMath.js";

import {
  Minus,
  PackageCheck,
  Plus,
  SendToBackIcon,
  ShoppingCartIcon,
  ShoppingCart,
  PackageX,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  removeErrors,
} from "../features/products/productSlice";
import toast from "react-hot-toast";

const Product = () => {
  const [userRating, setUserRating] = useState(0);
  const { product, loading, error } = useSelector((state) => state.product);
  console.log("Product from Redux:", product);
  const { id } = useParams();
  //console.log(id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      <Title title={`${product?.name} | Details`} />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* product details section*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8">
          {/* image gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                src={product?.image?.[0]?.url}
                alt={product?.name}
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
              />
            </div>
          </div>
          {/* product info */}
          <div className="flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">{product?.name}</h3>
            <div className="flex items-center gap-4 mb-4">
              <Rating value={Math.ceil(product?.ratings)} disabled={true} />
              <span className="text-sm text-gray-500 font-medium">
                {product?.numReviews} Customer reviews
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="relative inline-flex items-center bg-orange-500 pl-3 pr-4 py-1 text-sm font-bold text-white
               before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2
               before:rotate-45 before:bg-orange-500 before:content-['']"
                >
                  Get {discountCal(product?.price, product?.mrp)}% Offer
                </span>
                <span className="text-gray-500 line-through text-md font-bold ">
                  ₹{product?.mrp}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{product?.price} /-Only
                </span>
              </div>
              <p className=" text-gray-600 leading-relaxed mb-8 text-lg my-4">
                {product?.description}
              </p>
              <div className="border-t border-gray-300  pt-8 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  {product.stock > 1 ? (
                    <>
                      <PackageCheck size={30} className=" text-green-600 " />
                      <span className=" text-green-600 font-semibold ">
                        IN stock {product.stock} Available
                      </span>
                    </>
                  ) : (
                    <>
                      <PackageX size={30} className=" text-red-500 " />
                      <span className=" text-red-500 font-semibold ">
                        Out of stock
                      </span>
                    </>
                  )}
                </div>

                {product?.stock > 1 && (
                  <div className="flex items-center gap-3">
                    {/* Quantity selector */}
                    <div className="flex items-center rounded-lg border border-gray-300">
                      <button
                        className="p-2.5 text-gray-500 hover:text-gray-800 disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-900">
                        1
                      </span>
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
                )}
              </div>
              {/*customer review sections*/}

              <form className="w-full max-w-md mx-auto rounded-lg border border-gray-200 bg-white p-5 shadow-2xl">
                <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800">
                  <MessageSquare size={20} className="text-gray-500" />
                  Share your feedback
                </h3>

                <div className="mt-3 flex gap-1">
                  <Rating
                    value={0}
                    disabled={false}
                    onRatingChange={(r) => setUserRating(r)}
                  />
                </div>

                <textarea
                  placeholder="Tell us what you think..."
                  rows={3}
                  className="mt-3 w-full rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />

                <button
                  type="submit"
                  className="mt-3 w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Post review
                </button>
              </form>
            </div>
          </div>
        </div>
        <section className="mt-20">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-amber-500 pl-4">
              Customer Reviews
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product?.reviews.map((rev, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-300 hover:border-amber-300 hover:shadow-md transition-all duration-200 group"
              >
                {/* Top row: left = avatar + rating, right = calendar + date */}
                <div className="flex items-start justify-between mb-4">
                  {/* Left corner */}
                  <div className="flex items-center gap-3">
                    <img
                      src={rev?.avatar}
                      alt={rev?.name}
                      className="w-18 h-18 rounded-full border border-gray-200 object-cover"
                    />
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-gray-800">
                        {rev?.name}
                      </h4>
                      <Rating value={rev?.ratings} />
                    </div>
                  </div>

                  {/* Right corner */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{formatDate(rev?.createdAt)}</span>
                  </div>
                </div>

                {/* Bottom: comment */}
                <p className="text-gray-900 leading-relaxed italic">
                  "{rev?.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
