import { Link } from "react-router-dom";
import {
  MenuIcon,
  Search,
  SearchIcon,
  SearchXIcon,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  ShoppingCart,
  ShoppingCartIcon,
  TagX,
  User,
  User2Icon,
  X,
  XIcon,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
      const [open,setOpen] = useState(false);
      const isAuthendicated = false;

  return (
   <nav className="sticky top-0 w-full bg-mauve-800 z-50 shadow-md">
    <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 font-extralight text-4xl text-yellow-100">
      <ShoppingBagIcon size={40}/>
      <span>Shopping Hub</span>
      </Link>

      {/* links */}
      
      <div className="hidden text-lg md:flex items-center gap-6  text-yellow-100 font-medium">
        
      <Link to="/home" className=" hover:text-amber-400  transition duration-200">Home</Link>
      <Link to="/about" className=" hover:text-amber-400 transition duration-200">About</Link>
      <Link to="/register" className=" hover:text-amber-400 transition duration-200">Products</Link>
      <Link to="/contact" className=" hover:text-amber-400 transition duration-200">Contact Us</Link>
      </div>

      {/* search bar */}
      <div className="flex items-center gap-4">
        <form className="hidden sm:flex items-center border bg-amber-50 border-amber-500 rounded overflow-hidden">
          <input placeholder="Search here..." className="focus:outline-none px-3 py-0.5 w-40" />
          <button className="px-2 text-gray-500 hover:text-cyan-950 transition duration-200">
            <SearchIcon size={18}/>
          </button>
        </form>
        {/* cart */}
        <Link to="/cart" className="relative">
        <ShoppingCartIcon size={26} className="  text-amber-50 hover:text-amber-500"/>
        <span className="absolute -top-2 -right-2 text-sm min-w-2 h-5 px-1 rounded bg-amber-100 text-black flex items-center justify-center">6</span>
        </Link>

        {/* register */}
        {!isAuthendicated && (<Link to="/login" className="hidden sm:flex items-center text-black gap-2 bg-amber-50 hover:bg-blue-300 px-3 ml-3   rounded">
        <User2Icon size={18}/>
        <span>Login user</span>
        </Link>)}
        {/* menu bar */}
        <button onClick={()=>setOpen(!open)}  className="md:hidden text-amber-50">
          {open ? <X/> :<MenuIcon/>}
        </button>
      </div>
    </div>
    <div className={`md:hidden transition-all duration-300 overflow-hidden ease-in-out ${open? "max-h-96 opacity-100 translate-y-0":"max-h-10 opacity-0 translate-y-2"} `}>
      <div className="flex flex-col gap-4 p-4 text-yellow-100 font-medium">
        <Link onClick={()=>setOpen(false)} to="/" className=" hover:text-amber-400  transition duration-200">Home</Link>
      <Link onClick={()=>setOpen(false)} to="/about" className=" hover:text-amber-400 transition duration-200">About</Link>
      <Link onClick={()=>setOpen(false)} to="/register" className=" hover:text-amber-400 transition duration-200">Products</Link>
      <Link onClick={()=>setOpen(false)} to="/contact" className=" hover:text-amber-400 transition duration-200">Contact Us</Link>

      </div>
    </div>

   </nav>
  );
};

export default Navbar;
