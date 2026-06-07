"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    async function fetchVolunteers() {
      const response = await fetch("/api/volunteers");
      const data = await response.json();

      setVolunteers(data);
    }

    fetchVolunteers();
  }, []);

  return (
    <>
      <h1>Volunteers</h1>

      <div className="grid grid-cols-2 gap-4">
        {volunteers.map((volunteer) => (
          <div key={volunteer._id} className="border p-4 rounded">
            <h2>{volunteer.name}</h2>

            <p>{volunteer.email}</p>

            <p>{volunteer.phone}</p>

            <p>Status: {volunteer.status}</p>

            <p>Availability: {volunteer.availability}</p>

            <div>
              {volunteer.skills?.map((skill) => (
                <span key={skill}>{skill} </span>
              ))}
            </div>

            <Link href={`/dashboard/volunteers/${volunteer._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      <Link href="/dashboard/volunteers/new">
        <button>Add Volunteer</button>
      </Link>
    </>
  );
}
