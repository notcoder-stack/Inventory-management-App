import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import { Input } from "@mantine/core";
import { Modal } from "@mantine/core";
export default function ProductModal({ isOpen, onClose, product }) {
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

    return (
        <Modal opened={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="mt-5">
                <label htmlFor="name">Product Name</label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="block w-full mb-2 p-2"
                    required
                />
                <label htmlFor="price">Price</label>
                <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="block w-full mb-2 p-2"
                    required
                />
                <label htmlFor="stockQuantity">Stock Quantity</label>
                <Input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    placeholder="Stock Quantity"
                    className="block w-full mb-2 p-2"
                    required
                />
                <label htmlFor="rating">Rating</label>
                <Input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Rating"
                    className="block w-full mb-2 p-2"
                    required
                />
                <label htmlFor="image">Image</label>
                <Input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="block w-full mb-2 p-2"
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
                <Button
                    variant="default"
                    type="submit"
                    className="mt-4 px-4 py-2"
                >
                    Submit
                </Button>
            </form>
        </Modal>
    );
}
