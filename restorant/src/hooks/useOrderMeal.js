import {useCallback} from "react";
import apiFetch from "../api/api.js";

const useOrderMeal = (tableId) => {
    const sendOrder = useCallback(async () => {
        if (!tableId) return;

        try {
            const data = await apiFetch(`/add_order/${tableId}/`, {
                method: "POST",
                body:{},
                credentials:false,
            })
            console.log("ORDER RESPONSE:", data);

            // Прати event за ажурирање на нарачките
            const event = new CustomEvent("ordersUpdated", {
                detail: {
                    tableId,
                    timestamp: Date.now(),
                    action: "order_added"
                }
            });
            window.dispatchEvent(event);

            return data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }, [tableId]);

    return sendOrder;
};

export default useOrderMeal;