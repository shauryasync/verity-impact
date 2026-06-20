"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  HandHeart,
  Heart,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Page() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="mx-auto w-full max-w-7xl space-y-8 animate-pulse">
        <div className="h-32 rounded-2xl bg-muted" />

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
      featured: true,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Header */}

      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">NGO Impact Tracker</p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Welcome back, Admin
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Monitor events, volunteer participation, and community impact from a
            single place.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard/impact"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-muted"
          >
            View Analytics
          </Link>

          <Link
            href="/dashboard/events/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            New Event
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* KPI Cards */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-2xl border p-5 md:p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
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
                    size={22}
                    className={card.featured ? "text-white" : card.iconColor}
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

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                {card.value ?? 0}
              </h2>
            </div>
          );
        })}
      </section>

      {/* Activity + Summary */}

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-sm lg:col-span-2">
          <h3 className="text-xl font-semibold">Recent Activity</h3>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-4">
              <div>
                <p className="font-medium">Most Recent Event</p>

                <p className="text-sm text-muted-foreground">
                  {stats.mostRecentEvent || "No events available"}
                </p>
              </div>

              <CalendarDays size={20} className="text-primary" />
            </div>

            <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-4">
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

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="text-xl font-semibold">Quick Summary</h3>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Event Participation
              </p>

              <p className="mt-2 text-3xl font-bold">
                {stats.totalParticipations || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Community Reach</p>

              <p className="mt-2 text-3xl font-bold">
                {stats.totalBeneficiariesReached || 0}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}

      <section>
        <div>
          <h3 className="text-xl font-semibold">Quick Actions</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage your initiatives.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/dashboard/events/new"
            className="rounded-2xl border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <h4 className="font-semibold">Create Event</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              Schedule a new community initiative.
            </p>
          </Link>

          <Link
            href="/dashboard/volunteers/new"
            className="rounded-2xl border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <h4 className="font-semibold">Add Volunteer</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              Register a new volunteer profile.
            </p>
          </Link>

          <Link
            href="/dashboard/impact"
            className="rounded-2xl border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <h4 className="font-semibold">View Analytics</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              Explore participation and impact trends.
            </p>
          </Link>
        </div>
      </section>

      {/* Performance Snapshot */}

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
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
