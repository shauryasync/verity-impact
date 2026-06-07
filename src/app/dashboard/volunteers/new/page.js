"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    availability: "Flexible",
    status: "Active",
    joinedDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.filter((skill) => skill !== value),
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);

    router.push("/dashboard/volunteers");
  };

  return (
    <form className="flex flex-col gap-4 max-w-xl" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Add Volunteer</h1>

      <input
        type="text"
        name="name"
        placeholder="Volunteer Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <div>
        <h3>Skills</h3>

        <label>
          <input
            type="checkbox"
            value="Teaching"
            onChange={handleSkillChange}
          />
          Teaching
        </label>

        <label>
          <input
            type="checkbox"
            value="Fundraising"
            onChange={handleSkillChange}
          />
          Fundraising
        </label>

        <label>
          <input
            type="checkbox"
            value="Food Distribution"
            onChange={handleSkillChange}
          />
          Food Distribution
        </label>

        <label>
          <input
            type="checkbox"
            value="Event Management"
            onChange={handleSkillChange}
          />
          Event Management
        </label>

        <label>
          <input
            type="checkbox"
            value="Photography"
            onChange={handleSkillChange}
          />
          Photography
        </label>

        <label>
          <input
            type="checkbox"
            value="Social Media"
            onChange={handleSkillChange}
          />
          Social Media
        </label>
      </div>

      <select
        name="availability"
        value={formData.availability}
        onChange={handleChange}
      >
        <option value="Weekdays">Weekdays</option>
        <option value="Weekends">Weekends</option>
        <option value="Flexible">Flexible</option>
      </select>

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <input
        type="date"
        name="joinedDate"
        value={formData.joinedDate}
        onChange={handleChange}
      />

      <button type="submit">Add Volunteer</button>
    </form>
  );
}
