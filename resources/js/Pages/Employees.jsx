import Header from "../components/Header.jsx";
import { Link, router, useForm } from "@inertiajs/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { IconCirclePlus } from "@tabler/icons-react";
import Modal from "../components/EmployeeModal.jsx";
import { useState } from "react";
export default function Employees({ employees }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const openModal = (employee = null) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };
    if (!employees) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch employees
            </div>
        );
    }
    const handleDelete = (id) => {
        router.delete(`/employees/${id}`, {
            onSuccess: () => {
                router.reload();
            },
            onError: () => {
                console.log("failed to delete employee");
            },
        });
    };
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <Header name="Employees" />
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                    onClick={() => openModal()}
                >
                    <IconCirclePlus className="w-5 h-5 mr-2 !text-gray-200" />
                    Add Employee
                </button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.data.map((employee) => (
                            <TableRow
                                key={employee.id}
                                onChange={(e) => setemployeeId(e.target.key)}
                            >
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.address}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => openModal(employee)}
                                        variant="contained"
                                    >
                                        Update
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleDelete(employee.id)
                                        }
                                        variant="contained"
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="py-12 px-4">
                {employees.links.map((link) =>
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
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                employee={selectedEmployee}
            />
        </>
    );
}
