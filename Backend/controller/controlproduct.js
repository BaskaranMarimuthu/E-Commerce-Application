 
import Product from '../models/productmodels.js'
 export const addProducts = async(req, res) => {
    // console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    })
 }
 export const getAllProducts = (req, res) => {
     return res.status(200).json({msg:"fetch all products"  });
};

 
export const getOneProduct = (req, res) => {
     return res.status(200).json({msg:"your app is running at 2nd product"  });
};