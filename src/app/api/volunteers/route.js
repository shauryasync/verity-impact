import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("verity-tracker");
    const collection = db.collection("volunteers");

    await collection.insertOne(body);

    return Response.json({
      success: true,
      message: "Volunteer added successfully",
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
    const collection = db.collection("volunteers");

    const volunteers = await collection.find({}).toArray();

    return Response.json(volunteers);
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
