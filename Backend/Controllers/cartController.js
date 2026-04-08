import Cart from "../models/Cart.js";


// ➕ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // ✅ FIX 1: prevent undefined userId crash
    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "Invalid userId" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    // ✅ FIX 2: populate (THIS FIXES YOUR 500 ERROR)
    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.status(200).json({
      message: "Item added to cart",
      cart: updatedCart,
    });

  } catch (err) {
    console.log("ADD TO CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// ❌ REMOVE FROM CART
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();

    // ✅ FIX: populate
    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.status(200).json({
      message: "Item removed from cart",
      cart: updatedCart,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};



// 🔄 UPDATE QUANTITY
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    // ✅ FIX: populate
    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.status(200).json({
      message: "Quantity updated",
      cart: updatedCart,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};



// 📦 GET CART
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};