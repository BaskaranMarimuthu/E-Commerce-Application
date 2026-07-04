import HandleError from "../handler/errorclass.js";
import Order from "../models/orderModels.js";
import Product from "../models/productmodels.js";

//Create order
export const createNewOrder = async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    productPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingAddress,
    orderItems,
    paymentInfo,
    productPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

// get one order
export const placeFirstOrder = async (req, res, next) => {
  // console.log(req.params.id);
  const Id = req.params.id;
  const order = await Order.findById(Id ).populate("user", "name email");
  if (!order) {
    // res.status(500).json({ success:false,msg:" product not found"  });
  return next(new HandleError("order is not ordered", 404));
  }
  
  return res
      .status(200)
      .json({ success: true, msg: "your order is placed succesfully", order });
};


//get all orders

export const getAllOrder = async (req, res, next) => {
  
  const order = await Order.find({user:req.user._id});
  if (!order) {
    // res.status(500).json({ success:false,msg:" product not found"  });
  return next(new HandleError("order is not ordered", 404));
  }
  
  return res
      .status(200)
      .json({ success: true, msg: "these are the orders of the user", order });
};

//get all orders by admin

export const getAllOrderByAdmin = async (req, res, next)=>{
    const order = await Order.find().populate("user", "name email");
  if (!order) {
           return next(new HandleError("order is not ordered", 404));
  }
  let totalAmount=0;
  let numberOfOrders=0;
   order.forEach((order)=> {
    totalAmount+=order.totalPrice+order.taxPrice;
    return numberOfOrders++;
  });
  return res
      .status(200)
      .json({ success: true, msg: "these are the orders of the user", order ,totalAmount,numberOfOrders});
};

//delete order by admin
export const deleteOrder = async(req, res, next)=>{
       
  const order = await Order.findById(req.params.id);
  if (!order) {
  return next(new HandleError("order is not ordered", 404));
  }

  if(order.orderStatus!=='Delivered'){
  return next(new HandleError("order is processing you can't delete", 400));
   }

   Order.deleteOne({_id:req.params.id});
    return res
      .status(200)
      .json({ success: true, msg: "order deleted successfully"});
}

//order update status

export const updateStatus = async(req, res, next)=>{
       
  const order = await Order.findById(req.params.id);
  if (!order) {
  return next(new HandleError("order is not ordered", 404));
  }

  if(order.orderStatus==='Delivered'){
  return next(new HandleError("This order is already delivered", 400));
   }
  //update stock

await Promise.all(order.orderItems.map((item)=>updateQuantity(item.product, item.quantity)));

   order.orderStatus = req.body.status;
   if(order.orderStatus ==='delivered'){
    order.deliveredAt = Date.now();
   }
   await order.save({validateBeforeSave:false});
   res.status(200).json({ success: true, order});
};

async function updateQuantity(id, quantity){
  const product = await Product.findById(id);
  if (!product) {
  return (new HandleError("Product is not found"));
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave:false})
}



