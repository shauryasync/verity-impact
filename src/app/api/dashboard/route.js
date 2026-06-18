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

    return Response.json({
      totalEvents,
      totalVolunteers,
      totalParticipations,
      totalBeneficiariesReached,
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
