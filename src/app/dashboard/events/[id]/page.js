"use client";
import { useContext } from "react";
import { EventsContext } from "@/app/context/EventsContext";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const { events } = useContext(EventsContext);

  const event = events.find((e) => e.id == id);

  if (!event) {
    return (
      <div>
        <h1>Event Not Found</h1>
        <Link href="/dashboard/events">Go Back</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
    </div>
  );
}
