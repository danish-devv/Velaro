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

        // image: {
        //   type: String,
        //   required: true,
        // },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      phoneNo: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    payment: {
      method: {
        type: String,
        enum: ["COD", "CARD", "STRIPE"],
        required: true,
      },

      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },

      transactionId: {
        type: String,
        default: null,
      },
    },

    pricing: {
      itemsPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      shippingFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      discountPrice: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
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
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
