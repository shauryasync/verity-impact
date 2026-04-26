import Link from "next/link";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Events", href: "/dashboard/events" },
  { name: "Volunteers", href: "/dashboard/volunteers" },
  { name: "Impact", href: "/dashboard/impact" },
];

export default function NavLinks() {
  return (
    <div className="flex flex-col gap-3 grow justify-between space-y-2">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="rounded-md p-2 hover:bg-gray-100 hover:text-black"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
