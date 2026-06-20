"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const skillOptions = [
    "Teaching",
    "Fundraising",
    "Food Distribution",
    "Event Management",
    "Photography",
    "Social Media",
  ];
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
    <div className="mx-auto w-full max-w-3xl min-w-0 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">
          Edit Volunteer
        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-500">
          Update volunteer information and availability.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Availability
            </label>

            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="Flexible"
              className="w-full h-11 rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#2F6B4F]"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-4 block text-sm font-medium text-[#2D2D2D]">
            Skills
          </label>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skillOptions.map((skill) => (
              <label
                key={skill}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:border-[#2F6B4F]"
              >
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleSkillChange}
                  className="h-4 w-4 accent-[#2F6B4F]"
                />

                <span className="text-sm text-[#2D2D2D]">{skill}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push(`/dashboard/volunteers/${id}`)}
            className="w-full sm:w-auto rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto rounded-lg bg-[#2F6B4F] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating Volunteer..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
