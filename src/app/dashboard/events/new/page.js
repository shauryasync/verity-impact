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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
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
        placeholder="Enter location"
        value={formData.location}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Enter description"
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
        {isSubmitting ? "Creating Event..." : "Add Event"}
      </button>
    </form>
  );
}
