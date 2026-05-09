import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    return Response.json({
      success: true,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
