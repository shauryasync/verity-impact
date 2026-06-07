"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);

  const handleDelete = async () => {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log(data);

    router.push("/dashboard/events");
  };

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

      <button onClick={handleDelete}>Delete Event</button>
      <Link href="/dashboard/events">Go Back</Link>
    </div>
  );
}
