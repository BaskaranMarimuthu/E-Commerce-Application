import Product from "../models/productmodels.js";

import handleError from "../handler/errorclass.js";
import ApiHandler from "../api/apiquery.js";

//Create products
export const addProducts = async (req, res) => {
  req.body.user = req.user.id;
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
//get all products
export const getAllProducts = async (req, res, next) => {
  //const products= await Product.find();
  //console.log(req.query); req.query display get the key value pair

  //obj for api
  const objApi = new ApiHandler(Product.find(), req.query).search().filter();

  const filteredQuery = objApi.query.clone(); // query clone of search and filter
  const productCount = await filteredQuery.countDocuments(); // number of matching documents

  const productPerPage = 4;
  let page = Number(req.query.page) || 1; // request query page, default to 1
  if (page < 1) page = 1;

  const totalPages = Math.ceil(productCount / productPerPage);
  if (totalPages > 0 && page > totalPages) {
    return next(new handleError("page doesn't exist", 404));
  }

  // apply pagination to the query (instance method on objApi)
  objApi.pagination(productPerPage);

  const products = await objApi.query;

  return res.status(200).json({
    success: true,
    products,
    productCount,
    productPerPage,
    totalPages,
    currentPage: page,
  });
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

//review create product by user

export const createReviewProduct = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  if (!req.user) {
    return next(new handleError("Not authenticated", 401));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new handleError("product id not found", 400));
  }

  const userIdStr = req.user._id.toString();

  const existingReview = product.reviews.find(
    (r) => r.user && r.user.toString() === userIdStr
  );

  if (!existingReview) {
    product.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    });
  } else {
    existingReview.rating = Number(rating);
    existingReview.comment = comment;
  }

  product.numReviews = product.reviews.length;

  const sum = product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, product });
};

// veiw product reviews

export const viewProductReviews = async(req, res, next)=>{
  const product = await Product.findById(req.query.id);
  if(!product){
    return next(new handleError('product not found',404));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews,
  });
} 

//view all products for admin
export const adminAllProducts = async (req, res) => {
  
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// delete reviews

export const deleteReviews = async(req, res, next)=>{

 const {productId,reviewId}=req.query;

  const  product = await Product.findById(productId);
  if(!product){
    return next(new handleError('product not found',404));
  }
  const reviews = product.reviews.filter((review)=> review._id.toString()!== reviewId.toString());
                                
  let sum=0;
  reviews.forEach((review)=>{
   sum +=review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0 ;
  const numReviews = reviews.length;

  await Product.findByIdAndUpdate(productId, {reviews ,ratings, numReviews}, {new:true});

  res.status(200).json({
    success:true,
    message:"review deleted successfully"
  })
}
