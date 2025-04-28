import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";

export async function DELETE(req) {
  try {
    await connectToDB();

    const { id } = await req.json(); // <-- Get id from body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog id is required" },
        { status: 400 }
      );
    }

    const deleteBlogById = await Blog.findByIdAndDelete(id);

    if (deleteBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting blog:", error);

    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
