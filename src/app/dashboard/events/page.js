"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, CalendarDays, MapPin } from "lucide-react";

export default function Page() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("/api/events");
      const data = await response.json();

      setEvents(data);
    }

    fetchEvents();
  }, []);

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">
            Events
          </h1>

          <p className="mt-2 text-gray-500">
            Manage upcoming initiatives and track historical impact.
          </p>
        </div>

        <Link href="/dashboard/events/new">
          <button className="w-full sm:w-auto inline-flex h-11 items-center gap-2 rounded-lg bg-[#2F6B4F] px-5 text-sm font-medium text-white transition hover:opacity-90">
            <Plus size={18} />
            Add Event
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
            placeholder="Search events..."
            className="w-full h-11 rounded-lg border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-[#2F6B4F]"
          />
        </div>
      </div>

      {/* Events Grid */}

      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">
            No events yet
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first event to start tracking impact.
          </p>

          <Link href="/dashboard/events/new">
            <button className="mt-6 w-full sm:w-auto h-11 rounded-lg bg-[#2F6B4F] px-5 py-3 text-white">
              Add Event
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Link key={event._id} href={`/dashboard/events/${event._id}`}>
              <div className="group h-full rounded-2xl border border-gray-200 bg-white p-4 md:p-6 transition hover:-translate-y-1 hover:border-[#2F6B4F] hover:shadow-md">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="line-clamp-2 text-xl font-semibold text-[#2D2D2D] group-hover:text-[#2F6B4F]">
                    {event.title}
                  </h2>
                </div>

                <p className="mb-6 line-clamp-3 text-sm text-gray-500">
                  {event.description || "No description provided."}
                </p>

                <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#2F6B4F]" />

                    <span>
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#C97B63]" />

                    <span>{event.location || "No location"}</span>
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
