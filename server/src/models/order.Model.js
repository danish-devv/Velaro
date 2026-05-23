import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      phoneNo: { type: String, required: true },
      address: { type: String, required: true },
    },

    payment: {
      method: {
        type: String,
        enum: ["COD", "CARD", "STRIPE"],
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
      transactionId: {
        type: String,
        default: null,
      },
    },

    pricing: {
      itemsPrice: { type: Number, required: true },
      shippingFee: { type: Number, default: 0 },
      discountPrice: { type: Number, default: 0 },
      totalPrice: { type: Number, required: true },
    },

    status: {
      type: String,
      enum: [
        "processing",
        "shipped",
        "out for delivery",
        "delivered",
        "cancelled",
      ],
      default: "processing",
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel
