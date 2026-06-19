import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("verity-tracker");

    const [events, volunteers] = await Promise.all([
      db.collection("events").find({}).toArray(),
      db.collection("volunteers").find({}).toArray(),
    ]);

    const totalEvents = events.length;
    const totalVolunteers = volunteers.length;

    const totalParticipations = events.reduce(
      (sum, event) => sum + (event.volunteerIds?.length || 0),
      0,
    );

    const totalImpact = events.reduce(
      (sum, event) => sum + (event.beneficiariesReached || 0),
      0,
    );

    const averageVolunteersPerEvent =
      totalEvents > 0
        ? Number((totalParticipations / totalEvents).toFixed(1))
        : 0;

    const eventTrends = {};
    const volunteerGrowth = {};
    const participationByMonth = {};

    events.forEach((event) => {
      if (!event.date) return;

      const month = new Date(event.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      eventTrends[month] = (eventTrends[month] || 0) + 1;

      participationByMonth[month] =
        (participationByMonth[month] || 0) + (event.volunteerIds?.length || 0);
    });

    volunteers.forEach((volunteer) => {
      if (!volunteer.joinedDate) return;

      const month = new Date(volunteer.joinedDate).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      volunteerGrowth[month] = (volunteerGrowth[month] || 0) + 1;
    });

    const mostActiveMonth =
      Object.entries(participationByMonth).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0] || "No data";

    const volunteerCounts = {};

    events.forEach((event) => {
      (event.volunteerIds || []).forEach((id) => {
        volunteerCounts[id] = (volunteerCounts[id] || 0) + 1;
      });
    });

    const topVolunteers = Object.entries(volunteerCounts)
      .map(([id, count]) => {
        const volunteer = volunteers.find((v) => v._id.toString() === id);

        return {
          id,
          name: volunteer?.name || "Unknown Volunteer",
          participations: count,
        };
      })
      .sort((a, b) => b.participations - a.participations)
      .slice(0, 5);

    const impactfulEvents = [...events]
      .sort(
        (a, b) => (b.beneficiariesReached || 0) - (a.beneficiariesReached || 0),
      )
      .slice(0, 5)
      .map((event) => ({
        id: event._id,
        title: event.title,
        impact: event.beneficiariesReached || 0,
        volunteerCount: event.volunteerIds?.length || 0,
      }));

    return Response.json({
      totalEvents,
      totalVolunteers,
      totalParticipations,
      totalImpact,
      averageVolunteersPerEvent,
      mostActiveMonth,
      eventTrends,
      volunteerGrowth,
      topVolunteers,
      impactfulEvents,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
