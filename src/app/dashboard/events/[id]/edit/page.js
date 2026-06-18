"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

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
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();

      setFormData({
        title: data.title || "",
        date: data.date || "",
        location: data.location || "",
        description: data.description || "",
        mealsServed: data.mealsServed || 0,
        beneficiariesReached: data.beneficiariesReached || 0,
        fundsRaised: data.fundsRaised || 0,
      });
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

    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    router.push(`/dashboard/events/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Event</h1>

      <input
        type="text"
        name="title"
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
        value={formData.location}
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">Update Event</button>
    </form>
  );
}
