import { useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Loading from "./Loading";
import { toast } from "react-toastify";
// import AddProduct from "./AddProduct";/
const Products = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [id, setID] = useState("");
  const [isAddProduct, setIsAddProduct] = useState(false);
  const { data, setData, Ispending } = useFetch(
    "http://localhost:3000/products"
  );
  const editHandle = (product) => {
    setIsEdit(true);
    setProductName(product.Name);
    setPrice(product.price);
    setDescription(product.Description);
    setImage(product.image);
    setCategory(product.Category);
    setID(product.id);

    // console.log(productName);
  };
  const saveEdits = () => {
    if (isEdit) {
      const editedProduct = {
        Name: productName,
        price: price,
        Description: description,
        image: image,
        Category: category,
        id: id,
      };

      // console.log(id);
      // console.log(editedProduct.id);
      fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(editedProduct),
      });
      const newArray = data.map((product) => {
        if (id === product.id) {
          return editedProduct;
        } else {
          return product;
        }
      });
      setData(newArray);
      setIsEdit(false);
      toast.success("Product Edited");
      setProductName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
      setID("");
    } else {
      const newProduct = {
        Name: productName,
        price: price,
        Description: description,
        image: image,
        Category: category,
      };
      // console.log(newProduct);

      fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((json) => {
          setData((prev) => [...prev, json]);
          setProductName("");
          setPrice("");
          setDescription("");
          setImage("");
          setCategory("");
          setID("");
          setIsAddProduct(false);
        });
    }
  };

  const deleteHandle = (id) => {
    const confirm = window.confirm("delete Product");
    if (confirm) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      setData(
        data.filter((e) => {
          return e.id !== id;
        })
      );
      toast.success("Product Deleted");
      // console.log(id);
    }
  };

  const cancelHandle = () => {
    setIsEdit(false);
    setIsAddProduct(false);
    setProductName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategory("");
    setID("");
  };

  // console.log(data);

  return (
    <div className="flex-1 p-6">
      {/* Dashboard Content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <div className="mb-6 flex items-center justify-between">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>

          {/* Add Product Button */}
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg
               shadow hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2
               focus:ring-blue-400 active:scale-95 transition-all duration-200"
            onClick={() => {
              setIsAddProduct(true);
              // console.log(isAddProduct);
            }}
          >
            Add Product
          </button>
        </div>

        {Ispending && <Loading />}
        {/* {isAddProduct && (
          <AddProduct setIsAddProduct={setIsAddProduct} setData={setData} />
        )} */}
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.Name}
                className="w-full h-48 object-center rounded-t-xl"
              />

              {/* Product Details */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.Name}
                </h3>
                <p className="text-gray-700 font-medium">${product.price}</p>
                <p className="text-gray-600 text-sm">{product.Description}</p>
                <span className="text-yellow-500 font-semibold mt-auto">
                  {product.Category}
                </span>
              </div>

              {/* Optional Actions */}
              <div className="px-4 pb-4 flex gap-2 mt-auto">
                <button
                  onClick={() => {
                    editHandle(product);
                  }}
                  className="flex-1 py-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded shadow transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteHandle(product.id);
                  }}
                  className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-400 text-white rounded shadow transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Overlay */}
        </div>
        {(isEdit || isAddProduct) && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            {/* Form Container */}
            <div className="bg-white w-1/3 max-w-2xl p-8 rounded-xl shadow-lg relative">
              {/* Logo + Title */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl font-medium text-gray-700">
                  {isAddProduct ? "Add Produce" : "Edit Product"}
                </span>
              </div>

              {/* Form */}
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
                <div className="flex justify-center gap-6 mt-4">
                  <button
                    onClick={saveEdits}
                    className="w-32 rounded bg-[#f0c14b] py-2 text-sm font-medium text-black border border-[#a88734] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[#eeb933] active:bg-[#e6ac2c] transition-colors"
                  >
                    {isAddProduct ? "Add" : "Save   Edit"}
                  </button>

                  <button
                    onClick={cancelHandle}
                    className="w-32 rounded bg-[#f0c14b] py-2 text-sm font-medium text-black border border-[#a88734] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[#eeb933] active:bg-[#e6ac2c] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
