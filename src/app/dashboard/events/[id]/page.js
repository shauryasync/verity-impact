"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadData = async () => {
      try {
        const eventResponse = await fetch(`/api/events/${id}`);
        const eventData = await eventResponse.json();

        if (!eventResponse.ok || eventData.success === false) {
          alert(eventData.error || "Failed to load event");
          return;
        }

        const volunteerResponse = await fetch("/api/volunteers");
        const volunteerData = await volunteerResponse.json();

        if (!volunteerResponse.ok || volunteerData.success === false) {
          alert(volunteerData.error || "Failed to load volunteers");
          return;
        }

        if (!isMounted) return;
        setEvent(eventData);
        setVolunteers(volunteerData);
      } catch (error) {
        console.error(error);
        alert("Something went wrong while loading data");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const assignVolunteer = async (volunteerId) => {
    try {
      const response = await fetch(`/api/events/${id}/volunteers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ volunteerId }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        alert(data.error || "Failed to assign volunteer");
        return;
      }

      setEvent((prevEvent) => {
        if (!prevEvent) return prevEvent;
        const updatedVolunteerIds = Array.isArray(prevEvent.volunteerIds)
          ? [...new Set([...prevEvent.volunteerIds, volunteerId.toString()])]
          : [volunteerId.toString()];
        return {
          ...prevEvent,
          volunteerIds: updatedVolunteerIds,
        };
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const removeVolunteer = async (volunteerId) => {
    try {
      const response = await fetch(`/api/events/${id}/volunteers`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ volunteerId }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        alert(data.error || "Failed to remove volunteer");
        return;
      }

      setEvent((prevEvent) => {
        if (!prevEvent) return prevEvent;
        return {
          ...prevEvent,
          volunteerIds: (prevEvent.volunteerIds || []).filter(
            (idValue) => idValue.toString() !== volunteerId.toString(),
          ),
        };
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete event");
        return;
      }

      router.push("/dashboard/events");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!event) {
    return <h1>Event not found</h1>;
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

      <p>Meals Served: {event.mealsServed || 0}</p>
      <p>Beneficiaries Reached: {event.beneficiariesReached || 0}</p>
      <p>Funds Raised: ₹{event.fundsRaised || 0}</p>
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
