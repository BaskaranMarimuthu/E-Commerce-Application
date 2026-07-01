import { useState, useEffect } from "react";
import dress from "../assets/dress.png";
import electronics from "../assets/electronics.png";
import shoes from "../assets/shoes.png";
import bag from "../assets/bag2.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [dress, electronics, shoes, bag];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const intreval = setInterval(() => {
      setCurrent((pre) => (pre + 1) % images.length);
    }, 3000);
    return () => clearInterval(intreval);
  }, []);

  const prevImg = () => {
    setCurrent((pre) => (pre === 0 ? images.length - 1 : pre - 1));
  };
  const nextImg = () => {
    setCurrent((nxt) => (nxt + 1) % images.length);
  };
  return (
    <div className=" w-full overflow-hidden shadow-xl relative">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="h-70 w-full md:h-100 object-cover shrink-0"
          />
        ))}
      </div>
      {/* prev */}
      <button
        onClick={prevImg}
        className="absolute left-4 top-1/2 bg-amber-50 text-black rounded-full hover:bg-amber-200 transition duration-200"
      >
        <ChevronLeft size={30} className="w-5" />
      </button>
      {/* next */}
      <button
        onClick={nextImg}
        className="absolute right-4 top-1/2 bg-amber-50 text-black rounded-full hover:bg-amber-200 transition duration-200"
      >
        <ChevronRight size={30} className="w-5" />
      </button>

      {/* indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((a, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${current === index ? "w-4 bg-yellow-500" : "w-2 bg-yellow-300"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
