import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCartItems,
  removeErrors,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    if (item.quantity <= 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    dispatch(
      addCartItems({
        id: item.product,
        quantity: item.quantity - 1,
      }),
    );
  };

  const increaseQuantity = () => {
    if (item.quantity >= item.stock) {
      toast.error("Quantity cannot be greater than available stock");
      return;
    }

    dispatch(
      addCartItems({
        id: item.product,
        quantity: item.quantity + 1,
      }),
    );
  };
  return (
    <>
      <div
        key={item.product}
        className="flex items-center gap-4 p-4 rounded-xl bg-gray-200"
      >
        <img
          src={item?.image}
          alt={item?.name}
          className="w-30 h-30 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="font-bold">{item?.name}</h3>
          <p className="">{item?.description}</p>
          <p className="font-semibold">Price.Rs ₹{item?.price}</p>
          <p className="font-semibold">
            {item?.price} x {item?.quantity} = {item?.price * item?.quantity}
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <button><Minus size={22}/> </button>
          <span></span>
          <button><Plus size={22}/></button>
        </div>
        <button><Trash2 size={22}/></button> */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-2 hover:bg-gray-100 transition"
            >
              <Minus size={20} />
            </button>

            <span className="px-4 py-2 font-medium border-x border-gray-300">
              {item.quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="px-3 py-2 hover:bg-gray-100 transition"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => dispatch(removeItemFromCart(item.product))}
            className="p-2 rounded-lg text-red-400 hover:bg-red-100 hover:text-red-600 transition"
          >
            <Trash2 size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
