"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const response = await fetch("/api/impact");
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImpact();
  }, []);

  if (!data) {
    return (
      <div className="py-12">
        <h1 className="text-4xl font-bold text-[#2D2D2D]">Impact Analytics</h1>

        <p className="mt-6 text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full max-w-full min-w-0">
      {/* Header */}

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">
          Impact Analytics
        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-500">
          Understand participation trends and community impact.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Events" value={data.totalEvents} />

        <StatCard title="Total Volunteers" value={data.totalVolunteers} />

        <StatCard
          title="Total Participations"
          value={data.totalParticipations}
        />

        <StatCard title="Total Impact" value={data.totalImpact} />
      </div>

      {/* Insights */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <InsightCard
          title="Average Volunteers per Event"
          value={data.averageVolunteersPerEvent}
        />

        <InsightCard title="Most Active Month" value={data.mostActiveMonth} />

        <InsightCard
          title="Total Participations"
          value={data.totalParticipations}
        />
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">
            Events per Month
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.eventTrends}>
                <CartesianGrid stroke="#F3F4F6" vertical={false} />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2F6B4F"
                  strokeWidth={3}
                  dot={{ fill: "#2F6B4F", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">
            Volunteer Growth
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.volunteerGrowth}>
                <CartesianGrid stroke="#F3F4F6" vertical={false} />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar dataKey="count" fill="#C97B63" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Volunteers */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-[#2D2D2D]">Top Volunteers</h2>

        <div className="mt-6 space-y-4">
          {data.topVolunteers.length === 0 ? (
            <p className="text-gray-500">No participation data available.</p>
          ) : (
            data.topVolunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >
                <span className="font-medium text-[#2D2D2D]">
                  {volunteer.name}
                </span>

                <span className="text-gray-500">
                  {volunteer.participations} events
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Most Impactful Events */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-[#2D2D2D]">
          Most Impactful Events
        </h2>

        <div className="mt-6 space-y-4">
          {data.impactfulEvents.length === 0 ? (
            <p className="text-gray-500">No impact data available.</p>
          ) : (
            data.impactfulEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >
                <div>
                  <p className="font-medium text-[#2D2D2D]">{event.title}</p>

                  <p className="text-sm text-gray-500">
                    {event.volunteerCount} volunteers
                  </p>
                </div>

                <span className="font-semibold text-[#2F6B4F]">
                  {event.impact}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-3 text-3xl font-bold text-[#2D2D2D]">{value}</h3>
    </div>
  );
}

function InsightCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-3 text-2xl font-semibold text-[#2D2D2D]">{value}</h3>
    </div>
  );
}
