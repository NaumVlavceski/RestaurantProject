import { useState, useEffect, useCallback } from "react";
import apiFetch from "../api/api.js";

const useOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = useCallback(async () => {
        try {
            const data = await apiFetch("/orders/");
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
        const intervalId = setInterval(fetchOrders, 2000);

        const handleOrdersUpdated = () => {
            fetchOrders();
        };

        window.addEventListener("ordersUpdated", handleOrdersUpdated);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("ordersUpdated", handleOrdersUpdated);
        };
    }, [fetchOrders]);

    return orders;
};

export default useOrders;