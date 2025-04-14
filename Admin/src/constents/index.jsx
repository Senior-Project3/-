import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users } from "lucide-react";

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/",
            },
           
        ],
    },
    {
        title: "Customers",
        links: [
            {
                label: "Customers",
                icon: Users,
                path: "/customers",
            },
           
          
        ],
    },
    {
        title: "Products",
        links: [
            {
                label: "Products",
                icon: Package,
                path: "/products",
            },
            {
                label: "New product",
                icon: PackagePlus,
                path: "/new-product",
            },
            {
                label: "Inventory",
                icon: ShoppingBag,
                path: "/inventory",
            },
        ],
    },
   
];





