import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/imageSlider";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice.js";
import LoadProduct from "../components/LoadProduct.jsx";
import toast from "react-hot-toast";

const Home = () => {
  const { products, productCount, loading, error } = useSelector(
    (state) => state.product,
  ); // imported from productslice

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({keyword:""}));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <LoadProduct />
  ) : (
    <>
      <Title title="Home | E-commerce" />
      <Navbar />
      <Slider />
      <div className="mt-4 p-8 flex flex-col items-center justify-around text-black bg-mauva-30">
        <h2 className="text-amber-950 font-semibold text-2xl mb-4">
          Latest collections...
        </h2>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <Products key={item._id} items={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
