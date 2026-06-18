"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    availability: "",
    skills: [],
  });

  useEffect(() => {
    async function fetchVolunteer() {
      try {
        const response = await fetch(`/api/volunteers/${id}`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Failed to load volunteer");
          return;
        }

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          status: data.status || "",
          availability: data.availability || "",
          skills: data.skills || [],
        });
      } catch (error) {
        console.error(error);
        alert("Something went wrong while loading the volunteer");
      }
    }

    if (id) {
      fetchVolunteer();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      const arr = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      setFormData((prev) => ({
        ...prev,
        skills: arr,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email address");
      return;
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/volunteers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to update volunteer");
        return;
      }

      router.push(`/dashboard/volunteers/${id}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Volunteer</h1>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <input
        type="text"
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        placeholder="Availability"
      />

      <input
        type="text"
        name="skills"
        value={formData.skills.join(", ")}
        onChange={handleChange}
        placeholder="Comma-separated skills"
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating Volunteer..." : "Update Details"}
      </button>
    </form>
  );
}
