import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request, context) {
  try {
    const params = await context.params;
    const eventId = params.id;

    const { volunteerId } = await request.json();

    const client = await clientPromise;
    const db = client.db("verity-tracker");

    await db.collection("events").updateOne(
      { _id: new ObjectId(eventId) },
      {
        $addToSet: {
          volunteerIds: volunteerId,
        },
      },
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
