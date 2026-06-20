"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Users,
  BarChart3,
  MapPin,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalVolunteers: 0,
    totalParticipations: 0,
    totalBeneficiariesReached: 0,
  });

  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashboardResponse, eventsResponse] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/events"),
        ]);

        const dashboardData = await dashboardResponse.json();
        const eventsData = await eventsResponse.json();

        setStats({
          totalEvents: dashboardData.totalEvents || 0,
          totalVolunteers: dashboardData.totalVolunteers || 0,
          totalParticipations: dashboardData.totalParticipations || 0,
          totalBeneficiariesReached:
            dashboardData.totalBeneficiariesReached || 0,
        });

        const latestEvents = [...eventsData]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        setFeaturedEvents(latestEvents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}

      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground">
              🌳
            </div>

            <div>
              <h1 className="text-lg font-semibold text-foreground">
                NGO Impact Tracker
              </h1>

              <p className="hidden text-xs text-muted-foreground sm:block">
                Impact Management Platform
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#mission"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Mission
            </a>

            <a
              href="#impact"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Impact
            </a>

            <a
              href="#events"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Events
            </a>
          </div>

          <div className="hidden md:block">
            <Link
              href="/dashboard"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              View Dashboard
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="flex flex-col gap-4 px-6 py-4">
              <a
                href="#mission"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground"
              >
                Mission
              </a>

              <a
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground"
              >
                Impact
              </a>

              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground"
              >
                Events
              </a>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <div className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            Human-centered nonprofit management
          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Manage events, empower volunteers, and measure community impact.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Coordinate initiatives, engage volunteers, and track meaningful
            outcomes through one simple platform designed for nonprofit
            organizations.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-primary-foreground transition hover:opacity-90"
            >
              View Dashboard
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/dashboard/impact"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-4 font-medium text-foreground transition hover:bg-muted"
            >
              Explore Impact
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <Image
            src="/hero.png"
            alt="Volunteers working together"
            width={1200}
            height={420}
            className="h-[300px] w-full object-cover sm:h-[420px]"
            priority
          />
        </div>
      </section>

      {/* Impact Snapshot */}

      <section id="impact" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Measurable Impact
          </h2>

          <p className="mt-3 text-muted-foreground">
            Real numbers that reflect community engagement and outcomes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Events",
              value: stats.totalEvents,
            },
            {
              label: "Total Volunteers",
              value: stats.totalVolunteers,
            },
            {
              label: "Participations",
              value: stats.totalParticipations,
            },
            {
              label: "Community Impact",
              value: stats.totalBeneficiariesReached,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>

              <h3 className="mt-3 text-4xl font-bold text-foreground">
                {loading ? "—" : stat.value.toLocaleString()}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">How It Works</h2>

          <p className="mt-3 text-muted-foreground">
            A simple workflow for managing nonprofit initiatives.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <CalendarDays className="mb-4 text-primary" size={28} />

            <h3 className="text-lg font-semibold text-foreground">
              Organize Events
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Plan, schedule, and manage community initiatives efficiently.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Users className="mb-4 text-primary" size={28} />

            <h3 className="text-lg font-semibold text-foreground">
              Manage Volunteers
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Coordinate participation, skills, and availability.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <BarChart3 className="mb-4 text-primary" size={28} />

            <h3 className="text-lg font-semibold text-foreground">
              Track Impact
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Measure outcomes with clear and actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Events */}

      <section id="events" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Featured Events
            </h2>

            <p className="mt-3 text-muted-foreground">
              Recent initiatives making a measurable difference.
            </p>
          </div>

          <Link
            href="/dashboard/events"
            className="hidden text-sm font-medium text-primary md:block"
          >
            View all events
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {loading ? (
            <p className="text-muted-foreground">Loading events...</p>
          ) : featuredEvents.length === 0 ? (
            <p className="text-muted-foreground">No events available yet.</p>
          ) : (
            featuredEvents.map((event) => (
              <div
                key={event._id}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {event.title}
                </h3>

                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />

                    <span>
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />

                    <span>{event.location || "No location"}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-muted px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {(event.beneficiariesReached || 0).toLocaleString()}{" "}
                    beneficiaries reached
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Mission */}

      <section
        id="mission"
        className="mx-auto max-w-4xl px-6 py-24 text-center"
      >
        <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Our Mission
          </p>

          <h2 className="mt-4 text-3xl font-bold text-foreground">
            Helping organizations create measurable community impact.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            NGO Impact Tracker enables nonprofit organizations to coordinate
            volunteers, manage events, and demonstrate meaningful outcomes
            through simple, practical technology.
          </p>
        </div>
      </section>

      {/* Footer */}

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              NGO Impact Tracker
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Empowering organizations to manage initiatives and measure
              community impact.
            </p>
          </div>

          <div className="text-sm text-muted-foreground md:text-right">
            <p>contact@example.org</p>

            <p className="mt-1">
              © {new Date().getFullYear()} NGO Impact Tracker
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
