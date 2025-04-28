import BlogsOverview from "@components/blog-overview";
import connectToDB from "@/database";
import Blog from "@/models/blog";

export default async function Blogs() {
  try {
    await connectToDB();

    const extractBlogsFromDb = await Blog.find({});

    const blogsList = extractBlogsFromDb.map((blog) => {
      const plainBlog = blog.toObject();
      return {
        ...plainBlog,
        _id: plainBlog._id.toString(), // Important: convert _id
      };
    });

    return <BlogsOverview blogsList={blogsList} />;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <div>Error loading blogs. Please try again later.</div>;
  }
}
