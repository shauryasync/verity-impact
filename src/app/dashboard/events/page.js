"use client";
import { useContext } from "react";
import { EventsContext } from "@/app/context/EventsContext";
import EventCard from "@/app/components/events/EventCard";
import Link from "next/link";
export default function Page() {
  const { events } = useContext(EventsContext);
  return (
    <>
      <h1>Events</h1>
      <div className="grid grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event.id}>
            <Link href={`/dashboard/events/${event.id}`}>
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
            <button>Add Event</button></Link>
      </div>
    </>
  );
}
