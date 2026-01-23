import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    UserCircleIcon,
    TableCellsIcon,
    ClipboardDocumentListIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {Menu, X} from "lucide-react";
import apiFetch from "../../api/api.js";
import Tables from "./Waiter/Tables.jsx";
import Orders from "./Waiter/Orders.jsx";
import AdminPage from "../ADMIN/AdminPage.jsx";

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState(() => {
        return localStorage.getItem("activeSection") || "tables";
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        document.title = "Welcome"
        apiFetch("/check-auth/", {
            credentials: "include",
        })
            .then((data) => {
                if (!data.is_authenticated) {
                    navigate("/login");
                } else {
                    setUser(data.username);
                    if (data.is_staff) {
                        setAdmin(true);
                    }
                }
                setLoading(false);
            })
            .catch(() => {
                navigate("/login");
            });
    }, [navigate]);
    const handleLogout = async () => {
        try {
            await apiFetch("/logout/", {
                method: "POST",
                body: {refresh: localStorage.getItem("refresh")},
            });
        } catch (e) {
        }

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };
    const handleNavigation = (id) => {
        setActiveSection(id)
        localStorage.setItem("activeSection", id);
        setIsMenuOpen(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    const navLinks = [
        {
            icon: TableCellsIcon,
            name: "Маси",
            id: "tables",
            color: "text-blue-600",
        },
        {
            icon: ClipboardDocumentListIcon,
            name: "Нарачки",
            id: "orders",
            color: "text-green-600",
        },
        ...(admin ? [{
            icon: Cog6ToothIcon,
            name: "Админ",
            id: "admin",
            color: "text-purple-600",
        }]:[])

    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <header className=" bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <UserCircleIcon className="h-8 w-8 text-blue-600"/>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Добредојдовте</h1>
                                <p className="text-sm text-gray-600">{user}</p>
                            </div>
                        </div>
                        <div className="hidden md:flex">
                            {navLinks.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNavigation(item.id)}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
                                >
                                    <item.icon className={`h-6 w-6 ${item.color}`}/>
                                    <span>{item.name}</span>
                                </button>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-600"/>
                                <span>Одјави се</span>
                            </button>
                        </div>
                        <button
                            className="md:hidden right-5 z-20 fixed"
                            onClick={() => setIsMenuOpen((p) => !p)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X/> : <Menu/>}
                        </button>
                    </div>
                </div>
                <div
                    className={`md:hidden fixed top-0 z-15 right-0 h-full w-80 bg-gray-50
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-40" : "translate-x-full"}`}
                >
                    <div className="pt-20 px-2">
                        <ul className="space-y-6">
                            {navLinks.map((item, index) => (
                                <li
                                    className={`transform transition-all duration-300
                  ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
                                    style={{transitionDelay: `${index * 70}ms`}}
                                >
                                    <button
                                        onClick={() => handleNavigation(item.id)}
                                        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-500"
                                    >
                                        <item.icon className={`h-6 w-6 ${item.color}`}/>
                                        <span>{item.name}</span>
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`transform transition-all duration-300
                  ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
                                style={{transitionDelay: `210ms`}}
                            >
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-500"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-600"/>
                                    <span>Одјави се</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {activeSection === "tables" && <Tables/>}
            {activeSection === "orders" && <Orders/>}
            {activeSection === "admin" && admin && <AdminPage/>}
        </div>
    );
};

export default UserPage;