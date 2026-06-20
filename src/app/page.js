"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Users,
  BarChart3,
  MapPin,
  Menu,
  X,
  HeartHandshake,
  Globe,
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

  const impactCards = [
    {
      label: "Events Conducted",
      value: stats.totalEvents,
      icon: CalendarDays,
    },
    {
      label: "Volunteers",
      value: stats.totalVolunteers,
      icon: Users,
    },
    {
      label: "Participations",
      value: stats.totalParticipations,
      icon: HeartHandshake,
    },
    {
      label: "Lives Impacted",
      value: stats.totalBeneficiariesReached,
      icon: Globe,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAF8] text-[#1E293B]">
      {/* Navigation */}

      <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2F6B4F] text-white shadow-sm">
              <HeartHandshake size={20} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-[#1E293B]">Verity</h1>

              <p className="hidden text-xs text-gray-500 sm:block">
                NGO Impact Tracker
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#mission"
              className="text-sm text-gray-600 transition hover:text-[#2F6B4F]"
            >
              Mission
            </a>

            <a
              href="#impact"
              className="text-sm text-gray-600 transition hover:text-[#2F6B4F]"
            >
              Impact
            </a>

            <a
              href="#events"
              className="text-sm text-gray-600 transition hover:text-[#2F6B4F]"
            >
              Events
            </a>
          </div>

          <div className="hidden md:block">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2F6B4F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#25563F]"
            >
              Dashboard
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t bg-white md:hidden">
            <div className="flex flex-col gap-4 px-6 py-5">
              <a
                href="#mission"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600"
              >
                Mission
              </a>

              <a
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600"
              >
                Impact
              </a>

              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600"
              >
                Events
              </a>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-[#2F6B4F] px-5 py-3 text-center text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,107,79,0.12),transparent_40%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="relative z-10">
            <div className="inline-flex rounded-full bg-[#E8F3EC] px-4 py-2 text-sm font-medium text-[#2F6B4F]">
              Transparent impact tracking for NGOs
            </div>

            <h2 className="mt-6 text-5xl font-bold leading-tight text-[#1E293B] md:text-6xl">
              Measure change.
              <br />
              Empower communities.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Manage events, coordinate volunteers, and showcase measurable
              outcomes through one unified platform built for social impact.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F6B4F] px-6 py-4 font-medium text-white transition hover:bg-[#25563F]"
              >
                Open Dashboard
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard/impact"
                className="inline-flex items-center justify-center rounded-xl border border-[#D1D5DB] bg-white px-6 py-4 font-medium transition hover:bg-gray-50"
              >
                View Analytics
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-xl">
            <div className="mb-8 flex items-center justify-between border-b border-[#EEF2F7] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Live Overview
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-[#1E293B]">
                  Current Impact
                </h3>
              </div>

              <BarChart3 className="text-[#2F6B4F]" size={24} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {impactCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-[#F8FAF8] p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F3EC]">
                      <Icon className="text-[#2F6B4F]" size={20} />
                    </div>

                    <h4 className="mt-4 text-3xl font-bold text-[#1E293B]">
                      {loading ? "—" : item.value.toLocaleString()}
                    </h4>

                    <p className="mt-2 text-sm text-gray-500">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 border-t border-[#EEF2F7] pt-5 text-sm leading-6 text-gray-600">
              A single source of truth for events, volunteers, and measurable
              outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}

      <section id="mission" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[32px] bg-[#2F6B4F] px-8 py-12 text-white md:px-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">
            Our Mission
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
            Helping organizations prove and amplify their impact.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Verity enables nonprofit organizations to manage initiatives,
            coordinate volunteers, and communicate meaningful outcomes with
            transparency and confidence.
          </p>

          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-[#2F6B4F] transition hover:bg-[#F8FAF8]"
            >
              Explore Dashboard
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact */}

      <section id="impact" className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1E293B]">
            Measurable Change
          </h2>

          <p className="mt-3 text-gray-600">
            Real data captured from community initiatives.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F3EC]">
                  <Icon className="text-[#2F6B4F]" size={20} />
                </div>

                <h3 className="mt-5 text-4xl font-bold text-[#1E293B]">
                  {loading ? "—" : item.value.toLocaleString()}
                </h3>

                <p className="mt-2 text-sm text-gray-500">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Events */}

      <section id="events" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1E293B]">
              Recent Initiatives
            </h2>

            <p className="mt-3 text-gray-600">
              Community programs creating measurable outcomes.
            </p>
          </div>

          <Link href="/dashboard/events" className="font-medium text-[#2F6B4F]">
            View all events
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {loading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : featuredEvents.length === 0 ? (
            <p className="text-gray-500">No events available yet.</p>
          ) : (
            featuredEvents.map((event) => (
              <Link
                key={event._id}
                href={`/dashboard/events/${event._id}`}
                className="group"
              >
                <div className="h-full rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#2F6B4F]">
                    {event.title}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-gray-600">
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

                  <div className="mt-6 rounded-xl bg-[#F8FAF8] p-4">
                    <p className="font-medium text-[#2F6B4F]">
                      {(event.beneficiariesReached || 0).toLocaleString()}{" "}
                      beneficiaries reached
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Footer */}

      <footer className="mt-10 border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F6B4F] text-white">
                <HeartHandshake size={18} />
              </div>

              <h3 className="text-lg font-bold text-[#1E293B]">Verity</h3>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Empowering organizations to manage initiatives and measure
              community impact with transparency.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1E293B]">Explore</h4>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <a href="#mission" className="block hover:text-[#2F6B4F]">
                Mission
              </a>

              <a href="#impact" className="block hover:text-[#2F6B4F]">
                Impact
              </a>

              <a href="#events" className="block hover:text-[#2F6B4F]">
                Events
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1E293B]">Platform</h4>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <Link href="/dashboard" className="block hover:text-[#2F6B4F]">
                Dashboard
              </Link>

              <Link
                href="/dashboard/impact"
                className="block hover:text-[#2F6B4F]"
              >
                Analytics
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Verity. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
