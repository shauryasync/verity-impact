"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [volunteer, setVolunteer] = useState(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchVolunteer() {
      const eventsResponse = await fetch(`/api/volunteers/${id}/events`);

      const eventsData = await eventsResponse.json();

      setEvents(eventsData);

      const response = await fetch(`/api/volunteers/${id}`);
      const data = await response.json();

      setVolunteer(data);
    }

    if (id) {
      fetchVolunteer();
    }
  }, [id]);

  const handleDelete = async () => {
    const response = await fetch(`/api/volunteers/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      router.push("/dashboard/volunteers");
    } else {
      console.error(data.error);
    }
  };

  if (!volunteer) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{volunteer.name}</h1>

      <p>Email: {volunteer.email}</p>

      <p>Phone: {volunteer.phone}</p>

      <p>Status: {volunteer.status}</p>

      <p>Availability: {volunteer.availability}</p>

      <p>Joined: {volunteer.joinedDate}</p>

      <h3>Skills</h3>

      <ul>
        {volunteer.skills?.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <h2>Participation History</h2>

      <p>Total Events: {events.length}</p>

      {events.length === 0 ? (
        <p>No events assigned yet.</p>
      ) : (
        events.map((event) => <div key={event._id}>{event.title}</div>)
      )}

      <Link href={`/dashboard/volunteers/${id}/edit`}>
        <button>Edit Volunteer</button>
      </Link>

      <button onClick={handleDelete}>Delete Volunteer</button>

      <Link href="/dashboard/volunteers">
        <button>Back</button>
      </Link>
    </div>
  );
}
