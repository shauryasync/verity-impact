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
          date: data.date || "",
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
    <form onSubmit={handleSubmit}>
      <h1>Edit Event</h1>

      <input
        type="text"
        name="title"
        placeholder="Event title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="mealsServed"
        placeholder="Meals Served"
        min="0"
        value={formData.mealsServed}
        onChange={handleChange}
      />

      <input
        type="number"
        name="beneficiariesReached"
        placeholder="Beneficiaries Reached"
        min="0"
        value={formData.beneficiariesReached}
        onChange={handleChange}
      />

      <input
        type="number"
        name="fundsRaised"
        placeholder="Funds Raised"
        min="0"
        value={formData.fundsRaised}
        onChange={handleChange}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating Event..." : "Update Event"}
      </button>
    </form>
  );
}
