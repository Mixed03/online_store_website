// components/Footer.tsx
"use client";
import { Home as HomeIcon, ShoppingBag, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To get current path for active state

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Cart", icon: ShoppingCart, href: "/cart" },
    // { name: "Notifications", icon: ShoppingBag, href: "/notifications" },
    // { name: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 shadow-lg z-50">
      <div className="max-w-xl mx-auto h-16 flex justify-around items-center px-4">
        {navItems.map((item) => (
          <Link href={item.href} key={item.name} className="flex flex-col items-center gap-1 text-xs">
            <item.icon
              size={20}
              className={pathname === item.href ? "text-black" : "text-gray-400 group-hover:text-gray-600 transition-colors"}
            />
            {/* <span className={pathname === item.href ? "text-black font-medium" : "text-gray-500"}>{item.name}</span> */}
          </Link>
        ))}
      </div>
    </footer>
  );
}
