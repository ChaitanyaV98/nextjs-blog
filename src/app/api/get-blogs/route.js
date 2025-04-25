import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";

export async function GET() {
  try {
    await connectToDB();
    const extractBlogsFromDb = await Blog.find({});

    if (extractBlogsFromDb) {
      return NextResponse.json({
        success: true,
        data: extractBlogsFromDb,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong. Please try again",
      });
    }
  } catch (error) {
    console.log("ERROR", error); // Optional: log actual error
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
}
