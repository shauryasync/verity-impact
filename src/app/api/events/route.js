import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("verity-tracker");
    const collection = db.collection("events");

    await collection.insertOne(body);

    return Response.json({
      success: true,
      message: "Event added successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("verity-tracker");
    const collection = db.collection("events");

    const events = await collection.find({}).toArray();

    return Response.json(events);
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
