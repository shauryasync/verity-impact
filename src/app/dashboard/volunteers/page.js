"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Mail, Phone, Users, CheckCircle2 } from "lucide-react";

export default function Page() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        const response = await fetch("/api/volunteers");
        const data = await response.json();

        setVolunteers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVolunteers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading volunteers...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0 space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">
            Volunteers
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your volunteer network and participation.
          </p>
        </div>

        <Link href="/dashboard/volunteers/new">
          <button className="w-full sm:w-auto inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#2F6B4F] px-5 text-sm font-medium text-white transition hover:opacity-90">
            <Plus size={18} />
            Add Volunteer
          </button>
        </Link>
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="relative w-full max-w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search volunteers..."
            className="w-full h-11 rounded-lg border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-[#2F6B4F]"
          />
        </div>
      </div>

      {/* Volunteers Grid */}

      {volunteers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">
            No volunteers yet
          </h2>

          <p className="mt-2 text-gray-500">
            Add your first volunteer to start building your community.
          </p>

          <Link href="/dashboard/volunteers/new">
            <button className="mt-6 rounded-lg bg-[#2F6B4F] px-5 py-3 text-white">
              Add Volunteer
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {volunteers.map((volunteer) => (
            <Link
              key={volunteer._id}
              href={`/dashboard/volunteers/${volunteer._id}`}
            >
              <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#2F6B4F] hover:shadow-md">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#2D2D2D] group-hover:text-[#2F6B4F]">
                      {volunteer.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {volunteer.availability || "Flexible"}
                    </p>
                  </div>

                  <div
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      volunteer.status?.toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {volunteer.status || "Unknown"}
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#2F6B4F]" />

                    <span className="truncate">{volunteer.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#C97B63]" />

                    <span>{volunteer.phone}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {volunteer.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}

                  {volunteer.skills?.length > 3 && (
                    <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs text-gray-700">
                      +{volunteer.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} className="text-[#2F6B4F]" />

                    <span>Volunteer Profile</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle2 size={16} />

                    <span>View Details</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
