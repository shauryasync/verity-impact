import SideNav from "../components/layout/sidenav";
import { EventsProvider } from "../context/EventsContext";
export default function Layout({ children }) {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="flex-none w-64">
        <SideNav />
      </div>

      <div className="p-12 overflow-y-auto grow">
        <EventsProvider>{children}</EventsProvider>
      </div>
    </div>
  );
}
