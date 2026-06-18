import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("verity-tracker");

    const events = await db.collection("events").find({}).toArray();
    const volunteers = await db.collection("volunteers").find({}).toArray();

    const totalEvents = events.length;
    const totalVolunteers = volunteers.length;

    const totalParticipations = events.reduce(
      (sum, event) => sum + (event.volunteerIds?.length || 0),
      0,
    );

    const totalBeneficiariesReached = events.reduce(
      (sum, event) => sum + (event.beneficiariesReached || 0),
      0,
    );

    const mostRecentEvent =
      events.length > 0
        ? [...events].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
        : null;

    const volunteerParticipationCount = {};

    events.forEach((event) => {
      event.volunteerIds?.forEach((volunteerId) => {
        volunteerParticipationCount[volunteerId] =
          (volunteerParticipationCount[volunteerId] || 0) + 1;
      });
    });

    let mostActiveVolunteer = null;

    if (Object.keys(volunteerParticipationCount).length > 0) {
      const mostActiveVolunteerId = Object.entries(
        volunteerParticipationCount,
      ).sort((a, b) => b[1] - a[1])[0][0];

      mostActiveVolunteer = volunteers.find(
        (volunteer) => volunteer._id.toString() === mostActiveVolunteerId,
      );
    }

    return Response.json({
      totalEvents,
      totalVolunteers,
      totalParticipations,
      totalBeneficiariesReached,

      mostRecentEvent: mostRecentEvent?.title || null,
      mostActiveVolunteer: mostActiveVolunteer?.name || null,
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
