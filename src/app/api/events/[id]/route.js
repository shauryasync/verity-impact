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

    const event = await db.collection("events").findOne({
      _id: new ObjectId(id),
    });

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 },
      );
    }

    const sanitized = {
      ...event,
      id: event._id.toString(),
    };

    if (event.date) {
      sanitized.date =
        event.date instanceof Date ? event.date.toISOString() : event.date;
    }

    return NextResponse.json(sanitized);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request, context) {
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
    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 },
      );
    }

    if (!body.date) {
      return NextResponse.json(
        { success: false, error: "Date is required" },
        { status: 400 },
      );
    }

    if (!body.location?.trim()) {
      return NextResponse.json(
        { success: false, error: "Location is required" },
        { status: 400 },
      );
    }

    if (
      body.mealsServed < 0 ||
      body.beneficiariesReached < 0 ||
      body.fundsRaised < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Impact metrics cannot be negative",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("verity-tracker");

    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title.trim(),
          date: body.date,
          location: body.location.trim(),
          description: body.description || "",
          mealsServed: body.mealsServed || 0,
          beneficiariesReached: body.beneficiariesReached || 0,
          fundsRaised: body.fundsRaised || 0,
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid id" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("verity-tracker");

    const result = await db.collection("events").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
