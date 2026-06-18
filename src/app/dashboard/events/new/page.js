"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);

    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
      mealsServed: 0,
      beneficiariesReached: 0,
      fundsRaised: 0,
    });

    router.push("/dashboard/events");
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
        value={formData.mealsServed}
        onChange={handleChange}
      />

      <input
        type="number"
        name="beneficiariesReached"
        placeholder="Beneficiaries Reached"
        value={formData.beneficiariesReached}
        onChange={handleChange}
      />

      <input
        type="number"
        name="fundsRaised"
        placeholder="Funds Raised"
        value={formData.fundsRaised}
        onChange={handleChange}
      />

      <button type="submit">Add Event</button>
    </form>
  );
}
