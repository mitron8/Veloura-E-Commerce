import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        price: Number
      }
    ],

    address: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      pincode: String
    },

    totalAmount: {
      type: Number,
      required: true
    },

    orderStatus: {
      type: String,
      default: "Pending"
    }

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;