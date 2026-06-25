import { useEffect, useState } from "react";
import createProduct from "../../api/CreateProductApi.js";
import { getCategories } from "../../api/productApi.js";

const CreateProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    slug: "",
    category: "",
    stock: "",
    isActive: true,
    isFeatured: false,
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.categories || response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setForm((prev) => ({ ...prev, title, slug }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.slug || !form.category || !form.price) {
      setError("Title, slug, category, and price are required fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("slug", form.slug);
      formData.append("category", form.category);
      formData.append("stock", form.stock);
      formData.append("isActive", form.isActive);
      formData.append("isFeatured", form.isFeatured);

      images.forEach((image) => {
        formData.append("images", image);
      });

      await createProduct(formData);

      setSuccess("Product created successfully!");

      setForm({
        title: "",
        description: "",
        price: "",
        slug: "",
        category: "",
        stock: "",
        isActive: true,
        isFeatured: false,
      });
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">
            Products
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. Wireless Headphones"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ "--tw-ring-color": "#7A72FF" }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Slug <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
                  /
                </span>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="wireless-headphones"
                  className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none transition font-mono"
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "")}
                  required
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                Auto-generated from title. You can edit it manually.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed description of the product..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none resize-none transition"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price ($) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none transition"
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none transition"
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none transition"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
                required
              >
                <option value="" className="text-gray-400">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Images <span className="text-red-400">*</span>
              </label>
              <label
                htmlFor="product-images"
                className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-[#7A72FF] hover:bg-[#7A72FF08] transition group"
              >
                <svg
                  className="w-8 h-8 text-gray-300 group-hover:text-[#7A72FF] transition mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-400 group-hover:text-[#7A72FF] transition">
                  Click to upload product images
                </span>
                <span className="text-xs text-gray-300 mt-0.5">
                  PNG, JPG up to 5MB (Multiple items allowed)
                </span>
                <input
                  id="product-images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagesChange}
                  required={images.length === 0}
                />
              </label>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1.5 right-1.5 bg-white/90 rounded-full p-1 shadow backdrop-blur-sm hover:bg-red-50 transition"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-gray-500 hover:text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">Active</p>
                  <p className="text-xs text-gray-400">
                    Inactive products won't show up in the marketplace catalog
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    form.isActive ? "bg-[#7A72FF]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      form.isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Featured Product
                  </p>
                  <p className="text-xs text-gray-400">
                    Promote this item on the homepage or landing banners
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      isFeatured: !prev.isFeatured,
                    }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    form.isFeatured ? "bg-[#7A72FF]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      form.isFeatured ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#7A72FF" }}
              onMouseEnter={(e) => !loading && (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
