import mongoose from "mongoose";
import Product from "./models/product.js";

const MONGO_URI = "mongodb+srv://ankursah1230_db_user:uNEe2N0o89PEJWmf@yt-complete-backend.0xvs7vp.mongodb.net/ecom";

const productsData = [
  {
    title: "ASUS TUF A15",
    category: "laptop",
    price: 75000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    title: "Dell Inspiron 15",
    category: "laptop",
    price: 65000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  },
  {
    title: "iPhone 14",
    category: "mobile",
    price: 80000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    title: "Samsung Galaxy S23",
    category: "mobile",
    price: 70000,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
  },
  {
    title: "iPad Air",
    category: "tablet",
    price: 60000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
  },
  {
    title: "Samsung Galaxy Tab",
    category: "tablet",
    price: 40000,
    image: "https://images.unsplash.com/photo-1587614382346-ac0c7b64c3e8"
  },
  {
    title: "Bluetooth Headphones",
    category: "electronics",
    price: 3000,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"
  },
  {
    title: "Smart Watch",
    category: "electronics",
    price: 5000,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
  },
  {
    title: "Men T-Shirt",
    category: "fashion",
    price: 999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    title: "Women Dress",
    category: "fashion",
    price: 1999,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
  }
];

// generate 100 products from base data
const generateProducts = (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const item = productsData[Math.floor(Math.random() * productsData.length)];

    products.push({
      title: item.title,
      description: "High quality product with best features",
      price: item.price + Math.floor(Math.random() * 2000),
      category: item.category,
      image: item.image,
      stock: Math.floor(Math.random() * 50) + 1,
    });
  }

  return products;
};

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany();

    const products = generateProducts(100);
    await Product.insertMany(products);

    console.log("✅ 100 Realistic Products Inserted");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();