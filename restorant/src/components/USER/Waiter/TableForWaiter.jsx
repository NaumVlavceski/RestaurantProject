import {useEffect, useState} from "react";
import useCategories from "../../../hooks/useCategories.js";
import useMealsFromCategory from "../../../hooks/useMealsFromCategory.js";
import {useParams} from "react-router";
import useOrderByTable from "../../../hooks/useOrderByTable.js";
import MenuForWaiter from "./MenuForWaiter.jsx";
import useMeals from "../../../hooks/useMeals.js";
import apiFetch from "../../../api/api.js";

function TableForWaiter() {
    const [query,setQuery] = useState('')
    const meals = useMeals(query);
    const {tableId} = useParams();

    const [orderByTable,setOrderByTable] = useState(null)

    useOrderByTable(tableId,setOrderByTable);

    const addMealToTable = async (mealId) => {
        try{
            await apiFetch(`/add/${tableId}/${mealId}/`, {
                method:"POST",
                credentials :false
            });

            const orderData = await apiFetch(`/order/${tableId}/`);
            setOrderByTable(orderData);
            console.log(orderData)
        }catch (err){
            console.log(err)
        }
    }


    const removeMealToTable = async (mealId) => {
        try{
            await apiFetch(`/remove/${tableId}/${mealId}/`, {
                method:"POST",
                credentials :false
            });
            const orderData = await apiFetch(`/order/${tableId}/`);
            setOrderByTable(orderData);
        }catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        document.title = "Table " + tableId
    }, []);



    return (
        <div>
            <main>
                <MenuForWaiter
                    setQuery = {setQuery}
                    query={query}
                    meals={meals}
                    tableId={tableId}
                    onAddMeal={addMealToTable}
                    orderByTable={orderByTable}
                    onRemoveMeal={removeMealToTable}
                />
            </main>
        </div>
    );
}

export default TableForWaiter;