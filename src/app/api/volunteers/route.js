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
export async function PUT(request, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("verity-tracker");
    const collection = db.collection("volunteers");

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          skills: body.skills,
          availability: body.availability,
          status: body.status,
          joinedDate: body.joinedDate,
        },
      },
    );

    return Response.json({
      success: true,
      message: "Volunteer updated successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
