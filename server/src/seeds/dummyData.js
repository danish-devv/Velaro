import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import dotenv from "dotenv";
dotenv.config();

const dummyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await categoryModel.deleteMany({});
    await productModel.deleteMany({});

    const categories = [
      {
        name: "Laptops",
        slug: "laptops",
        description:
          "High-performance laptops for work, gaming, and everyday use.",
        image:
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Smartphones",
        slug: "smartphones",
        description:
          "Latest smartphones with cutting-edge features and displays.",
        image:
          "https://images.unsplash.com/photo-1672413514634-4781b15fd89e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U21hcnRwaG9uZXN8ZW58MHx8MHx8fDA%3",
      },
      {
        name: "Audio",
        slug: "audio",
        description:
          "Premium headphones, earbuds, and speakers for every listener.",
        image:
          "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Accessories",
        slug: "accessories",
        description:
          "Must-have gadget accessories to complement your tech setup.",
        image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3",
      },
    ];

    const createCategories = await categoryModel.insertMany(categories);

    const laptops = createCategories.find((c) => c.slug === "laptops");
    const smartphones = createCategories.find((c) => c.slug === "smartphones");
    const audio = createCategories.find((c) => c.slug === "audio");
    const accessories = createCategories.find((c) => c.slug === "accessories");

    const products = [
      // Laptops
      {
        title: "MacBook Pro 14",
        description:
          "Apple M3 Pro chip, 18GB RAM, 512GB SSD. Perfect for developers and creators.",
        price: 1999,
        slug: "macbook-pro-14",
        stock: 15,
        images: ["https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFjQm9vayUyMFBybyUyMDE0fGVufDB8fDB8fHw"],
        category: laptops._id,
      },
      {
        title: "Dell XPS 15",
        description:
          "Intel Core i7, 16GB RAM, 4K OLED display. A powerhouse for professionals.",
        price: 1599,
        slug: "dell-xps-15",
        stock: 20,
        images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVsbCUyMFhQUyUyMDE1fGVufDB8fDB8fHw"],
        category: laptops._id,
      },
      {
        title: "Lenovo ThinkPad X1 Carbon",
        description:
          "Ultra-lightweight business laptop with 12th Gen Intel Core and military-grade durability.",
        price: 1399,
        slug: "thinkpad-x1-carbon",
        stock: 18,
        images: ["https://images.unsplash.com/photo-1760999187614-7a3b22a077d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVub3ZvJTIwVGhpbmtQYWQlMjBYMSUyMENhcmJvbnxlbnwwfHwwfHx8MA%3D%3"],
        category: laptops._id,
      },
      {
        title: "ASUS ROG Zephyrus G14",
        description:
          "AMD Ryzen 9, RTX 4060, 165Hz display. The ultimate compact gaming laptop.",
        price: 1299,
        slug: "asus-rog-zephyrus-g14",
        stock: 12,
        images: ["https://images.unsplash.com/photo-1771014846919-3a1cf73aeea1?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3"],
        category: laptops._id,
      },

      // Smartphones
      {
        title: "iPhone 15 Pro",
        description:
          "A17 Pro chip, titanium build, 48MP camera system. Apple's finest.",
        price: 1099,
        slug: "iphone-15-pro",
        stock: 30,
        images: ["https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aVBob25lJTIwMTUlMjBQcm98ZW58MHx8MHx8fDA%3"],
        category: smartphones._id,
      },
      {
        title: "Samsung Galaxy S24 Ultra",
        description:
          "200MP camera, built-in S Pen, Snapdragon 8 Gen 3. Android at its peak.",
        price: 1299,
        slug: "samsung-galaxy-s24-ultra",
        stock: 25,
        images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyNCUyMFVsdHJhfGVufDB8fDB8fHww"],
        category: smartphones._id,
      },
      {
        title: "Google Pixel 8 Pro",
        description:
          "Google Tensor G3, best-in-class AI photography, 7 years of OS updates.",
        price: 999,
        slug: "google-pixel-8-pro",
        stock: 22,
        images: ["https://images.unsplash.com/photo-1697355360151-2866de32ad4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R29vZ2xlJTIwUGl4ZWwlMjA4JTIwUHJvfGVufDB8fDB8fHww"],
        category: smartphones._id,
      },
      {
        title: "OnePlus 12",
        description:
          "Snapdragon 8 Gen 3, 100W fast charging, Hasselblad-tuned cameras.",
        price: 799,
        slug: "oneplus-12",
        stock: 28,
        images: ["https://images.unsplash.com/photo-1772683828844-15dca7c553b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE9uZVBsdXMlMjAxMnxlbnwwfHwwfHx8MA%3D%3D"],
        category: smartphones._id,
      },

      // Audio
      {
        title: "Sony WH-1000XM5",
        description:
          "Industry-leading noise cancellation, 30-hour battery, crystal-clear call quality.",
        price: 349,
        slug: "sony-wh-1000xm5",
        stock: 40,
        images: ["https://images.unsplash.com/photo-1660631228116-b3643559f611?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWljfGVufDB8fDB8fHww"],
        category: audio._id,
      },
      {
        title: "Apple AirPods Pro 2",
        description:
          "Adaptive transparency, personalized spatial audio, and USB-C charging.",
        price: 249,
        slug: "airpods-pro-2",
        stock: 50,
        images: ["https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXBwbGUlMjBBaXJQb2RzJTIwUHJvJTIwMnxlbnwwfHwwfHx8MA%3D%3D"],
        category: audio._id,
      },
      {
        title: "Bose QuietComfort 45",
        description:
          "World-class noise cancellation with crisp, balanced audio for all-day wear.",
        price: 279,
        slug: "bose-qc-45",
        stock: 35,
        images: ["https://images.unsplash.com/photo-1674658556545-f18d4080ab6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Qm9zZSUyMFF1aWV0Q29tZm9ydCUyMDQ1fGVufDB8fDB8fHww"],
        category: audio._id,
      },
      {
        title: "JBL Charge 5",
        description:
          "Portable Bluetooth speaker with powerful sound, IP67 waterproof, and powerbank feature.",
        price: 179,
        slug: "jbl-charge-5",
        stock: 60,
        images: ["https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SkJMfGVufDB8fDB8fHww"],
        category: audio._id,
      },

      // Accessories
      {
        title: "Anker 65W GaN Charger",
        description:
          "Compact 3-port GaN charger. Charge your laptop, phone, and tablet simultaneously.",
        price: 49,
        slug: "anker-65w-gan-charger",
        stock: 80,
        images: ["https://images.unsplash.com/photo-1596877445530-ad74838754c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QW5rZXIlMjA2NVclMjBHYU4lMjBDaGFyZ2VyfGVufDB8fDB8fHww"],
        category: accessories._id,
      },
      {
        title: "Logitech MX Master 3S",
        description:
          "8K DPI precision mouse with quiet clicks, ergonomic design, and multi-device support.",
        price: 99,
        slug: "logitech-mx-master-3s",
        stock: 45,
        images: ["https://images.unsplash.com/photo-1739742473235-34a7bd9b8f87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TG9naXRlY2glMjBNWCUyME1hc3RlciUyMDNTfGVufDB8fDB8fHww"],
        category: accessories._id,
      },
      {
        title: "Samsung 980 Pro 1TB SSD",
        description:
          "PCIe 4.0 NVMe SSD with 7000MB/s read speeds. Ideal for gaming and heavy workloads.",
        price: 129,
        slug: "samsung-980-pro-1tb",
        stock: 55,
        images: ["https://images.unsplash.com/photo-1628557118391-56cd62c9f2cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMHNzZHxlbnwwfHwwfHx8MA%3D%3D"],
        category: accessories._id,
      },
      {
        title: "Keychron K2 Mechanical Keyboard",
        description:
          "Compact wireless mechanical keyboard with RGB backlight and Mac/Windows support.",
        price: 89,
        slug: "keychron-k2",
        stock: 38,
        images: ["https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S2V5Y2hyb24lMjBLMiUyME1lY2hhbmljYWwlMjBLZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D"],
        category: accessories._id,
      },
    ];

    await productModel.create(products);
    console.log("✅ Dummy data created — 4 categories, 16 products");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dummyData();
