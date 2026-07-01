import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/imageSlider";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Title from "../components/Title";

const products = [
  {
    _id: "p001",
    name: "Logitech MX Master 3S",
    description: "Wireless Performance Mouse",
    price: 9995,
    ratings: 4.8,
    image: [
      {
        _id: "img001",
        public_id: "products/logitech_mouse",
        url: "https://prophonechile.cl/wp-content/uploads/2022/07/MASTER3S.png",
      },
    ],
    category: "Accessories",
    stock: 35,
    numReviews: 18,
    reviews: [],
  },
  {
    _id: "p002",
    name: "JBL Flip 6",
    description: "Portable Bluetooth Speaker",
    price: 8499,
    ratings: 4.7,
    image: [
      {
        _id: "img002",
        public_id: "products/jbl_flip6",
        url: "https://www.dateks.lv/images/pic/2400/2400/881/1127.jpg",
      },
    ],
    category: "Audio",
    stock: 28,
    numReviews: 15,
    reviews: [],
  },
  {
    _id: "p003",
    name: "HP Pavilion 15",
    description: "13th Gen Intel Core i5, 16GB RAM, 512GB SSD",
    price: 63990,
    ratings: 4.5,
    image: [
      {
        _id: "img003",
        public_id: "products/hp_pavilion",
        url: "https://www.notebookcheck.net/fileadmin/Notebooks/HP/Pavilion_15-cs0003ng/HP_Pavilion_15_cs0003ng_3.jpg",
      },
    ],
    category: "Electronics",
    stock: 22,
    numReviews: 11,
    reviews: [],
  },
  {
    _id: "p004",
    name: "Adidas Ultraboost 23",
    description: "Men's Running Shoes",
    price: 11999,
    ratings: 4.6,
    image: [
      {
        _id: "img004",
        public_id: "products/adidas_ultraboost",
        url: "https://tse4.mm.bing.net/th/id/OIP.Rys9qNDhLJnnnGgALi6NAgHaJ4?pid=ImgDet&w=474&h=632&rs=1&o=7&rm=3",
      },
    ],
    category: "Footwear",
    stock: 42,
    numReviews: 8,
    reviews: [],
  },
  {
    _id: "p005",
    name: "boAt Airdopes 311 Pro",
    description: "True Wireless Bluetooth Earbuds",
    price: 1999,
    ratings: 4.5,
    image: [
      {
        _id: "img005",
        public_id: "products/boat_airdopes",
        url: "https://m.media-amazon.com/images/I/614VGnQmTpL._AC_.jpg",
      },
    ],
    category: "Audio",
    stock: 60,
    numReviews: 21,
    reviews: [],
  },
  {
    _id: "p006",
    name: "Sony PlayStation 5",
    description: "Gaming Console with DualSense Controller",
    price: 49990,
    ratings: 4.9,
    image: [
      {
        _id: "img006",
        public_id: "products/ps5",
        url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/680edcb0-cc0b-438d-9924-71520ff073d3.jpg",
      },
    ],
    category: "Gaming",
    stock: 10,
    numReviews: 25,
    reviews: [],
  },
  {
    _id: "p007",
    name: "Apple iPad Air M2",
    description: "10.9-inch Liquid Retina Display, 128GB",
    price: 59990,
    ratings: 3,
    image: [
      {
        _id: "img007",
        public_id: "products/ipad_air_m2",
        url: "https://tse3.mm.bing.net/th/id/OIP.G5PXIv56YilhkH2DThX-AAHaEZ?w=3840&h=2283&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ],
    category: "Electronics",
    stock: 20,
    numReviews: 14,
    reviews: [],
  },
  {
    _id: "p008",
    name: "Canon PIXMA G3020",
    description: "All-in-One Ink Tank Printer",
    price: 15999,
    ratings: 4.4,
    image: [
      {
        _id: "img008",
        public_id: "products/canon_pixma",
        url: "https://m.media-amazon.com/images/I/616ZjXcMaQL._SL1500_.jpg",
      },
    ],
    category: "Electronics",
    stock: 25,
    numReviews: 7,
    reviews: [],
  },
  {
    _id: "p009",
    name: "Philips Air Fryer HD9200",
    description: "Rapid Air Technology, 4.1L",
    price: 8999,
    ratings: 2.5,
    image: [
      {
        _id: "img009",
        public_id: "products/philips_airfryer",
        url: "https://tse3.mm.bing.net/th/id/OIP.hbG9KY3VRVyWsnhmpM7TzwHaJk?pid=ImgDet&w=178&h=229&c=7&dpr=1.5&o=7&rm=3",
      },
    ],
    category: "Home Appliances",
    stock: 30,
    numReviews: 10,
    reviews: [],
  },
  {
    _id: "p010",
    name: "Fossil Gen 6 Smartwatch",
    description: "Wear OS, AMOLED Display",
    price: 22999,
    ratings: 4.6,
    image: [
      {
        _id: "img010",
        public_id: "products/fossil_gen6",
        url: "https://tse3.mm.bing.net/th/id/OIP.UzylIwbCmZVfiv6fgNw7GAHaHa?pid=ImgDet&w=474&h=474&rs=1&o=7&rm=3",
      },
    ],
    category: "Wearables",
    stock: 12,
    numReviews: 8,
    reviews: [],
  },
  {
    _id: "p011",
    name: "Wildcraft Backpack 35L",
    description: "Laptop Backpack with Rain Cover",
    price: 2499,
    ratings: 2,
    image: [
      {
        _id: "img011",
        public_id: "products/wildcraft_backpack",
        url: "https://assets.chrimg.com/image/christ/88463196/88463196/product_lg/88463196.jpg",
      },
    ],
    category: "Bags",
    stock: 40,
    numReviews: 5,
    reviews: [],
  },
  {
    _id: "p012",
    name: "Ray-Ban Aviator Classic",
    description: "UV Protected Metal Frame Sunglasses",
    price: 7999,
    ratings: 2,
    image: [
      {
        _id: "img012",
        public_id: "products/rayban_aviator",
        url: "https://img.ltwebstatic.com/images3_spmp/2023/06/16/16868778477a8f96ac3acfc3a0f5d76b26ee161c81_thumbnail_900x.webp",
      },
    ],
    category: "Accessories",
    stock: 33,
    numReviews: 13,
    reviews: [],
  },
];

const Home = () => {
  return (
    <>
       <Title title="Home | E-commerce"/>
      <Navbar />
      <Slider />
      <div className="mt-4 p-8 flex flex-col items-center justify-around text-black bg-mauva-30">
        <h2 className="text-amber-950 font-semibold text-2xl mb-4">Latest collections...</h2>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <Products key={index} items={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
