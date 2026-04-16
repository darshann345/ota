import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

export default function PlaceOrderCard({ onSaveOrder, editData }) {
    const [formData, setFormData] = useState({
        customerName: "",
        orderItems: "",
        deliveryAddress: ""
    });

    // Fill form when editing
    useEffect(() => {
        if (editData) {
            setFormData({
                customerName: editData.customerName || "",
                orderItems: editData.orderItems || "",
                deliveryAddress: editData.deliveryAddress || ""
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveOrder(formData);
        setFormData({ customerName: "", orderItems: "", deliveryAddress: "" });
    };

    return (
        <Card sx={{ width: '95%', maxWidth: 1100, mt: 4 }}>
            <CardContent>
                <Typography variant='h5' gutterBottom color="primary">
                    {editData ? "Edit Order" : "Place New Order"}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                    <TextField
                        name="customerName"
                        label="Customer Name"
                        value={formData.customerName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        name="orderItems"
                        label="Items"
                        value={formData.orderItems}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        name="deliveryAddress"
                        label="Address"
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color={editData ? "secondary" : "primary"}
                    >
                        {editData ? "Update Order" : "Submit Order"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}