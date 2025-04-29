import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import { router, useForm } from "@inertiajs/react";
import { Form } from "react-router-dom";
export default function Modal({ isOpen, onClose, product }) {
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
        image: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                stockQuantity: product.stockQuantity,
                rating: product.rating,
                image: product.image || "",
            });
            setPreview(product.image || "");
            setSelectedFile(null);
        } else {
            setFormData({
                name: "",
                price: "",
                stockQuantity: "",
                rating: "",
                image: "",
            });
            setPreview("");
            setSelectedFile(null);
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("stockQuantity", formData.stockQuantity);
        data.append("rating", formData.rating);
        if (selectedFile) {
            data.append("image", selectedFile);
        }
        if (product?.id) {
            data.append("_method", "PUT");
            router.post(`/products/${product.id}`, data, {
                onSuccess: () => {
                    onClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Failed to submit product");
                },
            });
        } else {
            router.post("/products", data, {
                onSuccess: () => {
                    onClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors.message || "Failed to submit product");
                },
            });
        }
    };

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles =
        "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h2 className="text-lg font-semibold mb-4">
                    {product ? "Edit Product" : "Add Product"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="name" className={labelCssStyles}>
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={inputCssStyles}
                        required
                    />
                    <label htmlFor="price" className={labelCssStyles}>
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className={inputCssStyles}
                        required
                    />
                    <label htmlFor="stockQuantity" className={labelCssStyles}>
                        Stock Quantity
                    </label>
                    <input
                        type="number"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        placeholder="Stock Quantity"
                        className={inputCssStyles}
                        required
                    />
                    <label htmlFor="rating" className={labelCssStyles}>
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        className={inputCssStyles}
                        required
                    />
                    <label htmlFor="image" className={labelCssStyles}>
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className={inputCssStyles}
                        accept="image/*"
                    />
                    {preview && (
                        <div className="mb-3">
                            <p className="text-sm mb-1">Image Preview:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {product ? "Update" : "Create"}
                    </button>
                    <button
                        type="button"
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
