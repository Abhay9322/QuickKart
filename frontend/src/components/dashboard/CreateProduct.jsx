import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const [quantityValue, setQuantityValue] = useState("");
    const [quantityUnit, setQuantityUnit] = useState("kg");

    const [categoryID, setCategoryID] = useState("");
    const [featured, setFeatured] = useState(false);

    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !title ||
            !description ||
            !price ||
            !stock ||
            !quantityValue ||
            !categoryID ||
            images.length === 0
        ) {
            return alert("Please fill all fields");
        }

        try {
            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("featured", featured);

            formData.append("quantity[value]", quantityValue);
            formData.append("quantity[unit]", quantityUnit);

            formData.append("categoryID", categoryID);

            images.forEach((image) => {
                formData.append("images", image);
            });

            const response = await axios.post(
                "http://localhost:5000/api/v1/products",
                formData,
                {
                    withCredentials: true,
                }
            );

            alert("Product Created Successfully");

            console.log(response.data);

            // Reset Form
            setTitle("");
            setDescription("");
            setPrice("");
            setStock("");
            setQuantityValue("");
            setQuantityUnit("kg");
            setCategoryID("");
            setFeatured(false);
            setImages([]);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
            >
                <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
                    Create Product
                </h1>

                <div className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-medium text-slate-700">
                            Product Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter product title"
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-black bg-white"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 font-medium text-slate-700">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-black bg-white"
                        />
                    </div>

                    {/* Price & Stock */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium text-slate-700">
                                Price
                            </label>

                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-black bg-white"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">
                                Stock
                            </label>

                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Enter stock"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-black bg-white"
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium text-slate-700">
                                Quantity Value
                            </label>

                            <input
                                type="number"
                                value={quantityValue}
                                onChange={(e) => setQuantityValue(e.target.value)}
                                placeholder="Enter quantity"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-black bg-white"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-slate-700">
                                Quantity Unit
                            </label>

                            <select
                                value={quantityUnit}
                                onChange={(e) => setQuantityUnit(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-black bg-white"
                            >
                                <option value="kg">Kg</option>
                                <option value="gram">Gram</option>
                                <option value="liter">Liter</option>
                                <option value="piece">Piece</option>
                            </select>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-2 font-medium text-slate-700">
                            Category ID
                        </label>

                        <input
                            type="text"
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                            placeholder="Enter Category MongoDB ID"
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-black bg-white"
                        />
                    </div>

                    {/* Featured */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="w-5 h-5"
                        />

                        <label className="font-medium text-slate-700">
                            Featured Product
                        </label>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block mb-2 font-medium text-slate-700">
                            Product Images
                        </label>

                        <input
                            type="file"
                            multiple
                            onChange={(e) =>
                                setImages(Array.from(e.target.files))
                            }
                            className="w-full border border-slate-300 rounded-lg p-3 bg-white text-black"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;