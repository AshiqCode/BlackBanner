import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = ({ setIsAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const AddProductHandle = () => {
    if (productName && price && description && image && category) {
      const product = {
        Name: productName,
        price: price,
        Description: description,
        Category: category,
        image: image,
      };
      fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(product),
      });
      setProductName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      toast.success("Product Added");
    } else {
      toast.error("Fill All Inputs");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto p-6 flex items-center justify-center">
      <main className="w-full max-w-5xl bg-white rounded shadow-lg flex flex-col md:flex-row gap-8 p-6">
        {/* Form */}
        <div className="flex-1">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl font-medium text-gray-700">
              Add Product
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                placeholder="Enter product name"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter price"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                placeholder="Image URL"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Enter product description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="books">Books</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={AddProductHandle}
              className="w-full rounded bg-[#f0c14b] py-2 text-sm font-medium text-black border border-[#a88734] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[#eeb933] active:bg-[#e6ac2c] transition-colors mt-4"
            >
              Add Product
            </button>
            <button
              onClick={() => {
                setIsAddProduct(false);
              }}
              className="w-full rounded bg-[#f0c14b] py-2 text-sm font-medium text-black border border-[#a88734] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[#eeb933] active:bg-[#e6ac2c] transition-colors mt-4"
            >
              Close
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex-1 bg-gray-50 p-6 rounded shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">Instructions & Tips</h2>
          <p className="text-gray-700 mb-2">
            Fill out all the product details carefully. Ensure the price is
            accurate and provide a clear description. Select the correct
            category to help users find your product easily.
          </p>
          <p className="text-gray-700">
            After submitting, the product will appear in your dashboard and can
            be edited or removed anytime. Make sure your information is complete
            to maintain a professional store appearance.
          </p>

          <h1 className="text-6xl font-semibold tracking-tight select-none text-center mt-10">
            Black<span className="text-yellow-500"> Banner</span>
          </h1>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
