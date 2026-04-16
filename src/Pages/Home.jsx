import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar";
import PlaceOrderCard from "../Components/PlaceOrderCard";
import ManageOrders from "../Components/ManageOrders";

const Home = () => {
    // Load from localStorage BEFORE render
    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem("orders");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [orderToEdit, setOrderToEdit] = useState(null);

    // Save to localStorage whenever orders change
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    // Add / Update Order
    const saveOrder = (formData) => {
        if (orderToEdit) {
            const updated = orders.map((o) =>
                o.id === orderToEdit.id ? { ...o, ...formData } : o
            );
            setOrders(updated);
            setOrderToEdit(null);
        } else {
            const newOrder = {
                id: Date.now(),
                ...formData,
                status: "Placed",
            };
            setOrders([...orders, newOrder]);
        }
    };

    // Update Status
    const updateOrderStatus = (id, status) => {
        const updated = orders.map((o) =>
            o.id === id ? { ...o, status } : o
        );
        setOrders(updated);
    };

    //  Delete Order
    const deleteOrder = (id) => {
        const updated = orders.filter((o) => o.id !== id);
        setOrders(updated);
    };

    const handleEditInitiate = (order) => {
        setOrderToEdit(order);
    };

    return (
        <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh", pb: 5 }}>
            <Navbar />

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, mt: 4 }}>
                <PlaceOrderCard onSaveOrder={saveOrder} editData={orderToEdit} />

                <ManageOrders
                    orders={orders}
                    onUpdateStatus={updateOrderStatus}
                    onDeleteOrder={deleteOrder}
                    onEditOrder={handleEditInitiate}
                />
            </Box>
        </Box>
    );
};

export default Home;