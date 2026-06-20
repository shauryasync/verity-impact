"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import SideNav from "../components/layout/sidenav";
import { EventsProvider } from "../context/EventsContext";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <EventsProvider>
      <div className="flex min-h-screen bg-background overflow-hidden max-w-full min-w-0">
        {/* Desktop sidebar */}

        <div className="hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:shrink-0">
          <SideNav />
        </div>

        {/* Mobile sidebar */}

        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            <div className="fixed left-0 top-0 z-50 lg:hidden">
              <SideNav closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Content */}

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 min-w-0 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background px-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-muted"
            >
              <Menu size={22} />
            </button>

            <h1 className="ml-4 text-lg font-semibold">NGO Impact Tracker</h1>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </EventsProvider>
  );
}
