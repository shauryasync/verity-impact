"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Users,
  HandHeart,
  Heart,
  TrendingUp,
} from "lucide-react";

import Link from "next/link";

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
    <div className="space-y-10 w-full max-w-full min-w-0">
      <section className="flex flex-col gap-3">
        <p className="text-sm md:text-base text-muted-foreground">
          Welcome back
        </p>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Dashboard Overview
        </h1>

        <p className="max-w-full text-sm md:text-base text-muted-foreground">
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
              className={`rounded-2xl border p-4 md:p-6 transition-all hover:shadow-sm ${
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
        <div className="rounded-2xl border bg-card p-4 md:p-6 lg:col-span-2">
          <h3 className="text-xl md:text-2xl font-semibold">Recent Activity</h3>

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

        <div className="rounded-2xl border bg-card p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-semibold">Quick Summary</h3>

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
      <section className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/events/new"
          className="rounded-2xl border bg-card p-5 transition hover:border-primary hover:shadow-sm"
        >
          <h3 className="font-semibold">Create Event</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Schedule a new community initiative.
          </p>
        </Link>

        <Link
          href="/dashboard/volunteers/new"
          className="rounded-2xl border bg-card p-5 transition hover:border-primary hover:shadow-sm"
        >
          <h3 className="font-semibold">Add Volunteer</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Register a new volunteer profile.
          </p>
        </Link>

        <Link
          href="/dashboard/impact"
          className="rounded-2xl border bg-card p-5 transition hover:border-primary hover:shadow-sm"
        >
          <h3 className="font-semibold">View Analytics</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Explore participation and impact trends.
          </p>
        </Link>
      </section>
      <section className="rounded-3xl border bg-card p-6">
        <h3 className="text-xl font-semibold">Performance Snapshot</h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Average Volunteers per Event
            </p>

            <p className="mt-2 text-3xl font-bold">
              {stats.totalEvents > 0
                ? (stats.totalParticipations / stats.totalEvents).toFixed(1)
                : 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Volunteer Engagement
            </p>

            <p className="mt-2 text-3xl font-bold">
              {stats.totalParticipations}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Average Impact per Event
            </p>

            <p className="mt-2 text-3xl font-bold">
              {stats.totalEvents > 0
                ? Math.round(
                    stats.totalBeneficiariesReached / stats.totalEvents,
                  )
                : 0}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
