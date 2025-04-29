import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import { router, useForm } from "@inertiajs/react";
import { Form } from "react-router-dom";
export default function Modal({ isOpen, onClose, employee }) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        department: "",
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                address: employee.address,
                email: employee.email,
                department: employee.department,
            });
        } else {
            setFormData({
                name: "",
                address: "",
                email: "",
                department: "",
            });
        }
    }, [employee]);

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
        data.append("address", formData.address);
        data.append("email", formData.email);
        data.append("department", formData.department);
        if (employee?.id) {
            data.append("_method", "PUT");
            router.post(`/employees/${employee.id}`, data, {
                onSuccess: () => {
                    onClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(
                        errors.message || "Failed to submit employee",
                    );
                },
            });
        } else {
            router.post("/employees", data, {
                onSuccess: () => {
                    onClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(
                        errors.message || "Failed to submit employee",
                    );
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
                    {employee ? "Edit Employee" : "Add Employee"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="name" className={labelCssStyles}>
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Joe Doe"
                        className={inputCssStyles}
                        required
                    />
                    <label htmlFor="address" className={labelCssStyles}>
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 ST AV ..."
                        className={inputCssStyles}
                        required
                    />
                    <label htmlFor="email" className={labelCssStyles}>
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@exemple.com"
                        className={inputCssStyles}
                        required
                    />
                    <label htmlFor="department" className={labelCssStyles}>
                        Department
                    </label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="ex:Electronics"
                        className={inputCssStyles}
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {employee ? "Update" : "Create"}
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
