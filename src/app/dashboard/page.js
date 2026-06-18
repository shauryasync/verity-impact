"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch("/api/dashboard");
      const data = await response.json();

      setStats(data);
    }

    fetchStats();
  }, []);

  if (!stats) {
    return <h1>Loading dashboard...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h2>Total Events</h2>
          <p>{stats.totalEvents}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Total Volunteers</h2>
          <p>{stats.totalVolunteers}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Total Participations</h2>
          <p>{stats.totalParticipations}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Beneficiaries Reached</h2>
          <p>{stats.totalBeneficiariesReached}</p>
        </div>
      </div>
    </div>
  );
}
