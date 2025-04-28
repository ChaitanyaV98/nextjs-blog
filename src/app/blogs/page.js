import BlogsOverview from "@components/blog-overview";
import connectToDB from "@/database";
import Blog from "@/models/blog";

export const dynamic = "force-dynamic"; // 👈 add this line

export default async function Blogs() {
  try {
    console.log("Connecting to the database...");
    await connectToDB();

    console.log("Fetching blogs from the database...");
    const extractBlogsFromDb = await Blog.find({});

    const blogsList = extractBlogsFromDb.map((blog) => {
      const plainBlog = blog.toObject();
      return {
        ...plainBlog,
        _id: plainBlog._id.toString(),
      };
    });

    console.log("Blogs fetched successfully:", blogsList);

    return <BlogsOverview blogsList={blogsList} />;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <div>Error loading blogs. Please try again later.</div>;
  }
}
