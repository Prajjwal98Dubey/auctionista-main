import { useState } from "react";
import { mapCategoriesToOptions } from "../helpers/mapCategoryFunc.js";
import InputCustom from "../components/InputCustom.jsx";
import { callAddProducts } from "../helpers/callAddProducts";
import { addProductImages } from "../firebase/firebase.storage.js";
import { useSelector } from "react-redux";

const paintingCommAttributes = [
  "title",
  "desc",
  "original_price",
  "set_price",
  "usage_time",
  "bid_start_time",
  "product_appeal",
  "bid_time",
];

const AddProduct = () => {
  const [selected, setSelected] = useState("");
  const [images, setImages] = useState([]);
  const newProductSelector = useSelector((state) => state.newProduct);
  const [uploadedImages, setUploadedImages] = useState([]);
  const handleAddProduct = async () => {
    try {
      let tmp = [];
      if (uploadedImages.length == 0) {
        tmp = await addProductImages(images);
        setUploadedImages(tmp);
      }
      await callAddProducts(
        selected,
        newProductSelector.productDetails,
        tmp.length ? tmp : uploadedImages
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...imageFiles]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Add New Product
          </h1>
          <p className="text-gray-600">
            Fill in the details to list your product for auction
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Category
            </label>
            <select
              defaultValue="no-select"
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="no-select" disabled>
                Choose a Category
              </option>
              <option value="painting">Painting</option>
              <option value="rear">A Rear Find</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="watch">Watch</option>
              <option value="monitor">Monitor</option>
              <option value="keyboard">KeyBoard</option>
              <option value="mouse">Mouse</option>
              <option value="headphone">Headphone</option>
              <option value="electronics">General Electronics</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 transition-colors">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300"
                  >
                    <span>Upload images</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.preview}
                      alt={`preview ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selected.toLowerCase() != "painting"
                ? [
                    ...mapCategoriesToOptions["common"],
                    ...mapCategoriesToOptions[selected],
                  ].map((feature, index) => (
                    <div key={index} className="relative">
                      <InputCustom feature={feature} />
                    </div>
                  ))
                : [
                    ...paintingCommAttributes,
                    ...mapCategoriesToOptions[selected],
                  ].map((feature, index) => (
                    <div key={index} className="relative">
                      <InputCustom feature={feature} />
                    </div>
                  ))}
            </div>
          )}

          {selected && (
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 transform hover:scale-[1.02]"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Need help? Contact our support team
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
