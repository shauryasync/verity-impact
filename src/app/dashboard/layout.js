"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import SideNav from "../components/layout/sidenav";
import { EventsProvider } from "../context/EventsContext";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <EventsProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop sidebar */}

        <div className="hidden lg:block lg:h-screen lg:w-72 lg:shrink-0">
          <SideNav />
        </div>

        {/* Mobile sidebar */}

        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <SideNav closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Main content */}

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background px-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-muted"
            >
              <Menu size={22} />
            </button>

            <h1 className="ml-4 text-lg font-semibold">Verity</h1>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </EventsProvider>
  );
}
