import clientPromise from "@/lib/mongodb";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const volunteerId = params.id;

    const client = await clientPromise;
    const db = client.db("verity-tracker");

    const events = await db
      .collection("events")
      .find({
        volunteerIds: volunteerId,
      })
      .toArray();

    return Response.json(events);
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
