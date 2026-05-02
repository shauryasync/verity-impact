"use client";
import { useContext, useState } from "react";
import { EventsContext } from "@/app/context/EventsContext";
import {useRouter} from "next/navigation"

export default function Page() {
  const { setEvents } = useContext(EventsContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now().toString(),
      ...formData,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
    });
    router.push("/dashboard/events")
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

      <button type="submit">Add Event</button>
    </form>
  );
}
