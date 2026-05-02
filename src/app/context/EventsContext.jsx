"use client";

import { createContext, useState } from "react";

export const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([
    {
      id: "6227832",
      title: "food distribution",
      date: "11/04/2025",
      location: "pari chowk, greater noida",
      description:
        "distributed 1500+ healthy meals to children, adults and women.",
    },
    {
      id: "6222832",
      title: "milkshake distribution",
      date: "21/05/2025",
      location: "alpha sector, greater noida",
      description: "distributed 500+ bottles to milkshakes",
    },
    {
      id: "62232",
      title: "cloth distribution",
      date: "7/04/2025",
      location: "new delhi",
      description: "summer clothes to 200 children",
    },
    {
      id: "622783212",
      title: "stationary distribution",
      date: "10/02/2026",
      location: "gurugram",
      description: "given 2000 stationary kits",
    },
    {
      id: "6732",
      title: "food distribution",
      date: "28/04/2026",
      location: "amausi, lucknow",
      description:
        "distributed 1500+ healthy meals to children, adults and women.",
    },
  ]);
  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
