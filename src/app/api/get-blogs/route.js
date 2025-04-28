import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";

export async function GET() {
  try {
    console.log("Before connecting db");
    await connectToDB();
    console.log("after connecting db");
    const extractBlogsFromDb = await Blog.find({});

    console.log("🚀 ~ GET ~ extractBlogsFromDb:", extractBlogsFromDb);
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
