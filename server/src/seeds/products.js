import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import dotenv from "dotenv";
dotenv.config();

const dummyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const isCategoryExist = await categoryModel.deleteMany({});
    const isProductsExist = await productModel.deleteMany({});

    const categories = [
      {
        name: "Electronics",
        slug: "electronics",
        description: "This is the description for Electronics category",
      },
      {
        name: "Mens",
        slug: "mens",
        description: "This is the description for men's wear category",
      },
      {
        name: "Womens",
        slug: "womens",
        description: "This is the description for womens wear category",
      },
      {
        name: "kids",
        slug: "kids",
        description: "This is the description for kids wear category",
      },
    ];
    const createCategories = await categoryModel.insertMany(categories);
    const electronics = createCategories.find((c) => {
      return c.slug === "electronics";
    });
    const mens = createCategories.find((c) => {
      return c.slug === "mens";
    });
    const Womens = createCategories.find((c) => {
      return c.slug === "womens";
    });
    const kids = createCategories.find((c) => {
      return c.slug === "kids";
    });

    const products = [
      {
        title: "washing-machine",
        description:
          "This is a top notch washing machine.You should must buy it",
        price: 43,
        slug: "washing-machine",
        stock: 10,
        category: electronics._id,
      },
      {
        title: "laptop",
        description: "This is a top notch laptop.You should must buy it",
        price: 50,
        slug: "laptop",
        stock: 20,
        category: electronics._id,
      },
      {
        title: "Mens Shirt",
        description: "This is a top notch mens shirt.You should must buy it",
        price: 4,
        slug: "shirts",
        stock: 50,
        category: mens._id,
      },
      {
        title: "Mens'pants",
        description: "This is a top notch mens pant.You should must buy it",
        price: 60,
        slug: "pants",
        stock: 35,
        category: mens._id,
      },
      {
        title: "womens bag",
        description: "This is a top notch womens bag.You should must buy it",
        price: 70,
        slug: "bag",
        stock: 15,
        category: Womens._id,
      },
      {
        title: "womens shirt",
        description: "This is a top notch womens shirt.You should must buy it",
        price: 90,
        slug: "womensshirts",
        stock: 13,
        category: Womens._id,
      },
      {
        title: "kids shirt",
        description: "This is a top notch kids shirt.You should must buy it",
        price: 123,
        slug: "kids-shirt",
        stock: 90,
        category: kids._id,
      },
      {
        title: "kids pants",
        description: "This is a top notch kids pant.You should must buy it",
        price: 293,
        slug: "kids-pants",
        stock: 110,
        category: kids._id,
      },
    ];
    const createProducts = await productModel.create(products);
    console.log("dummy data created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dummyData();
