import { useState } from "react";
import createCategory from "../../api/CreateCategoryApi.js";

export default function CreateCategory() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setForm((prev) => ({ ...prev, name, slug }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.slug) {
      setError("Name and slug are required.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("isActive", form.isActive);
      if (imageFile) formData.append("image", imageFile);

      await createCategory(formData);
      setSuccess("Category created successfully!");
      setForm({ name: "", slug: "", description: "", isActive: true });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">
            Categories
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
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

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. Men's Clothing"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ "--tw-ring-color": "#7A72FF" }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
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
                  placeholder="mens-clothing"
                  className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none transition font-mono"
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "")}
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                Auto-generated from name. You can edit it manually.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of this category..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none resize-none transition"
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #7A72FF33")
                }
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Image
              </label>
              {!imagePreview ? (
                <label
                  htmlFor="category-image"
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
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-300 mt-0.5">
                    PNG, JPG up to 5MB
                  </span>
                  <input
                    id="category-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 transition"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500 hover:text-red-500"
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
              )}
            </div>

            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Active</p>
                <p className="text-xs text-gray-400">
                  Inactive categories won't appear in the store
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

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#7A72FF" }}
              onMouseEnter={(e) => !loading && (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
