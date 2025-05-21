import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import { Input } from "@mantine/core";
import { Modal } from "@mantine/core";
export default function SupplierModal({ isOpen, onClose, supplier }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        if (supplier) {
            setFormData({
                name: supplier.name,
                email: supplier.email,
                address: supplier.address,
            });
        } else {
            setFormData({
                name: "",
                email: "",
                address: "",
            });
        }
    }, [supplier]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("address", formData.address);
        if (supplier?.id) {
            data.append("_method", "PUT");
            router.post(`/suppliers/${supplier.id}`, data, {
                onSuccess: () => {
                    onClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(
                        errors.message || "Failed to submit supplier",
                    );
                },
            });
        } else {
            router.post("/suppliers", data, {
                onSuccess: () => {
                    onClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(
                        errors.message || "Failed to submit supplier",
                    );
                },
            });
        }
    };

    return (
        <Modal opened={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="mt-5">
                <label htmlFor="name">Name</label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Joe Doe"
                    className="block w-full mb-2 p-2"
                    required
                />
                <label htmlFor="email">Email</label>
                <Input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@exemple.com"
                    className="block w-full mb-2 p-2"
                    required
                />
                <label htmlFor="address">Address</label>
                <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 ST AV ..."
                    className="block w-full mb-2 p-2"
                    required
                />
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
