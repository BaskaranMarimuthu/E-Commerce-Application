import Product from "../models/productmodels.js";

import handleError from "../handlerr/errorclass.js";
import ApiHandler from "../api/apiquery.js";

//Create products
export const addProducts = async (req, res) => {
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
//get all products
export const getAllProducts = async (req, res) => {
  //const products= await Product.find();
  //console.log(req.query); req.query display get the key value pair

  //obj for api
  const objApi = new ApiHandler(Product.find(), req.query).search().filter();

  const products = await objApi.query;

  return res.status(200).json({ success: true, products });
};

//get single product by id
export const getOneProduct = async (req, res, next) => {
  // console.log(req.params.id);
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    return res
      .status(200)
      .json({ success: true, msg: "your app is running for single product" });
  }
  // res.status(500).json({ success:false,msg:" product not found"  });
  return next(new handleError("product id not found", 404));
};

//update product

export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const updation = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (updation) {
    return res
      .status(200)
      .json({ success: true, msg: "your product data has been updated" });
  }
  //  res.status(404).json({success:false,msg:" product id not found"  });
  return next(new handleError("product id not found", 404));
};

//detete product

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const remove = await Product.findByIdAndDelete(id);
  if (remove) {
    return res
      .status(200)
      .json({ success: true, msg: "your product data has been deleted" });
  }
  // res.status(404).json({success:false,msg:" product id not found"  });
  return next(new handleError("product id not found", 404));
};
