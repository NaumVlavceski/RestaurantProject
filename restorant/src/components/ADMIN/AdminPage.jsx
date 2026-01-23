import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    PlusCircleIcon,
    TagIcon,
    UserPlusIcon,
    ChartBarIcon,
    DocumentTextIcon,
    Cog6ToothIcon,
    ArrowLeftIcon,
    UsersIcon
} from "@heroicons/react/24/outline";
import clipboardIcon from "@heroicons/react/16/solid/esm/ClipboardIcon.js";
import apiFetch from "../../api/api.js";
// import useTranslate from "../../hooks/useTranslate.js";

function AdminPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [l,setL] = useState("mk")
    // const t = useTranslate(l)
    useEffect(() => {
        apiFetch("/check-auth/", {
            credentials: "include",
        })
            .then((data) => {
                if (!data.is_staff) {
                    navigate("/login");
                } else {
                    setUser(data.username);
                }
                setLoading(false);
            })
            .catch(() => {
                navigate("/login");
            });
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const adminCards = [
        {
            title: "Листа на јадења",
            description: "View/Add/Edit/Remove на јадења",
            icon: clipboardIcon,
            path: "meals",
            color: "blue",
        },
        {
            title: "Листа на категории",
            description: "View/Add/Edit/Remove на категорија",
            icon: TagIcon,
            path: "categories",
            color: "green",
        },
        {
            title: "Регистрирај корисник",
            description: "Креирај нов кориснички профил",
            icon: UserPlusIcon,
            path: "register",
            color: "purple",
        },
        {
            title: "Листа на корисници",
            description: "Провери ја листата на корисници",
            icon: UsersIcon,
            path: "users",
            color: "yellow",
        },
    ];

    const colorClasses = {
        blue: "bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300",
        green: "bg-green-50 text-green-600 border-green-200 hover:border-green-300",
        purple: "bg-purple-50 text-purple-600 border-purple-200 hover:border-purple-300",
        yellow: "bg-yellow-50 text-yellow-600 border-yellow-200 hover:border-yellow-300",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-200 hover:border-indigo-300",
        gray: "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300",
    };


    return (
        <section id="admin" className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Административни функции</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminCards.map((card, index)=> (
                        <div
                            key={index}
                            onClick={() => navigate(card.path)}
                            className={`bg-white rounded-xl shadow-sm border ${colorClasses[card.color]} p-6 hover:shadow-md transition duration-200 cursor-pointer group`}
                        >
                            <div className="flex items-start justify-between">
                                <div className={`p-3 rounded-lg ${colorClasses[card.color].split(' ')[0]}`}>
                                    <card.icon className="h-8 w-8" />
                                </div>
                                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition duration-200">
                                    →
                                </span>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900">{card.title}</h3>
                            <p className="mt-2 text-sm text-gray-600">{card.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </section>
    );
}

export default AdminPage;