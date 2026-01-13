import apiFetch from "../api/api.js";

const finishOrder = async (tableId) => {
    // const res = await fetch(`http://127.0.0.1:8000/finish_order/${tableId}/`, {
    await apiFetch(`/finish_order/${tableId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:false
    });
    // return res.json();
};

export default finishOrder;
