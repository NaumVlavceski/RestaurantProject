import {useEffect} from "react";
import apiFetch from "../api/api.js";

const useOrderByTable = (tableId, setOrderByTable) => {
    useEffect(() => {
        if (!tableId) return;

        const fetchOrder = async () => {
            try {
                const data = await apiFetch(`/order/${tableId}/`);
                setOrderByTable(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchOrder();
    }, [tableId, setOrderByTable]);
}

export default useOrderByTable;