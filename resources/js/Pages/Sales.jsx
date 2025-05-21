import Header from "../components/Header.jsx";
import { Link, router } from "@inertiajs/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Anchor, Badge, Group, Table, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";
import SaleModal from "../components/SaleModal.jsx";
export default function Sales({ sales }) {
    const [selectedSale, setSelectedSale] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    if (!sales) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch sales
            </div>
        );
    }
    const handleDelete = (id) => {
        router.delete(`/sales/${id}`, {
            onSuccess: () => {
                router.reload();
            },
            onError: () => {
                console.log("failed to delete sale");
            },
        });
    };
    const openModal = (sale = null) => {
        setSelectedSale(sale);
        open();
    };

    const Sales = sales.data.map((sale) => (
        <Table.Tr key={sale.id}>
            <Table.Td>
                <Group gap="sm">
                    <Text fz="sm" fw={500}>
                        {sale.productName}
                    </Text>
                </Group>
            </Table.Td>

            <Table.Td>
                <Text fz="sm">{sale.quantity}</Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">${sale.price}</Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">${sale.revenue}</Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{sale.date}</Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => openModal(sale)}
                    >
                        <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(sale.id)}
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
                <Header name="Sales" />
                <Button
                    variant="default"
                    onClick={() => {
                        setSelectedSale(null);
                        open();
                    }}
                >
                    <IconCirclePlus className="w-5 h-5 mr-2 !text-gray-200" />
                    Add Sale
                </Button>
            </div>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Product Name</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Revenue</Table.Th>
                            <Table.Th>Date</Table.Th>
                            <Table.Th />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{Sales}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <div className="py-12 px-4">
                {sales.links.map((link) =>
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
            <SaleModal isOpen={opened} onClose={close} sale={selectedSale} />
        </>
    );
}
