"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    mealsServed: 0,
    beneficiariesReached: 0,
    fundsRaised: 0,
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Failed to load event");
          return;
        }

        setFormData({
          title: data.title || "",
          date: data.date ? data.date.split("T")[0] : "",
          location: data.location || "",
          description: data.description || "",
          mealsServed: data.mealsServed || 0,
          beneficiariesReached: data.beneficiariesReached || 0,
          fundsRaised: data.fundsRaised || 0,
        });
      } catch (error) {
        console.error(error);
        alert("Something went wrong while loading the event");
      }
    }

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!formData.date) {
      alert("Date is required");
      return;
    }

    if (!formData.location.trim()) {
      alert("Location is required");
      return;
    }

    if (formData.mealsServed < 0) {
      alert("Meals served cannot be negative");
      return;
    }

    if (formData.beneficiariesReached < 0) {
      alert("Beneficiaries reached cannot be negative");
      return;
    }

    if (formData.fundsRaised < 0) {
      alert("Funds raised cannot be negative");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to update event");
        return;
      }

      router.push(`/dashboard/events/${id}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#2D2D2D]">Edit Event</h1>

        <p className="mt-2 text-gray-500">
          Update event details and impact metrics.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-[#2D2D2D]">
            Impact Metrics
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                Meals Served
              </label>

              <input
                type="number"
                name="mealsServed"
                min="0"
                value={formData.mealsServed}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                Beneficiaries Reached
              </label>

              <input
                type="number"
                name="beneficiariesReached"
                min="0"
                value={formData.beneficiariesReached}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                Funds Raised (₹)
              </label>

              <input
                type="number"
                name="fundsRaised"
                min="0"
                value={formData.fundsRaised}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push(`/dashboard/events/${id}`)}
            className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#2F6B4F] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating Event..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
