import {useEffect, useState} from "react";
import apiFetch from "../api/api.js";

const useOrderSingleByTable = (tableId) => {
    const [order,setOrder] = useState([]);
    useEffect(() => {
        apiFetch(`/order/${tableId}/`)
            .then(data => {
                setOrder(data);
            })
    }, [tableId])
    return order;
}

export default useOrderSingleByTable;