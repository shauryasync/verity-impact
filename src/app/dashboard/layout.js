import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }) {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="flex-none w-64">
        <SideNav />
      </div>

      <div className="p-12 overflow-y-auto grow">{children}</div>
    </div>
  );
}
