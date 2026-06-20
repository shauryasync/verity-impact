"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  Users,
  Utensils,
  Heart,
  IndianRupee,
  UserPlus,
  UserMinus,
  Pencil,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const assignedVolunteerIds =
    event?.volunteerIds?.map((id) => id.toString()) ?? [];
  const assignedVolunteers = volunteers.filter((volunteer) =>
    assignedVolunteerIds.includes(volunteer._id?.toString()),
  );
  const availableVolunteers = volunteers.filter(
    (volunteer) => !assignedVolunteerIds.includes(volunteer._id?.toString()),
  );

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
    return (
      <div className="space-y-8">
        <p className="text-base text-gray-500">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="space-y-8">
        <p className="text-base text-red-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/dashboard/events"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F6B4F]"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">
            {event.title}
          </h1>

          <p className="mt-3 max-w-full text-sm md:text-base text-gray-500">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`/dashboard/events/${id}/edit`}>
            <button className="w-full sm:w-auto inline-flex h-11 min-h-[44px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#2F6B4F] hover:text-[#2F6B4F]">
              <Pencil size={16} />
              Edit
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="w-full sm:w-auto inline-flex h-11 min-h-[44px] items-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-[#2F6B4F]" />
          {event.date ? new Date(event.date).toLocaleDateString() : "No date"}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-[#C97B63]" />
          {event.location}
        </div>

        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#2F6B4F]" />
          {assignedVolunteers.length} volunteers assigned
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
          <div className="flex items-center gap-3">
            <Utensils className="text-[#2F6B4F]" size={22} />

            <div>
              <p className="text-sm text-gray-500">Meals Served</p>

              <h2 className="text-3xl font-bold text-[#2D2D2D]">
                {event.mealsServed || 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <Heart className="text-[#C97B63]" size={22} />

            <div>
              <p className="text-sm text-gray-500">Beneficiaries Reached</p>

              <h2 className="text-3xl font-bold text-[#2D2D2D]">
                {event.beneficiariesReached || 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <IndianRupee className="text-[#2F6B4F]" size={22} />

            <div>
              <p className="text-sm text-gray-500">Funds Raised</p>

              <h2 className="text-3xl font-bold text-[#2D2D2D]">
                ₹{event.fundsRaised || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
          <h2 className="mb-6 text-xl font-semibold text-[#2D2D2D]">
            Assigned Volunteers
          </h2>

          {assignedVolunteers.length === 0 ? (
            <p className="text-gray-500">No volunteers assigned yet.</p>
          ) : (
            <div className="space-y-3">
              {assignedVolunteers.map((volunteer) => (
                <div
                  key={volunteer._id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  <span className="font-medium text-[#2D2D2D]">
                    {volunteer.name}
                  </span>

                  <button
                    onClick={() => removeVolunteer(volunteer._id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    <UserMinus size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-[#2D2D2D]">
            Available Volunteers
          </h2>

          {availableVolunteers.length === 0 ? (
            <p className="text-gray-500">No volunteers available.</p>
          ) : (
            <div className="space-y-3">
              {availableVolunteers.map((volunteer) => (
                <div
                  key={volunteer._id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  <span className="font-medium text-[#2D2D2D]">
                    {volunteer.name}
                  </span>

                  <button
                    onClick={() => assignVolunteer(volunteer._id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2F6B4F] px-3 py-2 text-sm text-white hover:opacity-90"
                  >
                    <UserPlus size={16} />
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
