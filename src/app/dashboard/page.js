"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Users,
  HandHeart,
  Heart,
  TrendingUp,
} from "lucide-react";

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
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 w-72 rounded-lg bg-muted" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-40 rounded-2xl border bg-card" />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: CalendarDays,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Total Volunteers",
      value: stats.totalVolunteers,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      title: "Total Participations",
      value: stats.totalParticipations,
      icon: HandHeart,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
    },
    {
      title: "Lives Impacted",
      value: stats.totalBeneficiariesReached,
      icon: Heart,
      iconBg: "bg-primary",
      iconColor: "text-white",
      featured: true,
    },
  ];

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Welcome back</p>

        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard Overview
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Monitor events, volunteer participation, and community impact from a
          single place.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-3xl border p-6 transition-all hover:shadow-sm ${
                card.featured
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card"
              }`}
            >
              <div className="mb-8 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    card.featured ? "bg-white/20" : card.iconBg
                  }`}
                >
                  <Icon
                    className={card.featured ? "text-white" : card.iconColor}
                    size={22}
                  />
                </div>

                {!card.featured && (
                  <TrendingUp size={18} className="text-primary" />
                )}
              </div>

              <p
                className={`text-sm ${
                  card.featured
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {card.title}
              </p>

              <h2 className="mt-2 text-5xl font-bold">{card.value ?? 0}</h2>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border bg-card p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold">Recent Activity</h3>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
              <div>
                <p className="font-medium">Most Recent Event</p>

                <p className="text-sm text-muted-foreground">
                  {stats.mostRecentEvent || "No events available"}
                </p>
              </div>

              <CalendarDays size={20} className="text-primary" />
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
              <div>
                <p className="font-medium">Most Active Volunteer</p>

                <p className="text-sm text-muted-foreground">
                  {stats.mostActiveVolunteer || "No data available"}
                </p>
              </div>

              <Users size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="text-xl font-semibold">Quick Summary</h3>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Event Participation
              </p>

              <p className="text-3xl font-bold">
                {stats.totalParticipations || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Community Reach</p>

              <p className="text-3xl font-bold">
                {stats.totalBeneficiariesReached || 0}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
