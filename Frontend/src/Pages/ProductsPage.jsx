import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice.js";
import LoadProduct from "../components/LoadProduct.jsx";
import toast from "react-hot-toast";
import Products from "../components/Products.jsx";
import Pagenation from "../components/Pagenation.jsx";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const { products, productCount, loading, error,productPerPage } = useSelector(
    (state) => state.product,
  ); // imported from productslice

  const dispatch = useDispatch();

  const [searchParams]=useSearchParams();
  const keyword = searchParams.get("keyword") ||"";

  const pageFromURL = parseInt(searchParams.get("page"),10)||1;

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const totalPages = Math.ceil(productCount / (productPerPage || 8));

  const handleChangePage = (pageNumber) => {
    if(pageNumber !== currentPage){
      setCurrentPage(pageNumber);
      const newSearchParams = new URLSearchParams(location.search);
      if(pageNumber === 1){
        newSearchParams.delete("page");
      }else{
        newSearchParams.set("page", pageNumber);
      }
      Navigate(`?${newSearchParams.toString()}`);
    }
  };

  useEffect(() => {
    dispatch(getProduct({keyword, page:currentPage}));
  }, [dispatch, keyword, currentPage]);

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
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-100">
        <Title title={"Products | E-Commerce"} />

        <Navbar />

        <main className="container mx-auto px-4 py-8 grow">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                  Categories
                </h2>

                <ul className="space-y-3">
                  {[
                    "Electronics",
                    "Groceries",
                    "Fashion",
                    "Furniture",
                    "Footwear",
                  ].map((cat) => (
                    <li key={cat}>
                      <button
                        className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300
                  hover:bg-amber-400 hover:text-white hover:shadow-md
                  border border-gray-200 font-medium"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Products Section */}

            <section className="flex-1">
              {/* Header */}

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Our Products
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Find your favorite products
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  <span
                    className="bg-amber-400 text-black px-5 py-2 rounded-full
              font-semibold shadow"
                  >
                    {productCount || 0} Products
                  </span>
                </div>
              </div>

              {/* Product Grid */}

              {products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((items) => (
                    <Products key={items._id} items={items} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg py-24 text-center flex flex-col justify-center items-center">
                 <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f622.png"  alt="😢" width="32" height="32"/>

                  <h2 className="text-2xl font-bold text-gray-700">
                    No Products Found
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Try another category or search keyword.
                  </p>
                </div>
              )}

              {/* Pagination */}

              <div className="mt-12 flex justify-center">
                <Pagenation currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage}/>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
