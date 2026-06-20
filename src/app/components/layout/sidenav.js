import Link from "next/link";
import NavLinks from "./navlinks";
import { X, HandHeart } from "lucide-react";

export default function SideNav({ closeSidebar }) {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {" "}
      <div className="flex items-center justify-end p-4 lg:hidden">
        <button
          onClick={closeSidebar}
          className="rounded-lg p-2 hover:bg-sidebar-accent"
        >
          <X size={20} />
        </button>
      </div>
      <div className="shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 lg:px-6 py-6 lg:py-8"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm
          "
          >
            <HandHeart size={24} strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight truncate">
              Verity
            </h1>

            <p className="text-xs md:text-sm text-sidebar-foreground/70 truncate">
              NGO Impact Tracker
            </p>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        <NavLinks closeSidebar={closeSidebar} />
      </div>
      <div className="shrink-0 px-3 pb-6">
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
