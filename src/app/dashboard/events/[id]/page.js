"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();

      setEvent(data);
    }

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (!event) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>

    <Link href={`/dashboard/events/${id}/edit`}>
    <button>Edit Event</button>
    </Link>

      <Link href="/dashboard/events">Go Back</Link>
    </div>
  );
}
