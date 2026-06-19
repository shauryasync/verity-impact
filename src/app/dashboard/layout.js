import SideNav from "../components/layout/sidenav";
import { EventsProvider } from "../context/EventsContext";

export default function Layout({ children }) {
  return (
    <EventsProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <aside className="hidden md:block w-64 shrink-0">
          <SideNav />
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </EventsProvider>
  );
}
