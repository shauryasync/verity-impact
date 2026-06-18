"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const eventResponse = await fetch(`/api/events/${id}`);
      const eventData = await eventResponse.json();

      setEvent(eventData);

      const volunteerResponse = await fetch("/api/volunteers");
      const volunteerData = await volunteerResponse.json();

      setVolunteers(volunteerData);
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  const assignVolunteer = async (volunteerId) => {
    await fetch(`/api/events/${id}/volunteers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ volunteerId }),
    });

    window.location.reload();
  };

  const removeVolunteer = async (volunteerId) => {
    await fetch(`/api/events/${id}/volunteers`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ volunteerId }),
    });

    window.location.reload();
  };

  const handleDelete = async () => {
    await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    router.push("/dashboard/events");
  };

  if (!event) {
    return <h1>Loading...</h1>;
  }

  const assignedVolunteers = volunteers.filter((volunteer) =>
    event.volunteerIds?.includes(volunteer._id.toString()),
  );

  const availableVolunteers = volunteers.filter(
    (volunteer) => !event.volunteerIds?.includes(volunteer._id.toString()),
  );

  return (
    <div>
      <h1>{event.title}</h1>

      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>

      <p>Volunteers Assigned: {assignedVolunteers.length}</p>

      <h2>Assigned Volunteers</h2>

      {assignedVolunteers.length === 0 ? (
        <p>No volunteers assigned yet.</p>
      ) : (
        assignedVolunteers.map((volunteer) => (
          <div key={volunteer._id}>
            <span>{volunteer.name}</span>

            <button onClick={() => removeVolunteer(volunteer._id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Available Volunteers</h2>

      {availableVolunteers.length === 0 ? (
        <p>No volunteers available.</p>
      ) : (
        availableVolunteers.map((volunteer) => (
          <div key={volunteer._id}>
            <span>{volunteer.name}</span>

            <button onClick={() => assignVolunteer(volunteer._id)}>
              Assign
            </button>
          </div>
        ))
      )}

      <Link href={`/dashboard/events/${id}/edit`}>
        <button>Edit Event</button>
      </Link>

      <button onClick={handleDelete}>Delete Event</button>

      <Link href="/dashboard/events">Go Back</Link>
    </div>
  );
}
