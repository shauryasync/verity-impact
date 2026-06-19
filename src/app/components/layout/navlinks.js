"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Users, BarChart3 } from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: CalendarDays,
  },
  {
    name: "Volunteers",
    href: "/dashboard/volunteers",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/dashboard/impact",
    icon: BarChart3,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => {
        const Icon = link.icon;

        const isActive =
          pathname === link.href ||
          (link.href !== "/dashboard" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            }`}
          >
            <Icon size={20} />

            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
