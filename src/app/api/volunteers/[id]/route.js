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
    const collection = db.collection("volunteers");

    const volunteer = await collection.findOne({ _id: new ObjectId(id) });

    if (!volunteer) {
      return NextResponse.json(
        { success: false, error: "Volunteer not found" },
        { status: 404 },
      );
    }

    const sanitized = { ...volunteer, id: volunteer._id.toString() };
    if (volunteer.date)
      sanitized.date =
        volunteer.date instanceof Date
          ? volunteer.date.toISOString()
          : volunteer.date;

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
    const collection = db.collection("volunteers");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          status: body.status,
          availability: body.availability,
          skills: body.skills,
        },
      },
    );

    console.log("RESULT:", result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
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
    const collection = db.collection("volunteers");

    await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Volunteer deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
