import Header from "../components/Header.jsx";
import { Link, router } from "@inertiajs/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Anchor, Badge, Group, Table, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";
import SupplierModal from "../components/SupplierModal.jsx";
export default function Suppliers({ suppliers }) {
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    if (!suppliers) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch suppliers
            </div>
        );
    }
    const handleDelete = (id) => {
        router.delete(`/suppliers/${id}`, {
            onSuccess: () => {
                router.reload();
            },
            onError: () => {
                console.log("failed to delete supplier");
            },
        });
    };
    const openModal = (supplier = null) => {
        setSelectedSupplier(supplier);
        open();
    };

    const Suppliers = suppliers.data.map((supplier) => (
        <Table.Tr key={supplier.id}>
            <Table.Td>
                <Group gap="sm">
                    <Text fz="sm" fw={500}>
                        {supplier.name}
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {supplier.email}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{supplier.address}</Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => openModal(supplier)}
                    >
                        <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(supplier.id)}
                    >
                        <IconTrash size={16} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <Header name="Suppliers" />
                <Button
                    variant="default"
                    onClick={() => {
                        setSelectedSupplier(null);
                        open();
                    }}
                >
                    <IconCirclePlus className="w-5 h-5 mr-2 !text-gray-200" />
                    Add Supplier
                </Button>
            </div>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Supplier</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Address</Table.Th>
                            <Table.Th />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{Suppliers}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <div className="py-12 px-4">
                {suppliers.links.map((link) =>
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
            <SupplierModal
                isOpen={opened}
                onClose={close}
                supplier={selectedSupplier}
            />
        </>
    );
}
