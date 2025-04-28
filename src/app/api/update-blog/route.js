// import connectToDB from "@/database";
// import { NextResponse } from "next/server";
// import Joi from "joi";
// import Blog from "@/models/blog";

// const AddNewBlog = Joi.object({
//   title: Joi.string().required(),
//   description: Joi.string().required(),
// });

// export async function PUT(req) {
//   try {
//     await connectToDB();
//     const { searchParams } = new URL(req.url);
//     const currentBlogId = searchParams.get("id");
//     if (!currentBlogId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Blog id is required",
//         },
//         { status: 400 }
//       );
//     }
//     const { title, description } = await req.json();
//     const { error } = AddNewBlog.validate({ title, description });
//     if (error) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: error.details[0].message,
//         },
//         { status: 400 }
//       );
//     }
//     const updateBlogById = await Blog.findOneAndUpdate(
//       {
//         _id: currentBlogId,
//       },
//       {
//         title,
//         description,
//       },
//       { new: true }
//     );

//     if (updateBlogById) {
//       return NextResponse.json({
//         success: true,
//         message: "Blog updated successfully",
//       });
//     }
//   } catch (error) {
//     console.log("Error while updating data", error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong. Internal server error, please try again",
//     });
//   }
// }

import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Blog from "@/models/blog";

const AddNewBlog = Joi.object({
  id: Joi.string().required(), // <-- id should be required in update
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();

    const { id, title, description } = await req.json(); // <-- take id from body

    const { error } = AddNewBlog.validate({ id, title, description });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    const updateBlogById = await Blog.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );

    if (updateBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log("Error while updating data", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Internal server error, please try again",
    });
  }
}
