import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title?.trim()) {
      return Response.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 },
      );
    }

    if (!body.date) {
      return Response.json(
        {
          success: false,
          error: "Date is required",
        },
        { status: 400 },
      );
    }

    if (!body.location?.trim()) {
      return Response.json(
        {
          success: false,
          error: "Location is required",
        },
        { status: 400 },
      );
    }

    if (
      body.mealsServed < 0 ||
      body.beneficiariesReached < 0 ||
      body.fundsRaised < 0
    ) {
      return Response.json(
        {
          success: false,
          error: "Impact metrics cannot be negative",
        },
        { status: 400 },
      );
    }

    const event = {
      title: body.title.trim(),
      date: body.date,
      location: body.location.trim(),
      description: body.description || "",
      volunteerIds: body.volunteerIds || [],
      mealsServed: body.mealsServed || 0,
      beneficiariesReached: body.beneficiariesReached || 0,
      fundsRaised: body.fundsRaised || 0,
    };

    const client = await clientPromise;
    const db = client.db("verity-tracker");

    await db.collection("events").insertOne(event);

    return Response.json(
      {
        success: true,
        message: "Event added successfully",
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

    const events = await db.collection("events").find({}).toArray();

    return Response.json(events);
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
