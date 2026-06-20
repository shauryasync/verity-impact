import Link from "next/link";
import NavLinks from "./navlinks";
import { X } from "lucide-react";

export default function SideNav({ closeSidebar }) {
  return (
    <aside className="flex h-full w-72 flex-col justify-between overflow-y-auto  border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-end p-4 lg:hidden">
        <button
          onClick={closeSidebar}
          className="rounded-lg p-2 hover:bg-sidebar-accent"
        >
          <X size={20} />
        </button>
      </div>

      <div>
        <Link href="/dashboard" className="flex items-center gap-3 px-6 py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sidebar-primary">
            <span className="text-lg">🌳</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">NGO Tracker</h1>

            <p className="text-sm text-sidebar-foreground/70">Impact Manager</p>
          </div>
        </Link>

        <div className="px-3">
          <NavLinks closeSidebar={closeSidebar} />
        </div>
      </div>

      <div className="px-3 pb-6">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
