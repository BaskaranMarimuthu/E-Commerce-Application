import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { FaRupeeSign } from "react-icons/fa";

const Products = ({ items }) => {
  const [rating, setRating] = useState(items.ratings || 0);
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-slate-100">
        <Link to={`/Products/${items._id}`} className="group block">
          <div className="h-70 overflow-hidden">
            <img
              src={items.image[0].url}
              alt={items?.name || "Product"}
              className="h-full w-full transition object-cover group-hover:scale-120 duration-1000 "
            />
          </div>
          <div className="p-3 space-y-1.5">
            <h3 className="text-xl font-semibold text-mauve-700 line-clamp-1 ">
              {items.name}
            </h3>
            <p className="text-sm line-clamp-1 ">{items.description}</p>
          </div>
        </Link>
        <div className="px-3 pb-4 space-y-1.5">
          <div className="flex items-center  gap-2">
            <Rating value={rating} onRatingChange={(r) => setRating(r)} />
            <span className="text-sm">({items.numReviews} reviews)</span>
          </div>
          <div className="flex  justify-between">
            <span className="py-1 font-semibold text-amber-950 ">
              ₹ {items.price}.00/only
            </span>
            <button className="bg-mauve-600 px-3 py-1 text-amber-200 rounded border-0 hover:bg-mauve-800 hover:text-amber-300 transition hover:scale-110">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
