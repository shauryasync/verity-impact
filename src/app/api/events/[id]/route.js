import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const params = await context.params;
  const id = params?.id;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing id parameter" },
      { status: 400 },
    );
  }

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid id" },
      { status: 400 },
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("verity-tracker");
    const collection = db.collection("events");

    const event = await collection.findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 },
      );
    }

    const sanitized = { ...event, id: event._id.toString() };
    if (event.date)
      sanitized.date =
        event.date instanceof Date ? event.date.toISOString() : event.date;

    return NextResponse.json(sanitized);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    console.log("ID:", id);

    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("verity-tracker");
    const collection = db.collection("events");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title,
          date: body.date,
          location: body.location,
          description: body.description,
        },
      },
    );

    console.log("RESULT:", result);

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    const client = await clientPromise;

    const db = client.db("verity-tracker");
    const collection = db.collection("events");

    await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
