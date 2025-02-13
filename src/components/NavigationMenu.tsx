"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  User,
  Hospital,
  Home,
  LogOut,
  AlignJustify,
  X,
  Plus,
  FileText,
  Building2,
  Files,
  Archive,
  BarChart,
  Layout,
  Settings,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function NavigationMenu({
  userRole,
  isMenuOpen,
  setIsMenuOpen,
}: {
  userRole: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState(0);

  // Menu items configuration
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
      access: ["user", "manager"],
    },
    {
      id: "new-log",
      label: "New Log",
      icon: Plus,
      href: "/logs/new",
      access: ["user", "manager"],
    },
    {
      id: "my-logs",
      label: "My Logs",
      icon: FileText,
      href: "/logs/my-logs",
      access: ["user", "manager"],
    },
    {
      id: "site-logs",
      label: "Site Logs",
      icon: Building2,
      href: "/logs/site-logs",
      access: ["manager"],
    },
    {
      id: "all-logs",
      label: "All Logs",
      icon: Files,
      href: "/logs/all-logs",
      access: ["manager"],
    },
    {
      id: "archive",
      label: "Archive",
      icon: Archive,
      href: "/logs/archive",
      access: ["manager"],
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart,
      href: "/reports",
      access: ["manager"],
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Layout,
      href: "/dashboard",
      access: ["manager"],
    },
  ];

  // Simulated notifications check
  useEffect(() => {
    setNotifications(3); // Example notification count
  }, []);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-40 h-16 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <AlignJustify className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <Phone className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">OnCall</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-md relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </button>

            <div className="hidden md:flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                John Doe ({userRole})
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <Hospital className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Central Hospital</span>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <LogOut className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:${
          menuItems.length > 0 ? "translate-x-0" : "-translate-x-full"
        } lg:z-20 pt-16`}
      >
        <div className="h-full overflow-y-auto">
          {menuItems
            .filter((item) => item.access.includes(userRole))
            .map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 text-left ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}