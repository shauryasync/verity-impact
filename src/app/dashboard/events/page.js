"use client";

import { useEffect, useState } from "react";
import EventCard from "@/app/components/events/EventCard";
import Link from "next/link";

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
    <>
      <h1>Events</h1>

      <div className="grid grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event._id}>
            <Link href={`/dashboard/events/${event._id}`}>
              <EventCard
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
              />
            </Link>
          </div>
        ))}

        <Link href="/dashboard/events/new">
          <button>Add Event</button>
        </Link>
      </div>
    </>
  );
}
