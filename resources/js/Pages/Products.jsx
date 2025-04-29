import { useState } from "react";
import Header from "../components/Header.jsx";
import {
    IconCirclePlus,
    IconEdit,
    IconSearch,
    IconTrash,
} from "@tabler/icons-react";
import Rating from "../components/Rating.jsx";
import Modal from "../components/ProductModal.jsx";
import { Link, router } from "@inertiajs/react";
import { Button } from "@mui/material";
export default function Products({ products }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const openModal = (product = null) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    if (!products) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch products
            </div>
        );
    }
    const handleDelete = (id) => {
        router.delete(`/products/${id}`, {
            onSuccess: () => {
                router.reload();
            },
            onError: () => {
                console.log("failed to delete product");
            },
        });
    };
    return (
        <div className="mx-auto pb-5 w-full">
            {/* Search Bar */}
            <div className="mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded">
                    <IconSearch className="w-5 h-5 text-gray-500 m-2" />
                    <input
                        className="w-full py-2 px-4 rounded bg-white"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {/* Header Bar */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Products" />
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                    onClick={() => openModal()}
                >
                    <IconCirclePlus className="w-5 h-5 mr-2 !text-gray-200" />
                    Create Product
                </button>
            </div>
            {/* Products List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {products.data.map((product) => (
                    <div
                        key={product.id}
                        className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: 120 }}
                            />
                            <h3 className="text-lg text-gray-900 font-sembold">
                                {product.name}
                            </h3>
                            <p className="text-gray-800">
                                ${product.price.toFixed(2)}
                            </p>
                            <div className="text-sm text-gray-600 mt-1">
                                Stock: {product.stockQuantity}
                            </div>
                            {product.rating && (
                                <div className="flex items-center mt-2">
                                    <Rating rating={product.rating} />
                                </div>
                            )}
                            <div className="items-inline mt-6 flex justify-between gap-4">
                                <Button
                                    variant="contained"
                                    onClick={() => openModal(product)}
                                >
                                    <IconEdit />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <IconTrash />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="py-12 px-4">
                {products.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`p-1 mx-1 ${link.active ? "text-blue-500 font-bold" : ""}`}
                        />
                    ) : (
                        <span
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="p-1 mx-1 text-slate-300"
                        ></span>
                    ),
                )}
            </div>
            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
}
