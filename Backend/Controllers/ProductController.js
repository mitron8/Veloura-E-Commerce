import Product from "../models/product.js";


export const createProduct=async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.json({message:"product created",product})

    }
    catch(err){
        res.status(500).json({message:"server error",err})
        console.log(err.message)

    }

}

//get all product
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query; // ✅ FIX 1

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" }; // ✅ FIX 2
    }

    const products = await Product.find(filter).sort({ createdAt: -1 }); // ✅ FIX 3

    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error", err });
  }
};

//update a product
export const updateProduct=async(req,res)=>{
    try{
        const updated=await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
        )
        res.json({message:"updated successfully",
            updated
        })
    }
    catch(err){
        res.status(500).json({message:"server error",err})

    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        console.log("product deleted");

        res.status(200).json({
            message: "item deleted",
            product: deleted
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
};