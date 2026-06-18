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

    const volunteer = await db.collection("volunteers").findOne({
      _id: new ObjectId(id),
    });

    if (!volunteer) {
      return NextResponse.json(
        { success: false, error: "Volunteer not found" },
        { status: 404 },
      );
    }

    const sanitized = {
      ...volunteer,
      id: volunteer._id.toString(),
    };

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

    if (!body.name?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    if (!body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 },
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (body.phone && !/^\d{10}$/.test(body.phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number must be 10 digits",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("verity-tracker");

    const result = await db.collection("volunteers").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: body.name.trim(),
          email: body.email.trim(),
          phone: body.phone || "",
          status: body.status || "Active",
          availability: body.availability || "Flexible",
          skills: body.skills || [],
          joinedDate: body.joinedDate || "",
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Volunteer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Volunteer updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, context) {
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

    await db.collection("events").updateMany(
      {},
      {
        $pull: {
          volunteerIds: id,
        },
      },
    );

    const result = await db.collection("volunteers").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Volunteer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Volunteer deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
