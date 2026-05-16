import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      required: [true, "Slug is required"],
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default:""
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
