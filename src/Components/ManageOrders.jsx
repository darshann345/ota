import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, Box, IconButton,
    Select, MenuItem, TextField, InputAdornment,
    Card, CardContent, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export default function ManageOrders({ orders = [], onUpdateStatus, onDeleteOrder, onEditOrder }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const getStatusStyles = (status) => {
        switch (status) {
            case "Placed": return { backgroundColor: "#e3f2fd", color: "#1976d2" };
            case "Packed": return { backgroundColor: "#fff3e0", color: "#ef6c00" };
            case "Shipped": return { backgroundColor: "#f3e5f5", color: "#7b1fa2" };
            case "Delivered": return { backgroundColor: "#e8f5e9", color: "#2e7d32" };
            default: return {};
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            const results = orders.filter((order) => {
                const id = `#${String(order.id).slice(-8)}`;
                return (
                    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.orderItems.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (order.status || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                    id.includes(searchTerm)
                );
            });

            setFilteredOrders(results);
            setPage(0);
        }, 300);

        return () => clearTimeout(delay);
    }, [searchTerm, orders]);

    const visibleRows = filteredOrders.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ width: '95%', maxWidth: 1100 }}>
            <Card>
                <CardContent>
                    <Typography variant='h5'>📋 Manage Orders</Typography>

                    <TextField
                        fullWidth
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ my: 2 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                        }}
                    />

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Items</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {visibleRows.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>#{String(order.id).slice(-8)}</TableCell>
                                        <TableCell>{order.customerName}</TableCell>
                                        <TableCell>{order.orderItems}</TableCell>
                                        <TableCell>{order.deliveryAddress}</TableCell>

                                        <TableCell>
                                            <Select
                                                value={order.status}
                                                onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                                                sx={getStatusStyles(order.status)}
                                            >
                                                <MenuItem value="Placed">Placed</MenuItem>
                                                <MenuItem value="Packed">Packed</MenuItem>
                                                <MenuItem value="Shipped">Shipped</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell>
                                            <IconButton onClick={() => onEditOrder(order)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteOrder(order.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredOrders.length}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}