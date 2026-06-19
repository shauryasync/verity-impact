"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  Phone,
  CalendarDays,
  Users,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";

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
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading volunteer...</p>
      </div>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const lastParticipation =
    sortedEvents.length > 0 ? sortedEvents[0].date : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Link
            href="/dashboard/volunteers"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#2F6B4F]"
          >
            <ArrowLeft size={16} />
            Back to Volunteers
          </Link>

          <h1 className="text-4xl font-bold text-[#2D2D2D]">
            {volunteer.name}
          </h1>

          <p className="mt-2 text-gray-500">
            {volunteer.availability || "Flexible availability"}
          </p>
        </div>

        <div className="flex gap-3">
          <Link href={`/dashboard/volunteers/${id}/edit`}>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#2F6B4F] hover:text-[#2F6B4F]">
              <Pencil size={16} />
              Edit
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <h2 className="mb-6 text-xl font-semibold text-[#2D2D2D]">
            Contact Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={18} className="text-[#2F6B4F]" />
              <span>{volunteer.email}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={18} className="text-[#C97B63]" />
              <span>{volunteer.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <CalendarDays size={18} className="text-[#2F6B4F]" />
              <span>
                Joined:{" "}
                {volunteer.joinedDate
                  ? new Date(volunteer.joinedDate).toLocaleDateString()
                  : "Not available"}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-semibold text-[#2D2D2D]">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {volunteer.skills?.length > 0 ? (
                volunteer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added.</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-[#2D2D2D]">
            Analytics
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Status</p>

              <div className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {volunteer.status || "Active"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Events Participated</p>

              <div className="mt-2 flex items-center gap-2">
                <Users size={20} className="text-[#2F6B4F]" />

                <span className="text-3xl font-bold text-[#2D2D2D]">
                  {events.length}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Last Participation</p>

              <p className="mt-2 font-medium text-[#2D2D2D]">
                {lastParticipation
                  ? new Date(lastParticipation).toLocaleDateString()
                  : "No participation yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold text-[#2D2D2D]">
          Participation History
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500">No events assigned yet.</p>
        ) : (
          <div className="space-y-3">
            {sortedEvents.map((event) => (
              <div
                key={event._id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
              >
                <div>
                  <h3 className="font-medium text-[#2D2D2D]">{event.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "No date"}
                  </p>
                </div>

                <CheckCircle2 size={20} className="text-[#2F6B4F]" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
