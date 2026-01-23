import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import OfficialWeb from "./components/OfficialWeb/OfficialWeb.jsx";
import Table from "./components/Customer/Table.jsx";
import Tables from "./components/USER/Waiter/Tables.jsx";
import Orders from "./components/USER/Waiter/Orders.jsx";
import Order from "./components/Customer/Order.jsx";
import TableForWaiter from "./components/USER/Waiter/TableForWaiter.jsx";
import AddMealForm from "./components/ADMIN/meal/AddMeal.jsx";
import AddCategoryForm from "./components/ADMIN/category/AddCategory.jsx";
import RegisterUsers from "./components/ADMIN/RegisterUsers.jsx";
import LoginUsers from "./components/USER/login.jsx";
import AdminPage from "./components/ADMIN/AdminPage.jsx";
import UserPage from "./components/USER/UserPage.jsx";
import AdminRoute from "./components/ADMIN/AdminRoute.jsx";
import UserRoute from "./components/USER/UserRoute.jsx";
import ListUsers from "./components/ADMIN/ListUsers.jsx";
import ListMeals from "./components/ADMIN/meal/ListMeals.jsx";
import ListCategories from "./components/ADMIN/category/ListCategories.jsx";
import EditMealForm from "./components/ADMIN/meal/EditMeal.jsx";
import EditCategoryForm from "./components/ADMIN/category/EditCategoryForm.jsx";


function App() {
    return (

        <BrowserRouter>
            <Routes>

                <Route index element={<OfficialWeb/>}/>
                <Route path="table/:tableId" element={<Table/>}/>
                <Route path="order/:tableId" element={<Order/>}/>

                {/*{USER}*/}
                <Route path="/user" element={<UserRoute><UserPage/></UserRoute>}/>
                <Route path="user/table/:tableId" element={<UserRoute><TableForWaiter/></UserRoute>}/>
                <Route path="/user/register" element={<AdminRoute><RegisterUsers /></AdminRoute>} />
                <Route path="/user/users" element={<AdminRoute><ListUsers /></AdminRoute>} />
                <Route path="/user/meals" element={<AdminRoute><ListMeals /></AdminRoute>} />
                <Route path="/user/addMeal" element={<AdminRoute><AddMealForm /></AdminRoute>} />
                <Route path="/user/editMeal/:mealId" element={<AdminRoute><EditMealForm /></AdminRoute>} />
                <Route path="/user/categories" element={<AdminRoute><ListCategories /></AdminRoute>} />
                <Route path="/user/addCategory" element={<AdminRoute><AddCategoryForm /></AdminRoute>} />
                <Route path="/user/editCategory/:categoryId" element={<AdminRoute><EditCategoryForm/></AdminRoute>} />

                <Route path="/login" element={<LoginUsers/>}/>

            </Routes>
        </BrowserRouter>)
}

export default App;


