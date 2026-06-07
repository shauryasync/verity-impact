"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();

  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    async function fetchVolunteer() {
      const response = await fetch(`/api/volunteers/${id}`);
      const data = await response.json();

      setVolunteer(data);
    }

    if (id) {
      fetchVolunteer();
    }
  }, [id]);

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

      <Link href={`/dashboard/volunteers/${id}/edit`}>
        <button>Edit Volunteer</button>
      </Link>

      <Link href="/dashboard/volunteers">
        <button>Back</button>
      </Link>
    </div>
  );
}
