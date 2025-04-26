import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Blog from "@/models/blog";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    const { error } = AddNewBlog.validate({ title, description });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    const newBlogItem = await Blog.create({ title, description });
    return NextResponse.json({
      success: true,
      message: "New blog is added successfully",
      blog: newBlogItem,
    });
  } catch (error) {
    console.error("Add Blog Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again",
      },
      { status: 500 }
    );
  }
}
