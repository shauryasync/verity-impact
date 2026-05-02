import NavLinks from "./navlinks";

export default function SideNav() {
  return (
    <div className="flex flex-col justify-between space-x-0 space-y-2 bg-gray-500 h-screen w-64">
      <div className="flex flex-col gap-6 px-4 mt-10">
        <NavLinks />
      </div>
    </div>
  );
}
