"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    volunteerIds: [],
    mealsServed: 0,
    beneficiariesReached: 0,
    fundsRaised: 0,
  });

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

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to create event");
        return;
      }

      setFormData({
        title: "",
        date: "",
        location: "",
        description: "",
        volunteerIds: [],
        mealsServed: 0,
        beneficiariesReached: 0,
        fundsRaised: 0,
      });

      router.push("/dashboard/events");
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#2D2D2D]">Create Event</h1>

        <p className="mt-2 text-gray-500">
          Add a new initiative and start tracking its impact.
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
              placeholder="Community Food Drive"
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
              placeholder="New Delhi"
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
              placeholder="Describe the event and its goals..."
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
            onClick={() => router.push("/dashboard/events")}
            className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#2F6B4F] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
