import Address from "../models/Address.js";
export const saveAddress=async (req,res)=>{
    //save address
    try{
        const address=await Address.create(req.body)
        res.status(200).json({message:"Address saved ",address})
    }
    catch(err){
        res.status(500).json({message:"Error saving address",err})
    }
}
//get address by userId
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId })

    res.status(200).json(addresses) // ✅ THIS WAS MISSING

  } catch (err) {
    res.status(500).json({ message: "Error getting the address", err })
  }
}