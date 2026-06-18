import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name?.trim()) {
      return Response.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 },
      );
    }

    if (!body.email?.trim()) {
      return Response.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(body.email)) {
      return Response.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 },
      );
    }

    if (body.phone && !/^\d{10}$/.test(body.phone)) {
      return Response.json(
        {
          success: false,
          error: "Phone number must be 10 digits",
        },
        { status: 400 },
      );
    }

    const volunteer = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone || "",
      skills: body.skills || [],
      availability: body.availability || "Flexible",
      status: body.status || "Active",
      joinedDate: body.joinedDate || "",
    };

    const client = await clientPromise;
    const db = client.db("verity-tracker");

    await db.collection("volunteers").insertOne(volunteer);

    return Response.json(
      {
        success: true,
        message: "Volunteer added successfully",
      },
      { status: 201 },
    );
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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("verity-tracker");

    const volunteers = await db.collection("volunteers").find({}).toArray();

    return Response.json(volunteers);
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
