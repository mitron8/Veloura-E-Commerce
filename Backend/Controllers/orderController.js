import Order from "../models/Orders.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body)

    res.status(201).json({
      message: "Order confirmed",
      order
    })

  } catch (err) {
    res.status(500).json({
      message: "Error creating order",
      err
    })
  }
}